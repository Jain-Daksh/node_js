const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const Gender = ['Male', 'Female'];
const status = ['pending', 'approved ', 'decline'];
const role = ['admin', 'doctor', 'patient'];
module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne((models.Doctor), {
        as: 'Doctors',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Patient), {
        as: 'Patient',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Appointment), {
        as: 'patient',
        foreignKey: 'patient_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Appointment), {
        as: 'doctor',
        foreignKey: 'doctor_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.UserDetails), {
        as: 'userDetail',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/,
        len: [2, 50],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]+$/,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
    },
    password: {
      type: DataTypes.STRING(250),
      set(value) {
        if (value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
      },
    },
    gender: {
      type: DataTypes.ENUM(Gender),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 13],
        is: [/^[0-9]+$/],
      },
      unique: {
        args: true,
        msg: 'Mobile number already in use!',
      },
    },
    role: {
      type: DataTypes.ENUM(role),
      allowNull: true,
      defaultValue: 'patient',
    },
    image: {
      type: DataTypes.STRING(255),
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_doctor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    current_status: {
      type: DataTypes.ENUM(status),
      allowNull: true,
      defaultValue: 'pending',
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    reset_token: {
      type: DataTypes.STRING(250),
    },
    reset_token_expiry: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  function encryptPasswordIfChanged(user, options) {
    if (user.changed('password')) {
      (user.get('password'));
    }
  }
  User.beforeUpdate(encryptPasswordIfChanged);
  User.addScope('doctor', {
    where: { is_doctor: true, is_admin: false },
    include: [{
      model: sequelize.models.Doctor,
      as: 'Doctors',
    }],
  });
  User.addScope('patient', {
    where: { is_doctor: false, is_admin: false },
    include: [{
      model: sequelize.models.UserDetails,
      as: 'userDetail',
    }],
  });
  return User;
};

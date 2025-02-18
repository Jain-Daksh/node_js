const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Doctor extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'User',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Doctor.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
        msg: 'doctor details with this id already added',
      },
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fees: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Doctor;
};

const { DataTypes, Model } = require('sequelize');

const medicalHistory = ['none', 'surgical history', 'hospitalization'];
const lifeStyle = ['none', 'Alcoholic + Smoker', 'Alcoholic', 'Smoker'];
const sleepPattern = ['Disturbed', 'Sound Sleep'];

module.exports = (sequelize) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo((models.User), {
        as: 'User',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Prescription), {
        as: 'prescriptions',
        foreignKey: 'patient_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Patient.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
        msg: 'patient details with this id already added',
      },
    },
    life_style: {
      type: DataTypes.ENUM(lifeStyle),
    },
    sleep_pattern: {
      type: DataTypes.ENUM(sleepPattern),
    },
    height: {
      type: DataTypes.STRING(3),
    },
    weight: {
      type: DataTypes.STRING(3),
    },
    medical_history: {
      type: DataTypes.ENUM(medicalHistory),
    },
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Patient;
};

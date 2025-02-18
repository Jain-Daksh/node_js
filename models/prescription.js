const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo((models.Doctor), {
        as: 'Doctor',
        foreignKey: 'doctor_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.Patient), {
        as: 'Patient',
        foreignKey: 'patient_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Prescription.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    doctor_id: {
      type: DataTypes.UUID,
    },
    patient_id: {
      type: DataTypes.UUID,
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recommendation: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Prescription',
    tableName: 'prescriptions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Prescription;
};

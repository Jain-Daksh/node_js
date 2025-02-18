const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicalRecord.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    patient_id: {
      type: DataTypes.UUID,
    },
    image: {
      type: DataTypes.STRING(254),
    },
  }, {
    sequelize,
    modelName: 'MedicalRecord',
    tableName: 'medical_record_details',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return MedicalRecord;
};

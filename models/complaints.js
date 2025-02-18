const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complaint.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
    },
    complaint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Complaint',
    tableName: 'complaints',
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  });
  return Complaint;
};

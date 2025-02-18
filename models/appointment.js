const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo((models.User), {
        as: 'patient',
        foreignKey: 'patient_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.User), {
        as: 'doctor',
        foreignKey: 'doctor_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.Payment), {
        as: 'payment',
        foreignKey: 'payment_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Appointment.init({
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
    date: {
      type: DataTypes.DATEONLY,
    },
    time: {
      type: DataTypes.TIME,
    },
    payment_id: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  });
  return Appointment;
};

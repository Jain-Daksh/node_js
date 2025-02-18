const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne((models.Appointment), {
        as: 'payment',
        foreignKey: 'payment_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Payment.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
    },
    doctor_id: {
      type: DataTypes.UUID,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    razorpay_order_id: {
      type: DataTypes.STRING,
    },
    razorpay_payment_id: {
      type: DataTypes.STRING,
    },
    razorpay_signature: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  });
  return Payment;
};

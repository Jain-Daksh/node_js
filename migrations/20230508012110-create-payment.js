/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
      },
      doctor_id: {
        type: Sequelize.UUID,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      razorpay_order_id: {
        type: Sequelize.STRING,
      },
      razorpay_payment_id: {
        type: Sequelize.STRING,
      },
      razorpay_signature: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  },
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatment_histories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      patient_id: {
        type: Sequelize.UUID,
      },
      doctor_id: {
        type: Sequelize.UUID,
      },
      treatment: {
        type: Sequelize.TEXT,
      },
      treatment_date: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('treatment_histories');
  },
};

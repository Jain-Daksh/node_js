/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prescriptions', {
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
        allowNull: false,
      },
      recommendation: {
        type: Sequelize.TEXT,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

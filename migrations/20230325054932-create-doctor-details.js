/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      doctor_id: {
        type: Sequelize.UUID,
      },
      experience: {
        type: Sequelize.STRING(15),
      },
      specialization: {
        type: Sequelize.STRING(40),
      },
      start_time: {
        type: Sequelize.TIME,
      },
      end_time: {
        type: Sequelize.TIME,
      },
      fees: {
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('doctor_details');
  },
};

/** @type {import('sequelize-cli').Migration} */
const medicalHistory = ['none', 'surgical history', 'hospitalization'];
const lifeStyle = ['none', 'Alcoholic + Smoker', 'Alcoholic', 'Smoker'];
const sleepPattern = ['Disturbed', 'Sound Sleep'];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
      },
      life_style: {
        type: Sequelize.ENUM(lifeStyle),
      },
      sleep_pattern: {
        type: Sequelize.ENUM(sleepPattern),
      },
      height: {
        type: Sequelize.STRING(3),
      },
      weight: {
        type: Sequelize.STRING(3),
      },
      medical_history: {
        type: Sequelize.ENUM(medicalHistory),

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
    await queryInterface.dropTable('patients');
  },
};

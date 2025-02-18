/** @type {import('sequelize-cli').Migration} */
const doctorGender = ['Male', 'Female'];
const status = ['pending', 'approved ', 'decline'];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
      },
      gender: {
        type: Sequelize.ENUM(doctorGender),
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(255),
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM(status),
        defaultValue: 'pending',
      },
      reset_token: {
        type: Sequelize.STRING(250),
      },
      reset_token_expiry: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  },
};

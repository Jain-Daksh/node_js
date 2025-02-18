/** @type {import('sequelize-cli').Migration} */
const Gender = ['Male', 'Female'];
const status = ['pending', 'approved ', 'decline'];
const roleStatus = ['patient', 'admin', 'doctor'];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
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
        type: Sequelize.ENUM(Gender),
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(13),
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.STRING(255),
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_doctor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: Sequelize.ENUM(roleStatus),
        defaultValue: 'patient',
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
        default: Date.now,
        expires: 600, // this is the expiry time in 10 mins
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
    await queryInterface.dropTable('users');
  },
};

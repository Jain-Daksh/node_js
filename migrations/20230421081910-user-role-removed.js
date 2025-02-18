module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'users',
    'role',
  ),
};

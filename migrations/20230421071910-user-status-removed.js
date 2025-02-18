module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'users',
    'status',
  ),
};

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'role',
    {
      type: Sequelize.ENUM,
      allowNull: true,
      values: [
        'patient',
        'doctor',
        'admin',
      ],
      defaultValue: 'patient',

    },
  ),
};

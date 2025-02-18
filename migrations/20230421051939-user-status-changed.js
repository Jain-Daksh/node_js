module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'current_status',
    {
      type: Sequelize.ENUM,
      allowNull: true,
      values: [
        'pending',
        'approved',
        'decline',
      ],
      defaultValue: 'pending',

    },
  ),
};

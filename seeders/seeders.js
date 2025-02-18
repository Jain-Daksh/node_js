const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingUser = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = \'admin@hotmail.com\' or mobile = \'9878411045\'',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );
    if (existingUser.length > 0) {
      console.log('Skipping seeder: User with the same email or mobile already exists in the database.');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    const userData = [
      {
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@hotmail.com',
        gender: 'Male',
        is_admin: 'yes',
        mobile: '9878411045',
        role: 'admin',
        password: hashedPassword,
        updated_at: new Date(),
        created_at: new Date(),
      },
    ];
    fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));
    await queryInterface.bulkInsert('users', userData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    fs.unlinkSync('users.json');
  },
};

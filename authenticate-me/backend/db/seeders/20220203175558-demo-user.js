'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'Demolicious',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'cactus@love.io',
          username: 'CactusLove',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          email: 'tiger@woods.io',
          username: 'TigerWoods',
          hashedPassword: bcrypt.hashSync('password3')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        username: { [Op.in]: ['Demolicious', 'CactusLove', 'TigerWoods'] }
      }, {});
  }
};

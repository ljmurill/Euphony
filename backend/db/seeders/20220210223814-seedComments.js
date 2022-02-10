'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {userId: 1, songId: 1, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 2, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 3, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 4, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 5, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 6, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 7, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 8, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, songId: 9, body: 'Favorite Song!', createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};

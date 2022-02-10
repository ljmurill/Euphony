'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Songs', [
      {userId: 1, title: 'Fluffing Ducks', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: 'https://www.pngall.com/wp-content/uploads/2016/03/Duck-PNG-2.png', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Cool Beats', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'Hello', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Project Week', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'React', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/love-and-care-my-city-royalty-free-image-1616634469.', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Hate It', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, title: 'Dig In', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b2625324d456ba0958a29c4c', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Listen Listen', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'LOVE', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2019/02/Best-Love-Songs-featured-image.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Tomorrow', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'People', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, title: 'Energy', url: '../../mp3/Fluffing-a-Duck.mp3', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU8vVxh5vkGYGnBwRufaH38OGYNvDCmCziXA&usqp=CAU", createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Songs', null, {});
  }
};

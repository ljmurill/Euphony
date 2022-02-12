'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Songs', [
      {userId: 1, title: 'Fluffing Ducks', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', imageUrl: 'https://www.pngall.com/wp-content/uploads/2016/03/Duck-PNG-2.png', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Cool Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'Hello', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Project Week', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'React', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/love-and-care-my-city-royalty-free-image-1616634469.', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Hate It', url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, title: 'Dig In', url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b2625324d456ba0958a29c4c', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Listen Listen', url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 3, title: 'LOVE', url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg', imageUrl: 'https://www.udiscovermusic.com/wp-content/uploads/2019/02/Best-Love-Songs-featured-image.jpg', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'Tomorrow', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 1, title: 'People', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', imageUrl: '', createdAt: new Date(), updatedAt: new Date()},
      {userId: 2, title: 'Energy', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU8vVxh5vkGYGnBwRufaH38OGYNvDCmCziXA&usqp=CAU", createdAt: new Date(), updatedAt: new Date()},
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

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stores', [
      { name: 'Store 1', location: 'Location 1', logo: 'logo1.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store 2', location: 'Location 2', logo: 'logo2.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store 3', location: 'Location 3', logo: 'logo3.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store 4', location: 'Location 4', logo: 'logo4.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store 6', location: 'Location 5', logo: 'logo5.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Store 6', location: 'Location 6', logo: 'logo6.jpg', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stores', null, {});
  }
};

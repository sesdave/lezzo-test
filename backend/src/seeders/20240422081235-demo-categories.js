'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const storeCategories = [];
    const stores = await queryInterface.sequelize.query('SELECT id FROM Stores;');

    stores[0].forEach(store => {
      const storeId = store.id;
      for (let i = 0; i < 4; i++) {
        storeCategories.push({ name: `Category ${i+1} for Store ${storeId}`, storeId, createdAt: new Date(), updatedAt: new Date() });
      }
    });

    return queryInterface.bulkInsert('Categories', storeCategories);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

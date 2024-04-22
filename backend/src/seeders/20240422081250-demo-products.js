'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];

    // Retrieve category IDs
    const categories = await queryInterface.sequelize.query('SELECT id FROM Categories;');
    const categoryIds = categories[0].map(category => category.id);

    // Create products for each category
    categoryIds.forEach(categoryId => {
      for (let i = 0; i < 4; i++) {
        const productName = `Product ${i+1} in Category ${categoryId}`;
        products.push({ name: productName, categoryId, createdAt: new Date(), updatedAt: new Date() });
      }
    });

    return queryInterface.bulkInsert('Products', products);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};

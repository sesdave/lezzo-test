const { Category, Product } = require('../models');
const redisClient = require('../util/redisClient'); 
const s3Service = require('../services/s3Services')
const fs = require('fs')

exports.createCategory = async (storeId, categoryData, files) => {
  try {
    let category = new Category(categoryData);
    console.log("file", files)
    if (files.image) {
      const photo = fs.readFileSync(files.image[0].filepath);
      const contentType = files.image[0].mimetype;
      const s3save = await s3Service.uploadImage(photo, contentType)
      if(s3save){
        category.image = s3save
      }
    }
    const newCategory = await category.save();
   // redisClient.del(`store:${storeId}`);
    redisClient.del(`categories:${storeId}`)
    return newCategory;
  } catch (error) {
    console.log('Error creating category', error)
    throw new Error('Error creating category');
  }
};

exports.getCategoriesByStoreId = async (storeId) => {
  try {
    const cachedCategories = await redisClient.get(`categories:${storeId}`);
    if (cachedCategories) {
      return JSON.parse(cachedCategories);
    }

    const categories = await Category.findAll({
      where: { StoreId: storeId },
      include: {
        model: Product
      }
    });
    if (categories) {
      await redisClient.set(`categories:${storeId}`, JSON.stringify(categories));
    }
    return categories;
  } catch (error) {
    console.log(`Error fetching categories - ${error}`)
    throw new Error('Error fetching categories');
  }
};

exports.getCategoryById = async(categoryId) =>{
    try {
        const cachedCategory = await redisClient.get(`category:${categoryId}`);
        if(cachedCategory){
            return JSON.parse(Category)
        }
        const category = await Category.findByPk(categoryId, {
            include:{
                model: Product
            }
        })
        if(category){
            await redisClient.set(`category:${categoryId}`, JSON.stringify(category))
        }

        return category
    } catch (error) {
        console.error('Error fetching category:', error);
        throw new Error('Failed to fetch category');
    }
    
}

exports.updateCategoryById = async (storeId, categoryId, categoryData) => {
  try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
          throw new Error('Category not found');
      }
      Object.assign(category, categoryData)
      const updatedCategory = await category.save()
      await redisClient.del(`categories:${storeId}`);
      return updatedCategory;
  } catch (error) {
      throw new Error('Error updating category');
  }
};

exports.deleteCategoryById = async (storeId, categoryId) => {
  try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
          throw new Error('Category not found');
      }

       await category.destroy();

      await redisClient.del(`categories:${storeId}`);
      return { message: 'Category deleted successfully' };
  } catch (error) {
      console.log("Error deleting category", error)
      throw new Error('Error deleting category');
  }
};


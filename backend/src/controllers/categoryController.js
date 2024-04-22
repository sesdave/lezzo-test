const categoryService = require('../services/categoryService');
const { parseFormData } = require('../util/helper');

exports.createCategory = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const { fields, files } = await parseFormData(req);
    const { name } = fields;
    
    if (!name) {
      return res.status(400).json({ error: 'Name required' });
    }

    const Category = { name: name[0], storeId };
    const newCategory = await categoryService.createCategory(storeId, Category, files);
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating Category:', error);
    return res.status(500).json({ error: 'Error Creating Category' });
  }
};

exports.getCategoryByID = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

exports.getCategoriesByStoreId = async (req, res) => {
  try {
    const storeId = req.params.id;
    const category = await categoryService.getCategoriesByStoreId(storeId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

exports.updateCategoryeById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const categoryId = req.params.id;
    const { fields, files } = await parseFormData(req);
    const { name } = fields;

    const updatedFields = { name: name[0] };
    const updatedCategory = await categoryService.updateCategoryById(storeId, categoryId, updatedFields);
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const categoryId = req.params.id;
    const deletedCategory = await categoryService.deleteCategoryById(storeId, categoryId);
    if (deletedCategory) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error deleting Category:', error);
    res.status(500).json({ error: 'Failed to delete Category' });
  }
};

const productService = require('../services/productService')
const { parseFormData } = require('../util/helper')
exports.createProduct = async(req, res)=>{
    try {
        const storeId = req.params.storeId
        const categoryId = req.params.categoryId
        const { fields, files } = await parseFormData(req);
        const newCategory = await productService.createProduct(storeId, categoryId, fields, files)
        return res.status(201).json(newCategory)
    } catch (error) {
        console.error('Error creating Category:', error);
        return res.status(500).json({error: "Error Creating Category"})
    }
}

exports.getProductByID = async(req, res)=>{
    try {
        const productId = req.params.id;
        const product = await productService.getProductByID(productId);
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error('Error fetching Product:', error);
        res.status(500).json({ error: 'Failed to fetch Product' });
      }
}

exports.getProductsByCategoryId = async(req, res)=>{
    try {
        const storeId = req.params.id
        const categoryId = req.params.categoryId;
        const products = await productService.getProductsByCategoryId(storeId, categoryId);
        if (products) {
          res.json(products);
        } else {
          res.status(404).json({ error: 'Products not found' });
        }
      } catch (error) {
        console.error('Error fetching Products:', error);
        res.status(500).json({ error: 'Failed to fetch Products' });
      }
}

exports.updateProductById = async (req, res) => {
  try {
        const productId = req.params.id;
        const { fields, files } = await parseFormData(req);
        const { name, price, quantity } = fields;
        const updatedFields = {name: name[0], price: price[0], quantity: quantity[0]}
        const updatedProduct = await productService.updateProductById(productId, updatedFields);
        res.json(updatedProduct);
  }catch(error){
      console.error('Error updating Product:', error);
      res.status(500).json({ error: 'Failed to update Product' });
  }
}

exports.deleteProductById = async (req, res) => {
  try {
      const productId = req.params.id;
      const result = await productService.deleteProductById(productId);
      res.json(result);
  } catch (error) {
      console.error('Error deleting Product:', error);
      res.status(500).json({ error: 'Failed to delete Product' });
  }
}
// services/productService.js
const { Product } = require('../models');
const redisClient = require('../util/redisClient'); 
const fs = require('fs')
const s3Service = require('../services/s3Services')

exports.createProduct = async (storeId, categoryId, fields, files) => {
  try {
    console.log("fields", fields)
    const {name, price, quantity} = fields
    const prod = {name: name[0], price: price[0], quantity: quantity[0], categoryId}
    let product = new Product(prod);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      const photo = fs.readFileSync(files.photo[0].filepath);
      const contentType = files.photo[0].mimetype;
      const s3save = await s3Service.uploadImage(photo, contentType)
      if(s3save){
        product.url = s3save
      }
    }
    
    const newProduct = await product.save();
    console.log(`New Prode - ${newProduct}`)
    redisClient.del(`categories:${categoryId}`);
    return newProduct;
  } catch (error) {
    console.log("Error creating product", error)
    throw new Error('Error creating product');
  }
};

exports.getProductsByCategoryId = async (storeId, categoryId) => {
  try {
    const products = await Product.findAll(
      { where: { CategoryId: categoryId }
    });
    return products;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

exports.getProductByID = async(productId)=>{
    try {
        const product = await Product.findByPk(productId)
        return product
    } catch (error) {
        throw new Error('Error fetching products')
    }
}

// Update product by ID
exports.updateProductById = async (productId, updatedFields) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    // Update product fields
    Object.assign(product, updatedFields);
    await product.save();
    return product;
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Delete product by ID
exports.deleteProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return { message: `Product deleted successfully - ${productId}` };
  } catch (error) {
    throw new Error('Error deleting product');
  }
};
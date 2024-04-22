const router = require('express').Router()
const storeController = require('../controllers/storeController')
const categoryController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

router.get('/:id', storeController.getStoreById)
router.get('/:id/category', categoryController.getCategoriesByStoreId)
router.get('/:id/:categoryId/product', productController.getProductsByCategoryId)
router.post('/:id/:categoryId/product', productController.createProduct)
router.post('/', storeController.createStore)
router.get('/', storeController.getAllStores)
router.put('/:id', storeController.updateStoreById)
router.delete('/:id', storeController.deleteStoreById)

module.exports = router
const { Router } = require('express')
const productController = require('../controllers/productController')
const router = Router()

router.get('/:id', productController.getProductByID)
router.put('/:id', productController.updateProductById)
router.delete('/:id', productController.deleteProductById)

module.exports = router

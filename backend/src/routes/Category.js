const { Router } = require('express')
const categoryController = require('../controllers/categoryController')
const router = Router()

router.get('/:id', categoryController.getCategoryByID)
router.post('/:storeId',categoryController.createCategory)
router.put('/:storeId/:id', categoryController.updateCategoryeById)
router.delete('/:storeId/:id', categoryController.deleteCategoryById)

module.exports = router

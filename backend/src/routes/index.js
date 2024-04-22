const { Router } = require('express')
const storeRoutes = require('./store')
const categoryRoutes = require('./Category')
const productRoutes = require('./product')

const router = Router()

router.use('/stores', storeRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)


module.exports = router
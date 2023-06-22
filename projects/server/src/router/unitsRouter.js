const router = require('express').Router()
const { c_units } = require('../controllers')

router.post('/unit/conversion', c_units.addConversionUnit)
router.post('/unit/default', c_units.addDefaultUnit)
router.post('/unit/default/:id', c_units.updateDefaultUnit)
router.post('/unit/conversion/:id', c_units.updateConversionUnit)
router.get('/unit/default', c_units.getDefaultUnit)
router.get('/unit/conversion', c_units.getConversionUnit)
router.get('/unit/default/:id', c_units.getDefaultUnitById)
router.get('/unit/conversion/:id', c_units.getConversionUnitById)
router.post('/unit/product', c_units.addProductUnit)
router.get('/unit/product/:id', c_units.getProductUnitById)
router.get('/unit/test/:id', c_units.test)

module.exports = router
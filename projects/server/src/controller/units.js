const db = require('../models')
const conversion_unit = db.conversion_unit
const default_unit = db.default_unit
const { countConversionQty, increaseStock } = require('../helper')
const { Sequelize } = require('../models')

const product_unit = db.product_unit
module.exports = {
    addDefaultUnit: async (req, res) => {
        try {
            const { unit } = req.body
            let isExist = await default_unit.findOne({
                where: {
                    unit_name: unit
                }
            })
            if (!isExist) {
                await default_unit.create({ unit_name: unit })
                return res.status(200).json({ message: 'insert default unit successfully' })
            } else {
                return res.status(400).json({ message: 'Default unit already axists' })
            }

        } catch (error) {
            res.status(400).json({ status: 'failed', message: error })
        }
    },
    updateDefaultUnit: async (req, res) => {
        try {
            const { unit } = req.body
            let [data] = await default_unit.update({ unit_name: unit }, {
                where: {
                    id: req.params.id
                }
            })
            if (data === 1) {
                return res.status(200).json({ message: 'Update default unit successfully' })
            } else {
                return res.status(400).json({ message: 'Update default unit failed' })
            }

        } catch (error) {
            res.status(400).json({ status: 'failed', message: error })
        }
    },
    addConversionUnit: async (req, res) => {
        try {
            const { unit } = req.body
            let isExist = await conversion_unit.findOne({
                where: {
                    unit_name: unit
                }
            })

            if (!isExist) {
                await conversion_unit.create({ unit_name: unit })
                return res.status(200).json({ message: 'insert conversion unit successfully' })
            } else {
                return res.status(400).json({ message: 'Conversion unit already axists' })
            }

        } catch (error) {
            res.status(400).json({ status: 'failed', message: error })
        }
    },
    updateConversionUnit: async (req, res) => {
        try {
            const { unit } = req.body
            let [data] = await conversion_unit.update({ unit_name: unit }, {
                where: {
                    id: req.params.id
                }
            })
            if (data === 1) {
                return res.status(200).json({ message: 'Update conversion unit successfully' })
            } else {
                return res.status(400).json({ message: 'Update conversion unit failed' })
            }

        } catch (error) {
            res.status(400).json({ status: 'failed', message: error })
        }
    },

    getDefaultUnit: async (req, res) => {
        try {
            const data = await default_unit.findAll();
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data })
            } else {
                return res.status(400).json({ status: 'failed', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed', message: error })
        }
    },
    getConversionUnit: async (req, res) => {
        try {
            const data = await conversion_unit.findAll();
            if (data.length > 0) {
                return res.status(200).json({ status: 'success', data })
            } else {
                return res.status(400).json({ status: 'failed', message: 'data not found', data: {} })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed', message: error })
        }
    },
    addProductUnit: async (req, res) => {
        const { product_id, default_unit_qty, default_unit_id, conversion_unit_qty, conversion_unit_id } = req.body
        try {
            const isExist = await product_unit.findOne({
                where: {
                    product_id: product_id
                }
            });
            if (!isExist) {
                await product_unit.create({
                    product_id, default_unit_qty, default_unit_id, conversion_unit_qty, conversion_unit_id
                })

                return res.status(200).json({ status: 'success', message: 'add product unit successfully' })
            } else {
                return res.status(400).json({ status: 'failed', message: 'Product already in units' })
            }
        } catch (error) {
            return res.status(400).json({ status: 'failed', message: error })
        }
    },
    getProductUnitById: async (req, res) => {
        const { product_id } = req.params.id
        try {
            const data = await product_unit.findOne({
                where: {
                    product_id: product_id
                }
            });
            console.log(data)
            return res.status(200).json({ status: 'success', data })

        } catch (error) {
            return res.status(400).json({ status: 'failed', message: error })
        }
    },
    test: async (req, res) => {
        try {
            let data = await increaseStock(1, 100)
            console.log(data)
            if (data) {
                res.json({ message: 'Success' })
            } else {
                res.json({ message: 'Faai' })
            }
        } catch (error) {
            res.json({ message: 'Faail' })
        }
    }

}
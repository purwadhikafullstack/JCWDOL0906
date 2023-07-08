const { updateStock, addStock } = require('../helpers/units')
const db = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const product = db.Product
const product_detail = db.product_details
const stock = db.stock
const conversion_unit = db.conversion_unit
const default_unit = db.default_unit
const category = db.Category

module.exports = {

    // addProduct: async (req, res) => {
    //     const { product_name, price, image } = req.body
    //     try {

    //         let isExist = await product.findOne({
    //             where: {
    //                 product_name: product_name
    //             }
    //         })

    //         if (!isExist) {
    //             await product.create(req.body)
    //             return res.status(200).json({ message: "Product insert successfully" })
    //         } else {
    //             return res.status(400).json({ message: "Product already exists !" })
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         return res.status(400).json({ message: "Product already exists !" })
    //     }
    // },
    // getProduct: async (req, res) => {
    //     try {
    //         let data = await product.findAll()

    //         if (data.length > 0) {
    //             return res.status(200).json({ status: 'success', data })
    //         } else {
    //             return res.status(400).json({ status: 'failed', data: {} })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // getProductById: async (req, res) => {
    //     try {
    //         let data = await product.findOne({
    //             where: {
    //                 id: req.params.id
    //             }
    //         })

    //         if (data.length > 0) {
    //             return res.status(200).json({ status: 'success', data })
    //         } else {
    //             return res.status(400).json({ status: 'failed', data: {} })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // getProductDetailByProductId: async (req, res) => {
    //     try {
    //         let data = await product_detail.findOne({
    //             where: {
    //                 product_id: req.query.detail
    //             }
    //         })
    //         console.log(data)
    //         const { dataValues } = data
    //         if (dataValues) {
    //             return res.status(200).json({ status: 'success', dataValues })
    //         } else {
    //             return res.status(400).json({ status: 'failed', data: {} })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // updateDetailProduct: async (req, res) => {
    //     console.log(req.body)
    //     try {
    //         let isExists = await product_detail.findOne({
    //             where: {
    //                 product_id: req.params.id
    //             }
    //         })

    //         if (!isExists) {
    //             let [data] = await product_detail.create(req.body)
    //             console.log(data)
    //             if (data === 0) {
    //                 return res.status(400).json({ message: 'Update product failed' })
    //             } else {
    //                 return res.status(200).json({ status: 'Update product successfully' })
    //             }

    //         } else {
    //             let [data] = await product_detail.update(req.body, {
    //                 where: {
    //                     product_id: req.params.id
    //                 }
    //             })
    //             console.log(data)
    //             if (data === 0) {
    //                 return res.status(400).json({ message: 'Update product failed' })
    //             } else {
    //                 return res.status(200).json({ status: 'Update product successfully' })
    //             }
    //         }


    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // deleteProduct: async (req, res) => {
    //     try {
    //         const data = await product.destroy({
    //             where: {
    //                 id: req.body.id
    //             }
    //         })

    //         if (data) {
    //             console.log('null')
    //             const data = await product_detail.destroy({
    //                 where: {
    //                     product_id: req.body.id
    //                 }
    //             })

    //             if (data) return res.status(200).json({ message: 'Delete product successfully' })
    //         } else {
    //             return res.status(200).json({ message: 'Product not found' })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // getProductStockById: async (req, res) => {

    //     try {

    //         const data = await stock.findOne({
    //             // include: [conversion_unit],
    //             where: {
    //                 product_id: req.params.id
    //             }
    //         });
    //         const { dataValues } = data
    //         console.log(dataValues)
    //         return res.status(200).json({ status: 'success', dataValues })

    //     } catch (error) {
    //         console.log(error)
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },
    // updateProductStockById: async (req, res) => {

    //     try {
    //         console.log("kesini")
    //         const updated = await addStock(req.params.id, req.body.default_unit_qty)
    //         console.log('lewat')
    //         if (updated) {
    //             return res.status(200).json({ status: 'success', message: 'Updated stock successfully' })
    //         } else {
    //             return res.status(400).json({ status: 'success', message: 'Updated stock failed' })
    //         }


    //     } catch (error) {
    //         return res.status(400).json({ status: 'failed', message: error })
    //     }
    // },

    getStoreProduct: async (req, res) => {
        console.log(req.query.page)
        let sort = ['product_name', 'ASC']
        let limit = 10
        let offset = 0
        let param = {
            is_deleted: 0,
        }

        if (req.query.sort && req.query.sort === "1") {
            sort = ['product_name', 'ASC']
        }
        if (req.query.sort && req.query.sort === "2") {
            sort = ['product_name', 'DESC']
        }
        if (req.query.sort && req.query.sort === "3") {
            sort = ['price', 'ASC']
        }
        if (req.query.sort && req.query.sort === "4") {
            sort = ['price', 'DESC']
        }

        if (req.query.page && req.query.page > 1) {
            offset = (Number(req.query.page) - 1) * limit
        }
        if (req.query.category && req.query.category > 0) {
            param.category_id = Number(req.query.category)
        }
        if (req.query.name && req.query.name !== "") {
            param.product_name = { [Op.like]: `%${req.query.name}%` }
        }
        try {
            const { count, rows } = await product.findAndCountAll({
                include: [category],
                where: param,
                order: [sort],
                offset: offset,
                limit: 10
            })
            // console.log(dataCount)
            res.status(200).json({ count, rows })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    getStoreProductDetail: async (req, res) => {
        try {
            let data = await product_detail.findOne({
                where: {
                    product_id: req.params.id
                }
            })
            console.log(data)
            const { dataValues } = data
            if (dataValues) {
                return res.status(200).json({ status: 'success', dataValues })
            } else {
                return res.status(400).json({ status: 'failed', data: {} })
            }
        } catch (error) {
            return res.status(500).json({ status: 'failed', message: error })
        }
    }
}
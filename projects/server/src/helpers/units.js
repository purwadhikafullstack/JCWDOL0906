const db = require('../models')
const product_unit = db.product_unit
const stock = db.stock


exports.createStock = (qty, conversion_qty, default_qty, type) => {
    let stock_default, stockConversion;
    if (type === 'default') {
        stock_default = qty * defaultQty
        stockConversion = stockDefault * conversionQty
    } else {
        stockDefault = Math.ceil(qty / conversionQty)
        stockConversion = qty
    }
    return {
        stockDefault, stockConversion
    }
}

exports.addStock = async (product_id, qty) => {
    console.log(product_id, qty)
    let stock_default = 0,
        stock_conversion = 0,
        update_default_stock = 0,
        update_conversion_stock = 0,
        exists_default_unit_qty = 0,
        exists_conversion_unit_qty = 0,
        exists_default_unit_id = 0,
        exists_conversion_unit_id = 0;

    try {
        const data = await product_unit.findOne({
            where: {
                product_id: product_id
            }
        })
        console.log('Data unit =============> ', data)
        exists_default_unit_id = data.dataValues.default_unit_id
        exists_conversion_unit_id = data.dataValues.conversion_unit_id
        exists_default_unit_qty = data.dataValues.default_unit_qty
        exists_conversion_unit_qty = data.dataValues.conversion_unit_qty
        stock_default = qty * exists_default_unit_qty
        stock_conversion = stock_default * exists_conversion_unit_qty

        const data_stock = await stock.findOne({
            where: {
                product_id: product_id
            }
        })
        console.log('Data stock =============> ', data_stock)
        console.log("lewat stock")
        if (data_stock) {
            update_default_stock = stock_default + data_stock.dataValues.default_unit_qty
            update_conversion_stock = stock_conversion + data_stock.dataValues.conversion_unit_qty

            await stock.update({ default_unit_qty: update_default_stock, conversion_unit_qty: update_conversion_stock }, {
                where: {
                    product_id: product_id
                }
            })
            console.log('Update stock =============>')
            return true
        } else {
            console.log(product_id)
            console.log(stock_default)
            console.log(exists_default_unit_id)
            console.log(stock_conversion)
            console.log(exists_conversion_unit_id)
            console.log('Mulai Create stock =============>')

            const data = await stock.create({ product_id: product_id, default_unit_qty: stock_default, default_unit_id: exists_default_unit_id, conversion_unit_qty: stock_conversion, conversion_unit_id: exists_conversion_unit_id, qty: 0 })
            console.log('Selesai Create stock =============>', data)
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

exports.updateStock = async (product_id, qty) => {
    let stock_default, stock_conversion, update_default_stock, update_conversion_stock;

    try {
        const data = await product_unit.findOne({
            where: {
                product_id: product_id
            }
        })

        stock_default = qty * data.dataValues.default_unit_qty
        stock_conversion = stock_default * data.dataValues.conversion_unit_qty

        const data_stock = await stock.findOne({
            where: {
                product_id: product_id
            }
        })

        update_default_stock = Math.abs(stock_default - data_stock.dataValues.default_unit_qty)
        update_conversion_stock = Math.abs(stock_conversion - data_stock.dataValues.conversion_unit_qty)

        await stock.update({ default_unit_qty: update_default_stock, conversion_unit_qty: update_conversion_stock }, {
            where: {
                product_id: product_id
            }
        })

        return true
    } catch (error) {
        return false
    }
}
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

    let stock_default = 0, stock_conversion = 0, update_default_stock = 0, update_conversion_stock = 0;

    try {
        let data = await product_unit.findOne({
            where: {
                product_id: product_id
            }
        })

        stock_default = qty * data.dataValues.default_unit_qty
        stock_conversion = stock_default * data.dataValues.conversion_unit_qty

        let data_stock = await stock.findOne({
            where: {
                product_id: product_id
            }
        })

        if (data_stock) {
            update_default_stock = stock_default + data_stock.dataValues.default_unit_qty
            update_conversion_stock = stock_conversion + data_stock.dataValues.conversion_unit_qty

            await stock.update({ default_unit_qty: update_default_stock, conversion_unit_qty: update_conversion_stock }, {
                where: {
                    product_id: product_id
                }
            })
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

exports.updateStock = async (product_id, qty) => {
    let stock_default, stock_conversion, update_default_stock, update_conversion_stock;

    try {
        let data = await product_unit.findOne({
            where: {
                product_id: product_id
            }
        })

        stock_default = qty * data.dataValues.default_unit_qty
        stock_conversion = stock_default * data.dataValues.conversion_unit_qty

        let data_stock = await stock.findOne({
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
const { QueryTypes } = require("sequelize");
const { successResponse, failedResponse } = require("../helpers/apiResponse");
const db = require("../models");
const { sequelize } = require("../models");
const transaction = db.Transaction
const transaction_detail = db.transaction_details


module.exports = {
    getUserTransactionStatus: async (req, res) => {

        try {

            // const data = await transaction.findAll({ where: { user_id: 1 } })
            const data = await transaction.findAll({
                attributes: [
                    'status',
                    [sequelize.fn('COUNT', sequelize.col('status')), 'n_status'],
                ],
                group: ['status']
            });


            res.status(200).json(successResponse("", data, ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    },
    getUserTransactionByStatus: async (req, res) => {
        const status = req.params.status
        try {
            const data = await sequelize.query(`
            SELECT * FROM transactions WHERE status="${status}"
            `, { type: QueryTypes.SELECT, })

            res.status(200).json(successResponse("", data, ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    },
    getUserTransactionByCode: async (req, res) => {
        const code = req.params.code
        try {
            const data = await sequelize.query(`
            SELECT td.*,p.product_name,du.unit_name FROM transaction_details td 
            JOIN products p ON td.product_id=p.id
            JOIN default_unit du ON du.id=td.unit
            WHERE transaction_code="${code}"
            `, { type: QueryTypes.SELECT, })

            res.status(200).json(successResponse("", data, ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    }
}
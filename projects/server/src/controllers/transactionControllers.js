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
            SELECT ts.*,ad.address FROM Transactions ts JOIN Addresses ad ON ts.address_id=ad.id WHERE status="${status}" AND is_deleted=0
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
            let data = {}
            const transactions = await sequelize.query(`
            SELECT ts.*,adr.address FROM Transactions ts 
            JOIN Addresses adr ON ts.address_id=adr.id
            WHERE ts.transaction_code="${code}"
            `, { type: QueryTypes.SELECT, })
            const detail = await sequelize.query(`
            SELECT td.*,p.product_name,du.unit_name FROM Transaction_Details td
            LEFT JOIN Products p ON p.id=td.product_id
            LEFT JOIN default_unit du ON du.id=td.unit
            WHERE td.transaction_code="${code}"
            `, { type: QueryTypes.SELECT, })
            data.transaction = transactions
            data.details = detail
            res.status(200).json(successResponse("", data, ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    },

    deleteUserTransaction: async (req, res) => {
        const code = req.params.code
        try {
            const data = await transaction.update({
                is_deleted: 1
            },
                { where: { transaction_code: code } }
            )
            console.log(data)
            res.status(200).json(successResponse("", "", ""))
        } catch (error) {
            console.log(error)
            res.status(200).json(failedResponse(error))
        }
    },
    uploadPayment: async (req, res) => {

        const image = req.file.path
        try {
            const update = await transaction.update({ payment_receipt: image }, {
                where: {
                    transaction_code: req.params.code
                }
            })

            if (update) {
                await transaction.update({ status: 'Menunggu Konfirmasi' }, {
                    where: {
                        transaction_code: req.params.code
                    }
                })
            }

            res.status(200).json(successResponse("Success upload payment proof", "", ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    }
}
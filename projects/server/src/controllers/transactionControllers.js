const { QueryTypes } = require("sequelize");
const { successResponse, failedResponse } = require("../helpers/apiResponse");
const db = require("../models");
const { sequelize } = require("../models");
const { v4: uuidv4 } = require("uuid");

const transaction = db.Transaction;
const transaction_detail = db.Transaction_Details;
const Cart = db.Cart;

module.exports = {
    createOrder: async (req, res) => {
        console.log("kesini");
        const { userId } = req;
        console.log('user id =======>', userId)
        const { total_price, shipping, cart, address_id, sub_total, service_cost } =
            req.body;
        let code = "INV-" + uuidv4().split("-")[0];
        console.log(req.body);
        console.log("address id:", address_id);
        const t = await sequelize.transaction();

        try {
            const transactionResult = await transaction.create(
                {
                    transaction_code: code,
                    user_id: userId,
                    total_price,
                    shipping,
                    address_id,
                    sub_total,
                    shipping_cost: service_cost,
                },
                { transaction: t }
            );
            console.log("hasil", transactionResult);
            console.log("cart", cart);
            for (const product of cart) {
                await transaction_detail.create(
                    {
                        transaction_code: transactionResult.transaction_code,
                        product_id: product.product_id,
                        price: product.price,
                        qty: product.qty,
                        unit: product.unit,
                    },
                    { transaction: t }
                );
            }
            await Cart.destroy(
                {
                    where: {
                        user_id: userId,
                    },
                },
                { transaction: t }
            );
            await t.commit();

            return res.status(200).json({ message: "Checkout Product successfully" });
        } catch (error) {
            console.log(error);
            await t.rollback();
            return res.status(500).json({ message: "Internal server error" });
        }

        //   createOrderDetails: async (req, res) => {
        //     const { product_id, qty, unit } = req.body;

        //     try {
        //       const dataOrder = await transaction_detail.create({
        //         ...req.body,
        //         total_price: parseInt(quantity) * parseInt(product_price),
        //       });

        //       console.log(user_id);

        //       await Cart.destroy({
        //         where: {
        //           user_id,
        //         },
        //       });
        //       console.log("this");

        //       return res.status(200).json({
        //         message: `new order_details from user ${user_id} has been edded`,
        //         result: dataOrder,
        //       });
        //     } catch (error) {
        //       console.log(error);
        //       return res.status(500).json({
        //         message: error.toString(),
        //       });
        //     }
    },
    getUserTransactionStatus: async (req, res) => {
        try {
            // const data = await transaction.findAll({ where: { user_id: 1 } })
            const data = await transaction.findAll({
                attributes: [
                    "status",
                    [sequelize.fn("COUNT", sequelize.col("status")), "n_status"],
                ],
                group: ["status"],
            });

            res.status(200).json(successResponse("", data, ""));
        } catch (error) {
            console.log(error);
            res.status(500).json(failedResponse(error));
        }
    },
    getUserTransactionByStatus: async (req, res) => {
        const status = req.params.status
        try {
            const data = await sequelize.query(`
          SELECT ts.*,ad.address_name FROM Transactions ts JOIN Addresses ad ON ts.address_id=ad.id WHERE status="${status}" AND is_deleted=0
          `, { type: QueryTypes.SELECT, })
            res.status(200).json(successResponse("", data, ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    },
    getUserTransactionByCode: async (req, res) => {
        const code = req.params.code;
        try {
            let data = {};
            const transactions = await sequelize.query(
                `
            SELECT ts.*,adr.address_name FROM Transactions ts 
            JOIN Addresses adr ON ts.address_id=adr.id
            WHERE ts.transaction_code="${code}"
            `,
                { type: QueryTypes.SELECT }
            );
            const detail = await sequelize.query(
                `
            SELECT td.*,p.product_name,du.unit_name FROM Transaction_Details td
            LEFT JOIN Products p ON p.id=td.product_id
            LEFT JOIN default_unit du ON du.id=td.unit
            WHERE td.transaction_code="${code}"
            `,
                { type: QueryTypes.SELECT }
            );
            data.transaction = transactions;
            data.details = detail;
            res.status(200).json(successResponse("", data, ""));
        } catch (error) {
            console.log(error);
            res.status(500).json(failedResponse(error));
        }
    },

    deleteUserTransaction: async (req, res) => {
        const code = req.params.code
        try {
            const data = await transaction.update({
                status: 'Dibatalkan'
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
        const image = req.file.path;
        try {
            const update = await transaction.update(
                { payment_receipt: image },
                {
                    where: {
                        transaction_code: req.params.code,
                    },
                }
            );

            if (update) {
                await transaction.update(
                    { status: "Menunggu Konfirmasi" },
                    {
                        where: {
                            transaction_code: req.params.code,
                        },
                    }
                );
            }

            res.status(200).json(successResponse("Success upload payment proof", "", ""))
        } catch (error) {
            console.log(error)
            res.status(500).json(failedResponse(error))
        }
    },
    getAdminTransaction: async (req, res) => {
        console.log(req.query.sort)
        let param = ''
        let sort = `ts.createdAt DESC`
        if (req.query.status && req.query.status !== "") {
            param += `WHERE ts.status="${req.query.status}"`
        }
        if (req.query.sort && req.query.sort == '1') {
            sort = `ts.createdAt DESC`
        }
        if (req.query.sort && req.query.sort == '2') {
            sort = `ts.createdAt ASC`
        }
        if (req.query.sort && req.query.sort == '3') {
            sort = `ts.transaction_code DESC`
        }
        if (req.query.sort && req.query.sort == '4') {
            sort = `ts.transaction_code ASC`
        }
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.size) || 6;
            const data = await sequelize.query(
                `
      SELECT ts.*,usr.username FROM 
      Transactions ts 
      JOIN Users usr ON usr.id=ts.user_id
            ${param}
      ORDER BY ${sort}
      LIMIT ${pageSize}
      OFFSET ${(page - 1) * pageSize}
      `,
                {
                    replacements: { pageSize: "active", page: "active" },
                    type: QueryTypes.SELECT,
                }
            );

            const [count] = await sequelize.query(
                `SELECT COUNT(ts.id) as count FROM 
      Transactions ts 
      JOIN Users usr ON usr.id=ts.user_id
      ${param}
      ORDER BY ${sort}
      `,
                {
                    type: QueryTypes.SELECT,
                }
            );

            res.status(200).send({
                data: data,
                count: count,
                message: "Get All Transaction Succesfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(failedResponse(error));
        }
    },
    confirmTransaction: async (req, res) => {
        const code = req.params.code
        const action = req.params.action
        console.log(code)
        try {

            const status = await transaction.findAll({ where: { transaction_code: code } })
            // console.log(status[0].status)
            // const { dataValues } = status
            // console.log(dataValues)

            if (action === 'confirm') {
                if (status[0].status === 'Dibatalkan') return res.status(400).json(failedResponse("Transaksi tidak bisa dikonfirmasi"))
                if (status[0].status !== 'Menunggu Konfirmasi') return res.status(400).json(failedResponse("Status transaksi sudah terkonfirmasi"))
                const data = await transaction.update({ status: 'Diproses' }, {
                    where: {
                        transaction_code: code
                    }
                })
                res.status(200).json(successResponse("Success, transaction already confirmed", "", ""))
            } else {
                if (dataValues.status !== 'Menunggu Konfirmasi') return res.status(400).json(failedResponse("Transaksi tidak bisa dibatalkan"))
                const data = await transaction.update({ status: 'Menunggu Pembayaran' }, {
                    where: {
                        transaction_code: code
                    }
                })
                res.status(200).json(successResponse("Success, transaction rejected", "", ""))
            }


        } catch (error) {
            return res.status(500).json(failedResponse(error))
        }

    },
    rejectTransaction: async (req, res) => {
        const code = req.params.code
    }
};

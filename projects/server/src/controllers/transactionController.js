const axios = require("axios");
const db = require("../models");
const { v4: uuidv4 } = require("uuid");

const transaction = db.transaction;
const transaction_details = db.transaction_details;

// // cart di fe harus simpan data unit, product status

module.exports = {
  createOrder: async (req, res) => {
    const {
      transaction_code,
      user_id,
      total_price,
      shipping,
      cart,
      address_id,
      sub_total,
      service_cost,
    } = req.body;

    try {
      const transactionResult = await transaction.create({
        transaction_code: "INV/RSP/" + uuidv4(),
        user_id,
        total_price,
        shipping,
        cart,
        address_id,
        sub_total,
        service_cost,
      });
      cart.forEach((product) => {});
      return res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  createOrderDetails: async (req, res) => {
    const { product_id, qty, unit } = req.body;

    try {
      const dataOrder = await transaction_details.create({
        ...req.body,
        total_price: parseInt(quantity) * parseInt(product_price),
      });

      console.log(user_id);

      await Cart.destroy({
        where: {
          user_id,
        },
      });
      console.log("this");

      return res.status(200).json({
        message: `new order_details from user ${user_id} has been edded`,
        result: dataOrder,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  },
};

// // 1. masukin ke body
// // hasil disimpan di transaction Result
// // transaction details: loop (forEach)
// // data cart dr fe dikirim ke body dalam bentuk array atau cart ambil dari database (const cart await.findAll where user id = 2)

// shipping dari json, kirim string nama pengiriminan "" yang dikirim di body
// cart diatas itu dlm bentuk array dr fe
// di table transaction tambahin shipping_cost
// transaction, sub-total harga barang, shipping_cost (total_price)
// tambah colomn sub_total dan shippingCost(service_cost)

// cart for each itu masuk ke transaction detail
// tambahin token
// cart dr body dan database dibedakan cuma cart di db itu di destroy where user_id,

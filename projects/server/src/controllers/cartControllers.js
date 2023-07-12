const db = require("../models");
const Sequelize = require("sequelize");
const { successResponse, failedResponse } = require("../helpers/apiResponse");
const cart = db.Cart;
const product = db.Product;
const user = db.User;
const stock = db.stock;
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    // try {
    //     let sort = ['product_id', 'ASC']
    //     let limit = 5
    //     let offset = 0
    //     let param = {
    //         is_deleted: 0,
    //     }
    if (req.query.page && req.query.page > 1) {
      offset = (Number(req.query.page) - 1) * limit;
    }
    //     const { count, rows } = await cart.findAndCountAll({
    //         include: [product],
    //         order: [sort],
    //         offset: offset,
    //         limit: limit
    //     })
    //     res.status(200).json(successResponse("", rows, count))
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json(failedResponse(error))
    // }
    let limit = 5;
    let offset = 0;

    try {
      const [a] = await sequelize.query(
        `SELECT * FROM carts c JOIN products p ON c.product_id = p.id LIMIT ${limit} OFFSET ${offset}`
      );

      console.log(a);

      res.status(200).json(successResponse("", a, a.length));
    } catch (error) {
      console.log(error);
      res.status(500).json(failedResponse(error));
    }
  },

  addToCart: async (req, res) => {
    const { product_id, qty, price } = req.body;
    try {
      const productStock = await stock.findOne({
        where: {
          product_id: product_id,
        },
      });
      const stocks = productStock.dataValues.default_unit_qty;

      const isExists = await cart.findOne({
        where: {
          product_id: product_id,
        },
      });

      // console.log(isExists)

      if (!isExists) {
        const user_id = req.userId;
        const total_price = Number(qty) * Number(price);
        await cart.create({
          user_id,
          product_id,
          qty,
          price,
          total_price,
        });
        res
          .status(200)
          .json(successResponse("add to cart success", null, null));
      } else {
        const { dataValues } = isExists;
        const qty = Number(dataValues.qty) + 1;
        if (qty > Number(stocks))
          return res
            .status(400)
            .json(failedResponse("Quantity melebihi stock barang"));
        const total_price = Number(qty) * Number(dataValues.price);
        await cart.update(
          { qty: qty, total_price: total_price },
          {
            where: {
              product_id: product_id,
            },
          }
        );
        res
          .status(200)
          .json(successResponse("update product success", null, null));
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(failedResponse(error));
    }
  },

  updateCart: async (req, res) => {
    console.log(req.body);
    try {
      const productStock = await stock.findOne({
        where: {
          product_id: req.params.id,
        },
      });
      const stocks = productStock.dataValues.default_unit_qty;

      console.log("STOCK", stocks);
      const isExists = await cart.findOne({
        where: {
          product_id: req.params.id,
        },
      });
      const { dataValues } = isExists;

      let qty = 0;
      if (req.body.method === "plus") {
        qty = Number(dataValues.qty) + 1;
      } else {
        Number(dataValues.qty) > 1
          ? (qty = Number(dataValues.qty - 1))
          : (qty = Number(dataValues.qty));
      }

      if (qty > Number(stocks))
        return res
          .status(400)
          .json(failedResponse("Quantity melebihi stock barang"));

      const total_price = Number(qty) * Number(dataValues.price);
      await cart.update(
        { qty: qty, total_price: total_price },
        {
          where: {
            product_id: req.params.id,
          },
        }
      );

      res
        .status(200)
        .json(successResponse("update product success", null, null));
    } catch (error) {
      console.log(error);
      res.status(500).json(failedResponse(error));
    }
  },

  deleteCart: async (req, res) => {
    try {
      await cart.destroy({ where: { product_id: req.params.id } });
      res.status(200).json(successResponse("delete item success", null, null));
    } catch (error) {
      console.log(error);
      res.status(500).json(failedResponse(error));
    }
  },
};

const db = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const auth = db.auth;
const product = db.product;

module.exports = {
  addProduct: async (req, res) => {
    // let token = req.headers.auth;
    // //jika token.roles = 1 maka process try catch dilanjutkan

    // // if (!token) {
    // //   return res.status(400).send("token unauthorized or expired");
    // }
    // kalo bukan 1, tulis unauthorized product

    // let data = JSON.parse(req.body.data);
    const data = JSON.parse(req.body.data);
    const {
      product_name,
      price,
      description,
      indication,
      dose,
      rules,
      createdBy,
    } = data;

    const image = req.file.path;
    console.log(req.body);

    try {
      let isExist = await product.findOne({
        where: {
          product_name: product_name,
        },
      });

      if (!isExist) {
        await product.create({
          product_name,
          price,
          image,
          description,
          indication,
          dose,
          rules,
          createdBy,
        });
        return res.status(200).json({ message: "Product added successfully" });
      } else {
        return res.status(400).json({ message: "Product already exists! " });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal server error" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.size) || 6;

      const result = await product.findAndCountAll({
        where: { is_deleted: false },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      res.status(200).send({
        data: result.rows,
        count: result.count,
        message: "Get All Product Succesfully",
      });
    } catch (error) {
      res.status(400).send({
        error: "Failed to get all products",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      let data = await product.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (data.length > 0) {
        return res.status(200).json({ status: "success", data });
      } else {
        return res.status(400).json({ status: "failed", data: {} });
      }
    } catch (error) {
      return res.status(400).json({ status: "failed", message: error });
    }
  },
  updateProduct: async (req, res) => {
    console.log(req.body);
    try {
      let isExists = await product.findOne({
        where: {
          product_id: req.params.id,
        },
      });

      if (!isExists) {
        let [data] = await product.create(req.body);
        console.log(req.body);
        console.log(data);
        if (data === 0) {
          return res.status(400).json({ message: "Update product failed " });
        } else {
          return res
            .status(200)
            .json({ status: "Update product successfully " });
        }
      }
    } catch (error) {
      return res.status(400).json({ status: "failed", message: error });
    }
  },
  deleteProduct: async (req, res) => {
    console.log(req.params.id);
    try {
      const data = await product.update(
        {
          is_deleted: true,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      console.log(data);
      if (data) {
        console.log("null");
        // const data = await product_details.destroy({
        //   where: {
        //     product_id: req.params.id,
        //   },
        // });

        // if (data)
        return res.status(200).json({ message: "Delete product successfully" });
      } else {
        return res.status(200).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(400).json({ status: "failed", message: error });
    }
  },
};

// showProduct: async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = 9;

//     const productName = req.query.product_name || null;

//     // const categoryQuery = categoryId ? { Category_id: categoryId } : {};
//     const productQuery = productName
//       ? { name: { [Op.like]: "%" + productName + "%" } }
//       : {};

//     const totalRows = await product.count();
//     const totalPage = Math.ceil(totalRows / pageSize);

//     const result = await product.findAndCountAll({
//       where: {
//         // ...categoryQuery,
//         ...productQuery,
//       },
//       // order: [[req.query.order, req.query.sort]], // order by ... desc/asc
//       limit: pageSize,
//       offset: (page - 1) * pageSize,
//     });
//     res.status(200).send({
//       status: true,
//       result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// },

//   productDetails: async (req, res) => {
//     try {
//       const query = `SELECT products.id, products.name AS product_name, products.description, products.price, products.image, products.stock,
//       categories.id AS category_id, categories.name AS category,
//       merchants.id AS merchant_id, merchants.name AS merchant_name, merchants.address
//       FROM products
//       INNER JOIN categories ON products.Category_id = categories.id
//       INNER JOIN merchants ON products.merchant_id = merchants.id
//       WHERE products.id = ${req.params.id};`;
//       const [results] = await db.sequelize.query(query);
//       res.status(200).send({
//         status: true,
//         results,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(400).send(err);
//   //     }
//     },
// };

// include product list

const db = require("../models");
const jwt = require("jsonwebtoken");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const { addStock } = require("../helpers/units");
const { successResponse, failedResponse } = require("../helpers/apiResponse");
const default_unit = db.default_unit

const auth = db.auth;
const product = db.product;
const category = db.Category;
const stock = db.stock

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
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.size) || 6;

      // const result = await product.findAndCountAll({
      //   include: [category],
      //   include: [{ model: stock, include: [default_unit] }],
      //   where: { is_deleted: false },
      //   limit: pageSize,
      //   offset: (page - 1) * pageSize,
      // });

      const a = await sequelize.query(`
      SELECT 
      p.*, 
      s.default_unit_qty as defaultQty , 
      s.conversion_unit_qty as conversionQty, 
      du.unit_name as defaultUnit,
      c.category_name as category,
      cu.unit_name as conversionUnit FROM 
      products p 
      LEFT JOIN stocks s ON p.id=s.product_id 
      LEFT JOIN categories c ON p.category_id=c.id
      LEFT JOIN default_unit du ON s.default_unit_id=du.id 
      LEFT JOIN conversion_unit cu ON s.conversion_unit_id=cu.id
      WHERE p.is_deleted=0
      LIMIT ${pageSize}
      OFFSET ${(page - 1) * pageSize}
      `, {
        replacements: { pageSize: 'active', page: 'active' },
        type: QueryTypes.SELECT
      })
      console.log(a)
      // console.log(result);
      res.status(200).send({
        data: a,
        count: a.length,
        message: "Get All Product Succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Failed to get all products",
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id
      const [data] = await sequelize.query(`
      SELECT 
      p.*, 
      s.default_unit_qty as defaultQty , 
      s.conversion_unit_qty as conversionQty, 
      du.unit_name as defaultUnit,
      c.category_name as category,
      cu.unit_name as conversionUnit FROM 
      products p 
      LEFT JOIN stocks s ON p.id=s.product_id 
      LEFT JOIN categories c ON p.category_id=c.id
      LEFT JOIN default_unit du ON s.default_unit_id=du.id 
      LEFT JOIN conversion_unit cu ON s.conversion_unit_id=cu.id
      WHERE p.is_deleted=0 AND p.id=${id}
      `, {
        replacements: { id: 'active' },
        type: QueryTypes.SELECT
      })
      res.status(200).json(successResponse("get data product success", data, ""));
    } catch (error) {
      res.status(500).json(failedResponse(error));;
    }
  },
  updateProduct: async (req, res) => {
    try {
      let isExists = await product.findOne({
        where: {
          product_id: req.params.id,
        },
      });

      if (!isExists) {
        let [data] = await product.create(req.body);
        if (data === 0) {
          return res.status(400).json({ message: "Update product failed " });
        } else {
          return res
            .status(200)
            .json({ status: "Update product successfully " });
        }
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error });
    }
  },
  deleteProduct: async (req, res) => {
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
      if (data) {
        return res.status(200).json({ message: "Delete product successfully" });
      } else {
        return res.status(200).json({ message: "Product not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error });
    }
  },
  addProductStock: async (req, res) => {
    try {
      const data = await addStock(req.params.id, req.body.qty)

      if (data) return res.status(200).json(successResponse("success add stock", "", ""))
      res.status(400).json(failedResponse("add product stock failed, product unit not exists"))
    } catch (error) {
      res.status(500).json(failedResponse(error))
    }
  },

  updateProductStock: async (req, res) => {
    try {
      const data = await updateStock(req.params.id, req.body.qty)

      res.status(200).json(successResponse("success add stock", "", ""))
    } catch (error) {
      res.status(500).json(failedResponse(error))
    }
  },

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
};



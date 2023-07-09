//import sequelize
const { sequelize } = require("./../models");
const db = require("../models");
const axios = require("axios");
const address = db.Address;
const user = db.User;

module.exports = {
  getAddress: async (req, res) => {
    try {
      const { userId } = req;
      // console.log(getData);
      let data = await address.findAll({
        where: {
          user_id: userId,
        },
        include: {
          model: user,
        },
      });
      // console.log(data);
      res.status(200).send({
        message: "Get All Address Success",
        data,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: error,
      });
    }
  },
  postAddress: async (req, res) => {
    try {
      let { detail, province_id, city_id, is_default, label } = req.body;
      console.log(req.body);
      let { userId } = req;
      let data = await address.create({
        detail,
        province_id,
        city_id,
        is_default,
        label,
        user_id: userId,
      });
      res.status(200).json({
        message: "Post Address Success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
        data: error,
      });
    }
  },
  updateAddress: async (req, res) => {
    try {
      const { userId } = req;
      const { detail, province_id, city_id, is_default, label } = req.body;

      await address.update(
        {
          detail,
          province_id,
          city_id,
          is_default,
          label,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );

      const addressData = await address.findOne({
        where: {
          user_id: userId,
        },
      });
      console.log(addressData);

      return res.status(200).json({
        message: "Changes Saved",
        result: addressData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
};

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
      let {
        detail,
        province_name,
        province_id,
        city_name,
        city_id,
        is_default,
        label,
        postal_code,
      } = req.body;
      console.log("body", req.body);
      let { userId } = req;
      let data = await address.create({
        address_name: detail,
        province_name,
        province_id,
        city_name,
        city_id,
        is_default,
        label,
        postal_code,
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
      const {
        address_name,
        province_name,
        province_id,
        city_name,
        city_id,
        is_default,
        label,
        postal_code,
      } = req.body;

      await address.update(
        {
          address_name,
          province_name,
          province_id,
          city_name,
          city_id,
          is_default,
          label,
          postal_code,
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
  deleteAddress: async (req, res) => {
    try {
      const data = await address.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        return res.status(200).json({ message: "Delete address successfully" });
      } else {
        return res.status(200).json({ message: "Address not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "failed", message: error });
    }
  },
};

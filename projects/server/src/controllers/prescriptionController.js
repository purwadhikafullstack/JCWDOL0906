const db = require("../models");
const transaction = db.Transaction;
const { v4: uuidv4 } = require('uuid');

module.exports = {
  addPrescription: async (req, res) => {
    try {
      console.log(req.body);
      const data = (req.body);
      const userId = req.userId;
      const { status, address_id, shipping, createdBy } = data;
      const code = "INV-RSP-" + uuidv4().split("-")[0];
      console.log(userId);
      console.log(req.file);
      const image = req.file.path;
      console.log(image);
      const result = await transaction.create({
        transaction_code: code,
        image,
        status,
        address_id,
        shipping,
        createdBy,
        user_id: userId
      },
      );

      return res.status(200).json({
        message: "New prescription has been added",
        result: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to add prescription",
      });
    }
  },
};

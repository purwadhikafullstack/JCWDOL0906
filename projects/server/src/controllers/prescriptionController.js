const db = require("../models");
const transaction = db.Transaction;

const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d-bbfd-4b2d-9b5d-ab8dfbbd4bed'

module.exports = {
  addPrescription: async (req, res) => {
    try {
      console.log(req.body.data);
      const data = JSON.parse(req.body.data);
      const { user_id, status, address_name, shipping } = data;
      const code = "INV/RSP#" + uuidv4();
      if (!req.file) {
        return res.status(400).json({
          message: "No image file provided",
        });
      }

      const image = req.file.path;

      const result = await transaction.create({
        user_id,
        transaction_code: code,
        status,
        address_name,
        shipping,
        image,
      });

      return res.status(200).json({
        message: "New prescription has been added",
        result: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to add your prescription",
      });
    }
  },
};

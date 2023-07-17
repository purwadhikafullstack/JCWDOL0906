const db = require("../models");
const transaction = db.Transaction;

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d-bbfd-4b2d-9b5d-ab8dfbbd4bed'

module.exports = {
  addPrescription: async (req, res) => {
    try {
      console.log(req.body);
      const data = (req.body);
      const { user_id, status, address_id, shipping } = data;
      const code = "INV/RSP/" + uuidv4();
      if (!req.file) {
        return res.status(400).json({
          message: "No image file provided",
        });
      }
      console.log(req.file);
      const prescription = req.file.path;
      console.log(prescription);
      const result = await transaction.create({
        user_id,
        transaction_code: code,
        prescription,
        status,
        address_id,
        shipping
      });

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

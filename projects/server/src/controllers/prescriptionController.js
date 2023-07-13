const db = require("../models");
const transaction = db.Transaction;

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

module.exports = {
  addPrescription: async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const { user_id, status, address_id, shipping } = data;
        const prescription = req.file.path;

      const result = await transaction.create({
        prescription,
        user_id,
        transaction_code: "INV/RSP/" + uuidv4(),
        status,
        address_id,
        shipping,
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

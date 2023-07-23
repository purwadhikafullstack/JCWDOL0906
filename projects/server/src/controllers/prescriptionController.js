const db = require("../models");
const transaction = db.Transaction;

const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d-bbfd-4b2d-9b5d-ab8dfbbd4bed'

module.exports = {
  addPrescription: async (req, res) => {
    try {
      const data = req.body;
      const { userId } = req;
      const { address_id, shipping } = data;
      const code = "INV-RSP-" + uuidv4().split("-")[0];
      const image = req.file.path;
      const result = await transaction.create({
        transaction_code: code,
        prescription: image,
        status: "Proses Resep",
        address_id,
        shipping,
        createdBy: userId,
        user_id: userId,
      });

      return res.status(200).json({
        message: "New prescription has been added",
        result: result,
      });
    } catch (err) {

      return res.status(500).json({
        message: "Failed to add your prescription",
      });
    }
  },
};

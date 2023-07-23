const axios = require("axios");

module.exports = {
  postOngkir: async (req, res) => {
    try {
      let { origin, destination, weight, courier } = req.body;
      let { key } = req.headers;
      let data = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        { origin, destination, weight, courier },
        {
          headers: {
            key: key,
          },
        }
      );
      res.status(200).send({
        isError: false,
        message: "Get Success!",
        data: data.data.rajaongkir,
      });
    } catch (error) {
      // 
      res.status(400).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  },
};

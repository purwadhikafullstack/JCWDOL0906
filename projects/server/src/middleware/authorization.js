const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

module.exports = {
  login: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token)
        throw {
          message: "Unauthorized",
        };
      token = token.split(" ")[1];

      // Extract user ID from the JWT token
      const verifiedUser = jwt.verify(token, "g-medsnial");
      console.log(verifiedUser);

      // Find the user in the database
      const userExist = await User.findOne({
        where: {
          id: verifiedUser.id,
        },
      });

      if (!userExist)
        throw {
          message: "User not found",
        };

      // Set the user ID in the request object for further use
      req.userId = userExist.id;

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};

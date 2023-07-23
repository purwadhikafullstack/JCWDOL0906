const { Op } = require("sequelize");
const db = require("../models");
const user = db.User;
const profile = db.Profile;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../helpers/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, phone_number, password, password_confirmation } =
        req.body;

      if (isNaN(phone_number)) {
        return res.status(400).send({ message: "Please input a number" });
      }
      if (phone_number.length < 8 || phone_number.length > 13) {
        return res
          .status(400)
          .send({ message: "Please input your valid phone number" });
      }
      if (password !== password_confirmation) {
        return res.status(400).send({ message: "Password does not match" });
      }
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .send({
            message:
              "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const generateVerticationToken = (username) => {
        let token = jwt.sign({ username }, "g-medsnial", {
          expiresIn: "30m",
        });
        return token;
      };

      const result = await user.create({
        username,
        email,
        phone_number,
        password: hashPass,
        role: 1,
      });

      let payload = { id: result.id };
      let token = jwt.sign(payload, "g-medsnial", {
        expiresIn: "9999 years",
      });

      await user.update(
        { verification_token: token },
        {
          where: {
            id: result.id,
          },
        }
      );
      const verificationLink = `http://localhost:3000/verification/${token}`;
      const tempEmail = fs.readFileSync(
        require.resolve("../templates/verification.html"),
        { encoding: "utf8" }
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({ username, verificationLink });

      await transporter.sendMail(
        {
          from: `G-Medsnials <gmedsnial@gmail.com}>`,
          to: email,
          subject: "Verification Account",
          html: tempResult,
        },
        (error, info) => {
          if (error) {
            throw new Error();
          } else {
          }
        }
      );
      res.status(200).send({
        status: true,
        data: result,
        message: "Register success",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const userExist = await user.findOne({
        where: {
          id: req.userId,
        },
      });
      await user.update({ is_verified: true }, { where: { id: req.userId } });
      res.status(200).send({
        status: true,
        message: "Your account is verified",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
      if (!emailOrUsername || !password) {
        return res.status(400).send({
          message: "please complete your data",
        });
      }
      const userExist = await user.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });
      if (!userExist) {
        return res.status(400).send({
          status: false,
          message: "User not found",
        });
      }
      const isvalid = await bcrypt.compare(password, userExist.password);
      if (!isvalid) {
        return res.status(400).send({
          status: false,
          message: "Wrong password",
        });
      }
      const payload = {
        id: userExist.id,
        username: userExist.username,
        role: userExist.role,
        is_verified: userExist.is_verified,
      };
      const token = jwt.sign(payload, "g-medsnial", { expiresIn: "24h" });
      // mengambil id dari bearer token
      const verifiedUser = jwt.verify(token, "g-medsnial", {
        expiresIn: "1h",
      });
      if (!verifiedUser.is_verified) {
        return res.status(400).send({
          message: "please verify your account",
        });
      } else {
        return res.status(200).send({
          status: true,
          message: "login success",
          data: userExist,
          token,
        });
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  confirm_email: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).send({
          message: "Please Input Your Email Address",
        });
      }
      if (!email.includes("@") || !email.endsWith(".com")) {
        return res.status(400).send({
          message: "Please enter a Valid Email Address",
        });
      }
      let result = await user.findOne({ where: { email } });
      let payload = { id: result.id };
      let token = jwt.sign(payload, "g-medsnial", {
        expiresIn: "1h",
      });
      await user.update(
        { reset_token: token },
        {
          where: {
            id: result.id,
          },
        }
      );
      const resetLink = `http://localhost:3000/reset-password/${token}`;
      const tempEmail = fs.readFileSync(
        require.resolve("../templates/reset.html"),
        { encoding: "utf8" }
      );
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({ resetLink });

      await transporter.sendMail({
        from: `G-Medsnials <gmedsnial@gmial.com}>`,
        to: email,
        subject: "Reset Password",
        html: tempResult,
      });
      res.status(200).send({
        message: " Please Check Your Email",
        result,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  reset_password: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword)
        return res.status(400).send({
          message: "Please Complate Your Data",
        });
      if (password !== confirmPassword) {
        return res.status(400).sedn({
          message: "Password does not match",
        });
      }
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          message:
            "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
        });
      }

      let token = req.headers.authorization;
      token = token.split(" ")[1];
      const data = jwt.verify(token, "g-medsnial");

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const userPassword = await user.update(
        { password: hashPass },
        { where: { id: data.id } }
      );
      res.send({
        message: "Reset Password Succes",
        data,
      });
    } catch (error) {
      res.status(400).send({
        message: "Server Error!",
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { password, newPassword, confirmPassword } = req.body;
      const userExist = await user.findOne({ where: { id: req.userId } });
      if (!userExist) {
        return res.status(404).send({ message: "User not found" });
      }

      const isValid = await bcrypt.compare(password, userExist.password);

      if (!isValid) {
        return res
          .status(400)
          .send({ message: "Your password does not match!" });
      }

      if (!newPassword || !confirmPassword) {
        return res
          .status(400)
          .send({
            message: "Please input your new password and confirm password",
          });
      }

      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .send({ message: "New password and confirm password do not match" });
      }

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

      if (!passwordRegex.test(newPassword, confirmPassword)) {
        return res
          .status(400)
          .send({
            message:
              "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(newPassword, salt);

      const userPassword = await user.update(
        { password: hashPass },
        { where: { id: req.userId } }
      );
      res.send({ message: "Change Password Success", data: userPassword });
    } catch (err) {
      res.status(400).send({ message: "Server Error!" });
    }
  },

  keep_login: async (req, res) => {
    try {
      const { userId } = req;
      const tokenUser = await db.User.findOne({ where: { id: userId } });
      const payload = {
        id: tokenUser.id,
        username: tokenUser.username,
        role: tokenUser.role,
        is_verified: tokenUser.is_verified,
      };
      const token = jwt.sign(payload, "g-medsnial", { expiresIn: "24h" });
      res.status(201).send({
        isError: false,
        message: "Token still valid",
        data: tokenUser,
        token,
      });
    } catch (error) {
      res
        .status(401)
        .send({ isError: true, message: error.message, data: null });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req;
      const profileData = await profile.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!profileData) {
        return res.status(400).send({
          message: "No UserId found",
        });
      }
      return res.status(200).json({
        message: "Successfully get profile data",
        result: profileData,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { userId } = req;
      const { full_name, gender, birthdate } = req.body;
      let fileUploaded = req.file;
      await profile.update(
        {
          full_name,
          gender,
          birthdate,
          picture: `/public/profile/${fileUploaded.filename}`,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
      const profileData = await profile.findOne({
        where: {
          user_id: userId,
        },
      });
      return res.status(200).json({
        message: "Changes Saved",
        result: profileData,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
      });
    }
  },
  settingEmail: async (req, res) => {
    try {
      const { userId } = req;
      const { email } = req.body;
      const checkEmail = await user.findOne({
        where: { email: email },
        raw: true,
      });
      if (checkEmail) throw "Email have been used";

      await user.update(
        { email: email, is_verified: 0 },
        { where: { id: userId } }
      );
      res.status(201).send({
        status: "Success",
        message: "Success change email",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  editProfilePic: async (req, res) => {
    try {
      const { userId } = req;
      let fileUploaded = req.file;

      await profile.update(
        {
          picture: `/public/profile/${fileUploaded.filename}`,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).send({
        status: "Success",
        message: "Succes upload user image",
      });
    } catch (err) {
      res.status(400).send(er);
    }
  },
};

// import sequelize
const Sequelize = require("sequelize");
// import model
const db = require("../models");
const user = db.User;
// import jwt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const express = require('express');
// const nodemailer = require("nodemailer");
const transporter = require("../helpers/transporter");

const fs = require("fs");
const handlebars = require("handlebars");
module.exports = {
  register: async (req, res) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        const {
          username,
          email,
          phone_number,
          password,
          password_confirmation,
        } = req.body;

        console.log(req.body);

        if (!username || !email || !phone_number || !password)
          throw "Please complete your data";

        if (isNaN(phone_number)) throw "Please input a number";

        if (phone_number.length < 8 || phone_number.length > 13)
          throw "Please input your valid phone number";

        if (password !== password_confirmation) throw "Password does not match";

        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
        if (!passwordRegex.test(password))
          throw "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number";

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const generateVerticationToken = (username) => {
          let token = jwt.sign({ username }, "g-medsnial", {
            expiresIn: "9999 years",
          });
          return token;
        };

        const result = await user.create(
          {
            username,
            email,
            phone_number,
            password: hashPass,
          },
          { t }
        );

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
          },
          { t }
        );

        const verificationLink = `http://localhost:3000/verification/${token}`;

        const tempEmail = fs.readFileSync(
          require.resolve("../templates/confirmation.html"),
          { encoding: "utf8" }
        );
        // console.log (tempEmail);
        const tempCompile = handlebars.compile(tempEmail);
        const tempResult = tempCompile({ username, verificationLink });

        await transporter.sendMail(
          {
            from: `G-Medsnial <gmedsnial@gmial.com}>`,
            to: email,
            subject: "Verify Your Account",
            html: tempResult,
          },
          (error, info) => {
            if (error) {
              throw new Error();
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        return result;
      });
      res.status(200).send({
        status: true,
        data: result,
        message: "register success",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};

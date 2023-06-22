// import sequelize
// const Sequelize  = require("sequelize");
const { Op } = require("sequelize");
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
            const { username, email, phone_number, password, password_confirmation } =
                req.body;

            console.log(req.body);

            if (!username || !email || !phone_number || !password) {
                return res.status(400).send({
                    message: 'Please complete your data'
                })
            };

            if (isNaN(phone_number)) {
                return res.status(400).send({
                    message: 'Please input a number'
                })
            };
            if (phone_number.length < 8 || phone_number.length > 13) {
                return res.status(400).send({
                    message: 'Please input your valid phone number'
                })
            };
            if (password !== password_confirmation) {
                return res.status(400).send({
                    message: 'Password does not match'
                })
            };
            const passwordRegex =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.()_+])[0-9a-zA-Z!@#$%.^&*()_+]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).send({
                    message: 'Password must contain at least 8 characters including an uppercase letter, a symbol, and a number'
                })
            };

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const generateVerticationToken = (username) => {
                let token = jwt.sign({ username }, "g-medsnial", {
                    expiresIn: "9999 years",
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
                },
            );


            const verificationLink = `http://localhost:3000/verification/${token}`;
            const tempEmail = fs.readFileSync(require.resolve("../templates/emailconfirmation.html"), { encoding: "utf8" });
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
                        //   console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                }
            );

            // if (userAlreadyExist) {
            //     if (userAlreadyExist.is_verified) {
            //         return res.status(400).send({
            //             message: 'Your Email is already veriefied, please login'
            //         });
            //     } else {
            //         return res.status(400).send({
            //             message: 'Your email address exists, but it is not verified. Please verify your email'
            //         });
            //     }
            // };

            res.status(200).send({
                status: true,
                data: result,
                message: "Register success",
            });

        } catch (err) {
            console.log(err.result);
            // res.status(400).send(err);
        }
    },
    login: async (req, res) => {
        try {
            const { emailOrUsername, password } = req.body;

            if (!emailOrUsername || !password) {
                return res.status(400).send({
                    message: "please complete your data"
                })
            };
            const userExist = await user.findOne({
                where: {
                    [Op.or]: [
                        { email: emailOrUsername },
                        { username: emailOrUsername },
                    ],
                },
            });
            if (!userExist) {
                return res.status(400).send({
                    status: false,
                    message: "User not found",
                })
            };
            const isvalid = await bcrypt.compare(password, userExist.password);
            if (!isvalid) {
                return res.status(400).send({
                    status: false,
                    message: "Wrong password",
                })
            };
            const payload = {
                id: userExist.id,
                role: userExist.role,
                is_verified: userExist.is_verified,
            };
            const token = jwt.sign(payload, "g-medsnial", { expiresIn: "999years" });
            // mengambil id dari bearer token
            const verifiedUser = jwt.verify(token, "g-medsnial");
            console.log(verifiedUser);
            // pengecekan verifikasi
            if (!verifiedUser.is_verified) {
                return res.status(400).send({
                    message: "please verify your account"
                })
            } else {
                return res.status(200).send({
                    status: true,
                    message: "login success",
                    data: userExist,
                    token,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    },
    verification: async (req, res) => {
        try {
            // const id = req.user.id;
            const userExist = await user.findOne({
                where: {
                    id: req.userId,
                },
            });

            await user.update(
                { is_verified: true },
                {
                    where: {
                        id: req.userId,
                    },
                }
            );
            res.status(200).send({
                status: true,
                message: "Your account is verified",
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

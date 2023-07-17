const express = require('express');
const router = require('express').Router()
const {c_prescription} = require('../controllers');
const { uploadFile } = require('../middleware/multer');
const { login } = require("../middleware/authorization.js");

router.post('/prescription', login, uploadFile, c_prescription.addPrescription);


module.exports = router;
const express = require('express');
const router = require('express').Router()
const {c_category} = require('../controllers');
const { uploadFile } = require("../middleware/multer");
// const { login } = require("../middleware/authorization.js");


router.get('/categories', c_category.getAllCategory);
router.patch('/categories/:id', uploadFile, c_category.updateCategory);
router.post('/categories/add', uploadFile, c_category.addCategory);
router.delete('/categories/delete/:id', c_category.deleteCategory);

module.exports = router;
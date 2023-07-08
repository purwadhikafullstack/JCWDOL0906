const express = require('express');
const router = require('express').Router()
const categoryController = require('../controllers/categoryController');
const { uploadFile } = require("../middleware/multer");


router.get('/', categoryController.getAllCategory);
router.patch('/:id', uploadFile, categoryController.updateCategory);
router.post('/', uploadFile, categoryController.addCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
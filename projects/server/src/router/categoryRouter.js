const express = require('express');
const router = require('express').Router()
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategory);
router.patch('/:id', categoryController.updateCategory);
router.post('/', categoryController.addCategory);
router.delete('/:id', categoryController.deleteCategory);
// router.patch('/:id/image', categoryController.updateCategoryImage);

module.exports = router;
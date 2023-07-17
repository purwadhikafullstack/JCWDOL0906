const express = require("express");

const router = require('express').Router()
const { c_stockHistory } = require("../controllers");

router.get("/stock-histories", c_stockHistory.fetchStockHistory);

module.exports = router;
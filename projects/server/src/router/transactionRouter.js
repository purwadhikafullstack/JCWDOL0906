const { c_transaction } = require('../controllers');

const router = require('express').Router();


router.get('/transaction', c_transaction.getUserTransactionStatus)
router.get('/transaction/:code/code', c_transaction.getUserTransactionByCode)
router.get('/transaction/:status/status', c_transaction.getUserTransactionByStatus)

module.exports = router
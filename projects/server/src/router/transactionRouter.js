const { c_transaction } = require('../controllers');
const { uploadFile } = require('../middleware/multer');

const router = require('express').Router();

router.get('/transaction/admin', c_transaction.getAdminTransaction)
router.get('/transaction', c_transaction.getUserTransactionStatus)
router.get('/transaction/:code/code', c_transaction.getUserTransactionByCode)
router.get('/transaction/:status/status', c_transaction.getUserTransactionByStatus)
router.post('/transaction/:code', uploadFile, c_transaction.uploadPayment);
router.delete('/transaction/:code', c_transaction.deleteUserTransaction);
router.patch('/transaction/:code/:action', c_transaction.confirmTransaction);

module.exports = router
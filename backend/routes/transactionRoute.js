const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, completeTransaction, approveTransaction } = require('../controller/transactionController');

router.route('/create').post(createTransaction);
router.route('/get').post(getTransactions);
router.route('/complete').post(completeTransaction);
router.route('/approve').post(approveTransaction);

module.exports = router;

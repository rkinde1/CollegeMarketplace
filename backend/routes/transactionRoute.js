const express = require('express');
const router = express.Router();
const { createTransaction, getBuyerTransactions, getSellerTransactions, completeTransaction, approveTransaction, deleteApproval, deleteTransaction } = require('../controller/transactionController');

router.route('/create').post(createTransaction);
router.route('/get/buyer').post(getBuyerTransactions);
router.route('/get/seller').post(getSellerTransactions);
router.route('/complete').post(completeTransaction);
router.route('/approve').post(approveTransaction);
router.route('/delete/approval').post(deleteApproval);
router.route('/delete/transaction').post(deleteTransaction);

module.exports = router;

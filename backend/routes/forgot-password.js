const express = require('express');
const router = express.Router();
const { sendPasswordResetEmail} = require('../controller/resetPasswordController');

router.route('/sendEmail').post(sendPasswordResetEmail);

module.exports = router;
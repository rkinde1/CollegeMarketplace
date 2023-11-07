const express = require('express');
const router = express.Router();
const { resetPassword } = require('../controller/resetPasswordController');

router.route('/reset-password/:id/:token').post(resetPassword);

module.exports = router;
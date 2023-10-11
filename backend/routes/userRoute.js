const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controller/userController');

router.route('/').post(register).get(login);
router.post("/verify-email", verifyEmail);

module.exports = router;
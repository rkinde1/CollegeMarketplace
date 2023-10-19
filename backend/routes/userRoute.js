const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controller/userController');

router.route('/').post(register);

module.exports = router;
const express = require('express');
const router = express.Router();
const {profile } = require('../controller/userController');

router.route('/profile').post(profile);

module.exports = router;
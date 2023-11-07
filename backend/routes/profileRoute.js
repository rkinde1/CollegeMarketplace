const express = require('express');
const router = express.Router();
const {profile, uploadBio, uploadIcon} = require('../controller/userController');

router.route('/profile').post(profile);
router.route('/uploadBio').post(uploadBio);
router.route('/uploadIcon').post(uploadIcon);

module.exports = router;
const express = require('express');
const router = express.Router();
const {profile, uploadBio, uploadIcon, viewSingleProfile} = require('../controller/userController');

router.route('/profile').post(profile);
router.route('/uploadBio').post(uploadBio);
router.route('/uploadIcon').post(uploadIcon);
router.route('/:email').post(viewSingleProfile);


module.exports = router;
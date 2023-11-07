const express = require('express');
const router = express.Router();
const { checkEmail, updatePassword, sendEmail, verify, resetOTP} = require('../controller/emailController');

router.get('/checkEmail', checkEmail);
router.put('/updatePassword', updatePassword);
router.post('/reset', resetOTP);
router.post('/send', sendEmail);
router.post('/verify', verify);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createComment, viewComment, deleteComment} = require('../controller/commentController');

router.route('/create/:userFor').post(createComment);
router.route('/view').post(viewComment);
// router.route('/delete').delete(deleteComment);

module.exports = router;
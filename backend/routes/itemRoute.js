const express = require('express');
const router = express.Router();
const { createItem, viewItem, deleteItem, editItem} = require('../controller/itemController');

router.route('/create').post(createItem);
router.route('/view').get(viewItem);
// router.route('/delete').delete(deleteItem);
// router.route('/edit').put(editItem);

module.exports = router;
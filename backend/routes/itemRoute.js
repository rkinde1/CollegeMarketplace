const express = require('express');
const router = express.Router();
const { createItem, viewItem, deleteItem, editItem, viewSingleItem} = require('../controller/itemController');

router.route('/create').post(createItem);
router.route('/view').get(viewItem);
router.route('/delete/:id').delete(deleteItem);
router.route('/:id').post(viewSingleItem);
// router.route('/edit').put(editItem);

module.exports = router;
const express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

router.get('/', listController.index);
router.get('/:id', listController.getUserLists);
// router.post('/:listId/add', listController.addToList);

module.exports = router;
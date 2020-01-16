const express = require('express');
const controller = require('../controllers/message');
const router = express.Router();

router.get('/', controller.getAll);

router.post('/', controller.send);

router.delete('/:id', controller.remove);

module.exports = router;

const express = require('express');
const controller = require('../controllers/mail');
const router = express.Router();

router.get('/', controller.fetch);

router.post('/', controller.create);

router.patch('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;

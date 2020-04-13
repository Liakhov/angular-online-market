const express = require('express');
const controller = require('../controllers/meta');
const router = express.Router();

router.get('/', controller.fetch);

module.exports = router;

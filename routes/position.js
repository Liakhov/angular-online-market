const express = require('express');
const router = express.Router();

const controller = require('../controllers/position');

// localhost:7000/api/position
router.get('/', controller.getAll);

// localhost:7000/api/position/getConfig
router.get('/config', controller.getConfig);

// localhost:7000/api/position/:id
router.get('/:id', controller.getById);

module.exports = router;

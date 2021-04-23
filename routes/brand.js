const express = require('express');
const router = express.Router();

const controller = require('../controllers/brand');

// localhost:7000/api/brands
router.get('/', controller.getAll);

// localhost:7000/api/brand/:id
router.get('/:id', controller.getById);

module.exports = router;

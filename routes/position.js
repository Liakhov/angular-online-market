const express = require('express');
const router = express.Router();

const controller = require('../controllers/position');

// localhost:7000/api/position
router.get('/', controller.getAll);

// localhost:7000/api/position/homeProductList
router.get('/homeProductList', controller.getHomeProductList);

// localhost:7000/api/position/:id
router.get('/:id', controller.getById);

module.exports = router;

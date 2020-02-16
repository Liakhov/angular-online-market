const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();

// localhost:7000/api/position
router.post('/', controller.create);

// localhost:7000/api/position
router.get('/', controller.getAll);

// localhost:7000/api/position/:id
router.get('/:id', controller.getById);

// localhost:7000/api/position/:id
router.patch('/:id', controller.update);

// localhost:7000/api/position/:id
router.delete('/:id', controller.remove);

// localhost:7000/api/position/allpositions/:id
router.get('/allpositions/:id', controller.getAllFromCategory);

module.exports = router;

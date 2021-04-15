const express = require('express');
const router = express.Router();

const controller = require('../controllers/position-admin');
const upload = require('../middleware/upload');

// localhost:7000/api/admin/position
router.get('/', controller.getAll);

// localhost:7000/api/admin/position
router.post('/', upload.array('image', 6), controller.create);

// localhost:7000/api/admin/position/:id
router.get('/:id', controller.getById);

// localhost:7000/api/admin/position/:id
router.patch('/:id', upload.array('image', 6), controller.update);

// localhost:7000/api/admin/admin/position/:id
router.delete('/:id', controller.remove);

// localhost:7000/api/admin/position/allpositions/:id
router.get('/allpositions/:id', controller.getAllFromCategory);

module.exports = router;

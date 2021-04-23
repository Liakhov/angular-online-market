const express = require('express');
const router = express.Router();

const controller = require('../controllers/brand-admin');
const upload = require('../middleware/upload');

// localhost:7000/api/admin/brand
router.get('/', controller.getAll);

// localhost:7000/api/admin/brand
router.post('/', upload.single('logo'), controller.create);

// localhost:7000/api/admin/brand/:id
router.get('/:id', controller.getById);

// localhost:7000/api/admin/brand/:id
router.patch('/:id', upload.single('logo'), controller.update);

// localhost:7000/api/admin/admin/brand/:id
router.delete('/:id', controller.remove);

module.exports = router;

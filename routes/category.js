const express = require('express');
const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', controller.getAll);

router.post('/', upload.single('image'), controller.create);

router.get('/:id', controller.getById);

router.patch('/:id', upload.single('image'), controller.update);

router.delete('/:id', controller.remove);

module.exports = router;

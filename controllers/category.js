const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');


module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.getAll = async function (req, res) {
    try {
        const category = await Category.find();
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.path : ''
        });

        await category.save();
        res.status(201).json({
            message: "Категория успешно добавлена"
        })

    } catch (e) {
        console.log(e);
    }
};

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name
    };

    if (req.body.description) {
        updated.description = req.body.description
    }

    if (req.file) {
        updated.image = req.file.path
    }

    if (req.body.image) {
        updated.image = req.body.image
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(category)

    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Категория успешно удалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};


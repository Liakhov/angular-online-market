const errorHandler = require('../utils/errorHandler');

const Position = require('../models/Position');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

module.exports.create = async function (req, res) {
    try {
        const images = [];
        for (const file of req.files) {
            images.push(file.path || '')
        }

        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            costOld: req.body.costOld,
            quantity: req.body.quantity,
            category: req.body.category,
            description: req.body.description,
            brand: req.body.brand,
            images: images
        }).save();
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const positions = await Position
            .find({...req.query})
            .populate('brand', 'name')
            .populate('category', 'name')
            .skip(+req.query.offset)
            .limit(+req.query.limit);
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getById = async function (req, res) {
    try {
        const position = await Position
            .findById(req.params.id);
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    const images = req.body.images ? req.body.images : [];

    for (const file of req.files) {
        images.push(file.path || '')
    }
    const updated = {
        active: req.body.active,
        recommend: req.body.recommend,
        name: req.body.name,
        cost: req.body.cost,
        costOld: req.body.costOld,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description,
        images: images,
        brand: req.body.brand
    };

    try {
        const product = await Position
            .findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            );
        res.status(200).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Position
            .remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция была удалена'
        });
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAdditionalInfo = async (req, res) => {
    try {
        const result = {};
        result.brands = await Brand
            .find({active: true});
        result.categories = await Category
            .find();
        res.status(200).json(result);
    } catch (err) {
        errorHandler(res, err);
    }
};

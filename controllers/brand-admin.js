const errorHandler = require('../utils/errorHandler');

const Brand = require('../models/Brand');

module.exports.create = async function (req, res) {
    try {
        const brand = await new Brand({
            name: req.body.name,
            description: req.body.description,
            logo: req.file ? req.file.path : '',
            active: req.body.active
        }).save();
        res.status(201).json(brand)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const brands = await Brand
            .find();
        res.status(200).json(brands)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getById = async function (req, res) {
    try {
        const brand = await Brand
            .findById(req.params.id);
        res.status(200).json(brand)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        description: req.body.description,
        active: req.body.active,
    };

    if (req.body.logo) {
        updated.logo = req.body.logo;
    }

    if (req.file) {
        updated.logo = req.file.path;
    }

    try {
        const brand = await Brand
            .findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            );
        res.status(200).json(brand)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Brand
            .remove({_id: req.params.id});
        res.status(200).json({
            message: 'Бренд был удален'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};

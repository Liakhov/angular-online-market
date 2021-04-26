const errorHandler = require('../utils/errorHandler');

const Brand = require('../models/Brand');

module.exports.getById = async function (req, res) {
    try {
        const brand = await Brand
            .findById(req.params.id);
        res.status(200).json(brand)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const brands = await Brand
            .find({active: true});
        res.status(200).json(brands)
    } catch (e) {
        errorHandler(res, e)
    }
};

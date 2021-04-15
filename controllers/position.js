const errorHandler = require('../utils/errorHandler');

const Position = require('../models/Position');

module.exports.getById = async function (req, res) {
    try {
        const position = await Position.findById(req.params.id);
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const positions = await Position
            .find({active: true})
            .skip(+req.query.offset)
            .limit(+req.query.limit);
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getAllFromCategory = async function (req, res) {
    try {
        const position = await Position.find({
            category: req.params.id
        });
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getHomeProductList = async function (req, res) {
    try {
        const recommended = await Position.find({recommend: true}).limit(4);
        const newItems = await Position.find().sort('-date').limit(10);
        res.status(200).json({
            recommended,
            newItems
        })
    } catch (e) {
        errorHandler(res, e)
    }
};

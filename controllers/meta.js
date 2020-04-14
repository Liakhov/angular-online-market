const Order = require('../models/Order');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.fetch = async function (req, res) {
    try {
        const newOrder = await Order.find({status: 'new'}, {_id: 1});
        const products = await Position.find({}, {name: 1});
        const meta = {
            newOrder,
            products
        };
        res.status(200).json(meta)
    } catch (e) {
        errorHandler(res, e)
    }
};

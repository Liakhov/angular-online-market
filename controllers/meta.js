const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.fetch = async function (req, res) {
    try {
        const newOrder = await Order.find({status: 'new'}, {status: 1});
        const meta = {
            newOrder
        };
        res.status(200).json(meta)
    } catch (e) {
        errorHandler(res, e)
    }
};

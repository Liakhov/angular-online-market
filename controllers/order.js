const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.getById = async function (req, res) {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    let orderIndex = await Order.findOne({}, {index: 1}).sort({date: -1});
    const maxIndex = orderIndex ? orderIndex.index : 0;

    try {
        const order = new Order({
            index: maxIndex + 1,
            status: 'new',
            name: req.body.name,
            tel: req.body.tel,
            email: req.body.email,
            comment: req.body.comment,
            list: req.body.list,
            address: req.body.address
        });

        await order.save();
        res.status(201).json({
            message: "Заказ успешно добавлен"
        })

    } catch (e) {
        console.log(e);
    }
};

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        tel: req.body.tel,
        email: req.body.email,
        status: req.body.status,
        list: req.body.list,
        address: req.body.address
    };
    try {
        await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true, useFindAndModify: false}
        );
        res.status(200).json({
            message: 'Заказ обновлен'
        })

    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Order.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Заказ успешно удален'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};


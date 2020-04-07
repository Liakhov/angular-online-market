const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const order = await Order.find();
        res.status(200).json(order)
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
    console.log(req.body);
    try {
        const order = new Order({
            name: req.body.name,
            tel: req.body.tel,
            email: req.body.email,
            comment: req.body.comment,
            list: req.body.list
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
    // const updated = {
    //     name: req.body.name
    // };
    //
    // if (req.body.description) {
    //     updated.description = req.body.description
    // }
    //
    // if (req.file) {
    //     updated.image = req.file.path
    // }
    //
    // if (req.body.image) {
    //     updated.image = req.body.image
    // }
    //
    // console.log(req.body);
    //
    // try {
    //     const category = await Category.findOneAndUpdate(
    //         {_id: req.params.id},
    //         {$set: updated},
    //         {new: true}
    //     );
    //     res.status(200).json(category)
    //
    // } catch (e) {
    //     errorHandler(res, e)
    // }
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


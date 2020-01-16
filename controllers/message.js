const Message = require('../models/Message');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const massages = await Message.find();
        res.status(200).send(massages)
    }catch (e) {
        errorHandler(res, e)
    }
}
module.exports.send = async function (req, res) {
    try{
        await new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }).save();
        res.status(201).json({
            message: "Спасибо за подписку!"
        })
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Message.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Сообщение успешно удалено'
        })
    }catch (e) {
        errorHandler(res, e)
    }
}

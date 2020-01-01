const Mail = require('../models/Mail');
const errorHandler = require('../utils/errorHandler');

module.exports.fetch = async function (req, res) {
    try{
        const mail = await Mail.find();
        res.status(200).json(mail)
    }catch (e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    try{
        await new Mail({
            email: req.body.email
        }).save();
        res.status(201).json({
            message: "Спасибо за подписку!"
        })
    }catch (e) {
        errorHandler(res, e)
    }
};
module.exports.remove = async function (req, res) {
    try{
        await Mail.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Email успешно удален'
        })
    }catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req, res) {
    const updated = {
        email: req.body.email
    }
    try{
        await Mail.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json('Изменения сохранены')
    }catch (e) {
        errorHandler(res, e)
    }
}

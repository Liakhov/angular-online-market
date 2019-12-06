const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');


module.exports.getById = async function (req, res) {
    try {
        const position = await Position.findById(req.params.id)
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.getAll = async function (req, res) {
    try{
        const position = await Position.find();
        res.status(200).json(position)
    }catch (e) {
        errorHandler(res, e)
    }
};
module.exports.create = async function (req, res) {
    try{
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            quantity: req.body.quantity,
            category: req.body.category,
            description: req.body.description
        }).save();
        res.status(201).json(position)

    }catch (e) {
        errorHandler(res, e)
    }
};
module.exports.remove = async function (req, res) {
    try{
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена'
        })

    }catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        cost: req.body.cost,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description
    }

    try{
        await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json('Изменения сохранены')

    }catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getAllFromCategory = async function (req, res) {
    try{
        const position = await Position.find({
            category: req.params.id
        });
        res.status(200).json(position)
    }catch (e) {
        errorHandler(res, e)
    }
};

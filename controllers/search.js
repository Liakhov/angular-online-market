const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');


module.exports.search = async function (req, res) {
    try {
        const {name} = req.query;
        const category = await Category.find({name: {$regex: name, $options: "i"}});
        const products = await Position.find({name: {$regex: name, $options: "i"}});
        const cat = formatToSearch(category, 'category');
        const prod = formatToSearch(products, 'product');
        const result = [...cat, ...prod].slice(0, 5);
        res.status(200).json(result)
    } catch (e) {
        errorHandler(res, e)
    }
};

function formatToSearch(arr, type) {
    const res = [];
    arr.forEach(item => {
        res.push({
            name: item.name,
            id: item._id,
            type
        });
    });
    return res;
}

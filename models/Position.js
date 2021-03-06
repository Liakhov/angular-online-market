const mongose = require('mongoose');
const Schema = mongose.Schema;

const positionSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    recommend: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    costOld: {
        type: Number
    },
    category: {
        ref: 'category',
        type: Schema.Types.ObjectID
    },
    quantity: {
        type: Number
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    brand: {
        ref: 'brand',
        type: Schema.Types.ObjectId
    }
});


module.exports = mongose.model('position', positionSchema);

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
    category: {
        ref: 'category',
        type: Schema.Types.ObjectID
    },
    categoryName: {
        type: String
    },
    quantity: {
        type: Number
    },
    description: {
        type: String
    },
    images: {
        type: Array
    }
});


module.exports = mongose.model('position', positionSchema);

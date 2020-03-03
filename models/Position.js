const mongose = require('mongoose');
const Schema = mongose.Schema;

const positionSchema = new Schema({
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

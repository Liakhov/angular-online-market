const mongose = require('mongoose');
const Schema = mongose.Schema;

const orderSchema = new Schema({
    index: {
      type: Number
    },
    status: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    list: {
        type: Array
    },
    address: {
        type: String
    },
    delivery: {
        type: String,
        default: 'picks-up'
    },
    payment: {
        type: String,
        default: 'cash'
    }
});
module.exports = mongose.model('order', orderSchema);

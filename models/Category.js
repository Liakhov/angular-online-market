const mongose = require('mongoose');
const Schema = mongose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongose.model('category', categorySchema);

const mongose = require('mongoose');
const Schema = mongose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
});


module.exports = mongose.model('brand', positionSchema);

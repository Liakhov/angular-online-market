const mongose = require('mongoose');
const Schema = mongose.Schema;

const mailSchema = new Schema({
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongose.model('mail', mailSchema);

const mongose = require('mongoose');
const Schema = mongose.Schema;

const messageSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    message: {
        type: String
    }
});

module.exports = mongose.model('message', messageSchema);

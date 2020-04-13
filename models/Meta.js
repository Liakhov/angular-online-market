const mongose = require('mongoose');
const Schema = mongose.Schema;

const metaSchema = new Schema({
    newOrders: {
        type: String
    },
});


module.exports = mongose.model('meta', metaSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    msgText: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        ref: 'Contact'
    }
})

module.exports = mongoose.model('Message', messageSchema);
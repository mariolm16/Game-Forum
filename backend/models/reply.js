const mongoose = require('mongoose')

const replySchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    reply: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }
})

const Reply = mongoose.model('Reply', replySchema)

module.exports = Reply;
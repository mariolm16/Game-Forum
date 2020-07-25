const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
        email: {
        type:String,
        required: true
        },
        image: {
        type: String
        },
        username: {
        type: String,
        unique: true,
        required: true
        },
        password: {
        type: String,
        required: true,
        minlength: 3,
        },
        created: {
        type:Date,
        default: Date.now()
        },
        bio: String,
        posts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
        }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
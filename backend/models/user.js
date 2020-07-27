const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
        },
        email: {
        type:String,
        unique: [true, 'This email is already in use. Please log in or use another email'],
        required: true,
        lowercase: true,
        },
        image: {
        type: String,
        default: 'https://i.pinimg.com/236x/ba/e9/bb/bae9bbde8dcefca422aa14d9e16e11bb.jpg',
        },
        username: {
        type: String,
        unique: [true, 'This username has alrady been chosen, please select another'],
        required: true
        },
        password: {
        type: String,
        required: true,
        minlength: [3, 'Hi, please use a longer password...']
        },
        created: {
        type:Date,
        default: Date.now()
        },
        bio: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
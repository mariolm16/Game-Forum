const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: {
    type: String,
    required: true
    }
})
    
    const postSchema = mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    created: {
    type:Date,
    default: Date.now()
    },
    image: {
    type: String,
    default: "https://i.pinimg.com/originals/f7/81/5d/f7815d95f5693498bd3938773605446f.png",
    },
    body: {
    type: String,
    required: true
    },
    comments: [commentSchema]
    });

    const Post = mongoose.model('Post', postSchema);

    module.exports = Post;
const Post = require('../models').Post;
const User = require('../models').User;
const Comment = require('../models').Comment

const createComment = (req, res) => {
    Post.findByIdAndUpdate(req.body._post, (err, foundPost) => {
        if(err){
            return console.log("error here")
        }
        Comment.create(req.body, (err, createdComment) => {
            if(err){
                console.log(err)
                return res.status(500).json(err);
            }
            foundPost.comments.push(createdComment);
    
            foundPost.save((err, savedPost) => {
                if (err){
                return console.log("error at save post")
                }
        res.status(200).json(savedPost);
            }) 
        })
    })
}

module.exports = {
    createComment
}
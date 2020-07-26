const Post = require('../models').Post;
const User = require('../models').User;
const Comment = require('../models').Comment

const createComment = (req, res) => {
    Post.findById(req.body._post, (err, foundPost) => {
        if(err){
            console.log('something is happening...')
            return res.status(500).json(err);
        }
        Comment.create(req.body, (err, createdComment) => {
            if(err){
                console.log('something is happening...')
                return res.status(500).json(err);
            }
            foundPost._comments.push(createdComment);

            foundPost.save((err, savedPost) => {
                if(err){
                    console.log('something is happening...')
                    return res.status(500).json(err);
                }
        res.status(200).json(savedPost);
            }) 
        })
    })
}

const allComments = (req, res) => {
    Comment.find({}, (err, foundComments) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundComments);
    })
}

const deleteComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(deletedComment)
    })
}



module.exports = {
    createComment,
    allComments,
    deleteComment
}
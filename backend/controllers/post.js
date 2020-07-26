const Post = require('../models').Post;
const User = require('../models').User;

const createPost = (req, res)=> {
    User.findById(req.params.id)
    Post.create(req.body, (err, createdPost) => {
        if(err){
            console.log(err)
            return res.status(500).json(err);
        }
        console.log(createdPost);
        res.status(200).json(createdPost);
    })
}

// const createPost = (req, res) => {
//     User.findById(req.body.userId, (foundUser) => {
//         Post.create(req.body, (createdPost) => {
//             foundUser.posts.push(createdPost);

//             foundUser.save((savedUser) => {
//                 console.log(savedUser, createdPost)
//                 res.status(200).json(createdPost)
//             })
//         })
//     })
// }

const showPost = (req, res) => {
    Post.findById(req.params.id)
        .populate('_comments')
        .exec((err, foundPost) => {
        if(err){
            return res.status(500).json(err);
        }
        console.log(foundPost)
        res.status(200).json(foundPost)
    })
}

const allPosts = (req, res) => {
    Post.find({}) 
    .populate('_creator', 'username')
    .exec((err, foundPosts) => {
        
        if(err){
            return res.status(500).json(err);
        }
        console.log(foundPosts);
        res.status(200).json(foundPosts);
    })
}

const deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        if(err){
            return res.status(500).json(err);
        }
        console.log(deletedPost);
        res.status(200).json(deletedPost)
    })
}

const editPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost)=> {
        if(err){
            return res.status(500).json(err);
        }
        console.log(updatedPost);
        res.status(200).json(updatedPost);
    })
}

const addComment = (req, res) => {
    
}

module.exports = {
    createPost,
    showPost,
    allPosts,
    deletePost,
    editPost
}
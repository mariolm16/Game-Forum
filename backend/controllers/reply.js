const Reply = require('../models').Reply
const Comment = require('../models').Comment

//Create a comment
const createReply = (req, res) => {
    Comment.findById(req.params.comment, (err, foundComment) => {
        if (err) {
            return res.status(500).json(err);
        }
        req.body.reply = req.body.body
        req.body.username = req.user.username
        Reply.create(req.body, (err, newReply) => {
            if (err) {
                return res.status(500).json(err);
            }
            foundComment.reply.push(newReply)
            foundComment.save((err, savedPost) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(savedPost)
            })
        })
    })
}

//Delete a comment
const deleteReply = (req, res) => {

    Reply.findById(req.params.id).then((foundReply) => {
        const user = req.user.username;
        const creator = foundReply.username.toString();
        if (user === creator) {
            Reply.findByIdAndRemove(req.params.id, (err, deletedReply) => {
                if (err) {
                    return res.status(500).json(err);
                } else res.status(200).json(deletedReply);
            });
        } else {
            return res.status(401).json("Unauthorized access");
        }
    })
}

//Get reply by ID
const getReply = (req, res) => {
    Reply.findById(req.params.id)
        .exec((err, foundReplies) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(foundReplies)
        })
}

module.exports = {
    createReply,
    getReply,
    deleteReply
}
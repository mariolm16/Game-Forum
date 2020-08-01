const Reply = require('../models').Reply
const Comment = require('../models').Comment



const createReply = (req, res) => {
    console.log('USER INFO', req.user)
    console.log('URL INFO', req.params.comment)
    Comment.findById(req.params.comment, (err, foundComment) => {
        if (err) {
            console.log(foundComment)
            return res.status(500).json(err);
        }
        req.body.username = req.user.username
        Reply.create(req.body, (err, newReply) => {
            if (err) {

                return res.status(500).json(err);
            }
            console.log('FOUND COMMENT', foundComment)
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

module.exports = {
    createReply
}
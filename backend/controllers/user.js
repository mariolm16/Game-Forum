const User = require('../models').User;

const createUser = (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err){
            console.log('something is happening...')
            return res.status(500).json(err);
        }
        console.log(createdUser)
        res.status(200).json(createdUser)
    });
}
    const showUser = (req, res) => {
        User.findById(req.params.id, (err, foundUser) => {
            if(err){
                return res.status(500).json(err);
            }
            console.log(foundUser)
            res.status(200).json(foundUser)
        })
    }

    const allUsers = (req, res) => {
        User.find({}, (err, foundUsers) => {
            if(err){
                return res.status(500).json(err);
            }
            console.log(foundUsers);
            res.status(200).json(foundUsers);
        })
    }

    const deleteUser = (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
            if(err){
                return res.status(500).json(err);
            }
            console.log(deletedUser);
            res.status(200).json(deletedUser)
        })
    }

    const editUser = (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=> {
            if(err){
                return res.status(500).json(err);
            }
            console.log(updatedUser);
            res.status(200).json(updatedUser);
        })
    }



module.exports = {
    createUser,
    showUser,
    allUsers,
    deleteUser,
    editUser
}
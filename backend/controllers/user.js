const User = require('../models').User;
const Post = require('../models').Post;

// const createUser = (req, res) => {
//     User.create(req.body, (err, createdUser) => {
//         if(err){
//             console.log('something is happening...')
//             return res.status(500).json(err);
//         }
//         console.log(createdUser)
//         res.status(200).json(createdUser)
//     });
// }

const showUser = (req, res) => {
    
    User.findById(req.user.id)
        .populate('posts')
        .exec((err, foundUser) => {
             if(err){
              console.log('something is happening...')
              return res.status(500).json(err);
          }
         console.log(foundUser)
         res.status(200).json(foundUser);
            })
        }
    // const showUser = (req, res) => {
    //     User.findById(req.params.id, (err, foundUser) => {
    //         if(err){
    //             return res.status(500).json(err);
    //         }
    //         console.log(foundUser)
    //         res.status(200).json(foundUser)
    //     })
    // }

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
        console.log(req.user.username, req.user.id)
        User.findByIdAndRemove(req.user.id, (err, deletedUser) => {
            if(err){
                return res.status(500).json(err);
            }
            console.log(deletedUser);
            res.status(200).json(deletedUser)
        })
    }

    const editUser = (req, res) => {
        User.findByIdAndUpdate(req.user.id, req.body, {new:true}, (err, updatedUser)=> {
            if(err){
                return res.status(500).json(err);
            }
            console.log(updatedUser);
            res.status(200).json(updatedUser);
        })
    }



module.exports = {
   
    showUser,
    allUsers,
    deleteUser,
    editUser
}
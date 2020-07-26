const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/backend';

mongoose.connect(connectionString, {useNewUrlParser: true,
                                useUnifiedTopology: true,
                                    useCreateIndex: true,
                                    useFindAndModify: false    
});


mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected on ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose error:', err);
});


const User = require('./user');
exports.User = User;

const Post = require('./post');
exports.Post = Post;

const Comment = require('./comment');
exports.Comment= Comment;
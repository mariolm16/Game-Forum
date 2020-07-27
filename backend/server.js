

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

require('dotenv').config();


const app = express();
const routes = require('./routes');


app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        token = token.substring(constants.BEARER_START_INDEX) //remove string Bearer from the token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
        }
        req.user = decodedUser;

        next();
    })
}

app.use('/auth', routes.auth);

app.use('/user', routes.user),
app.use('/post', routes.post),
app.use('/comment', routes.comment)

app.use('/user', verifyToken, routes.user);
app.use('/post', verifyToken, routes.post);

app.listen(4000, () => {
    console.log(`Hello Mario,I am listening on port ${process.env.PORT}`)
});
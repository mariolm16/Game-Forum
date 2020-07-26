const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const routes = require('./routes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi Mario!');
})

app.use('/user', routes.user),
app.use('/post', routes.post),
app.use('/comment', routes.comment)

app.listen(4000, () => {
    console.log('Hello Mario :)...')
});
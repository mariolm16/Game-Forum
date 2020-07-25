const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const routes = require('./routes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi Mario!');
})

app.use('/user', routes.user),

app.listen(4000, () => {
    console.log('Hello Mario :)...')
});
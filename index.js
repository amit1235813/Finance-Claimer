const mongoose = require('mongoose');
const { User } = require('./models/users');

const express = require('express');
const app =  express();
const port = 3000;
//Example to connect to MongoDB, create a Schema and Model, create an row
//available onMongoDB website homepage
//https://mongoosejs.com/
mongoose.connect('mongodb://localhost:27017/finance-claimer')
//Returns a Promise which is handled using then and catch
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => {
        console.log('Could not connect to MongoDB...', error);
    });


app.listen(port, function() {
    console.log(`Express listening on port ${port}`);
});

//Hello World example available on
//http://expressjs.com/en/starter/hello-world.html
/*
app.get('/', (req, res) => {
    res.send('Hello World');
});
*/

app.post('/api/users', (req, res) => {
    //
});

//console.log(User);
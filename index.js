const mongoose = require('mongoose');

const express = require('express');
const app =  express();
//There is no port object for Node. But Heroku uses it to set a Port
//https://nodejs.org/api/process.html#process_process_env
const port = process.env.PORT || 3000;

const helmet = require('helmet');
const compression = require('compression');
//const cors = require('cors');

const users = require('./routes/users');
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

//app.use('/', cors());
//https://helmetjs.github.io/
app.use('/', helmet());

//https://www.npmjs.com/package/compression
app.use('/', compression());

//Node is now running the server on a port and serving the index html at the same port
//No need of CORS
//https://expressjs.com/en/starter/static-files.html
app.use('/', express.static('frontend'))

//Built in moddlweware. Converts incoming request strings into JSON object.
//For all paths.
app.use('/', express.json());
//To use a middleware function at a specific path
//All Epxress API path start with a slash
app.use('/api/users', users);



//Hello World example available on
//http://expressjs.com/en/starter/hello-world.html

/*
app.get('/', (req, res) => {
    res.send('Hello World');
});
*/

//console.log(User);
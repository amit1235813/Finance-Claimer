const winston = require('winston');

module.exports = function(error, req, res, next) {
    //winston.log('error', error.message, error);
    //error, warn, info, verbose, debug, silly
    //res.status(500).send('Something failed.');
    console.log('Something failed');
}


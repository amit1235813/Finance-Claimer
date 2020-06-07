const jwt = require('jsonwebtoken');
const config = require('config');

function authorize(req, res, next) {
    // const token = req.header('x-auth-token');
    const token = req.cookies.jwt;
    console.log('Express - Token received by autho middleware :', token);
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
    
}

module.exports = authorize;



const jwt = require('jsonwebtoken');
const secret = "yourSecretKey";

//Middleware to authorize routes using JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try{
        const verified =  jwt.verify(token.split(' ')[1], secret);          
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
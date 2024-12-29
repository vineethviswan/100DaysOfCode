/*------------------------------------------------------------------------
    Day 17 - Basic Authentication
             Implement basic username/password authentication
-------------------------------------------------------------------------*/

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function authentication(req, res, next) {
    const authHeader = (req.headers.authorization);
    console.log(req.headers);

    if(!authHeader) {
        let err = new Error('User not authorized!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === 'admin' && pass === 'password') {
        next();
    } else {
        let err = new Error('User not authorized. Incorrect Username or password!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}

app.use(authentication);
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.status(200);
//     res.send('Authentication with Node.js!');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



const express = require('express');
const session = require('express-session');
const app = express();

app.use(
    session(
        {
            store: new session.MemoryStore(),
            secret: 'hello world',
            resave: true, 
            saveUninitialized: true
        }
    ));

app.use('/', (req, res, next) => {

    if(!req.session.user){

        console.log('Session not setup yet!');
        const authHeader = (req.headers.authorization);
        if(!authHeader){
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status = 401;
        } else {

            const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
            const user = auth[0];
            const pass = auth[1];

            if (user === 'admin' && pass === 'password') {
                req.session.user = 'admin';
                req.session.views = 1;
                res.status(200).json({ message: 'User authenticated for first time!' });
            } else {
                let err = new Error('User not authorized. Incorrect Username or password!');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                return next(err);
            }
        }
    } else if (req.session.user === 'admin') {
        req.session.views++;
        let message = `Existing User. Number of views: ${req.session.views}`;
        res.status(200).json({ message: message });
    }
});

// app.get('/', (req, res) => {
//     res.status(200);
//     res.send('Authentication with Sessions!');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
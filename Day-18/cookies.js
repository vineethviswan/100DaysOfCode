/*------------------------------------------------------------------------
    Day 18 - Sessions and Cookies
             Use sessions and cookies for user authentication
-------------------------------------------------------------------------*/

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

function authentication(req, res, next) {

    const cookies = req.signedCookies.user;
    if (!cookies) {

        const authHeader = (req.headers.authorization);
        if (!authHeader) {
            
            let err = new Error('User not authorized!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err)

        } else {
            
            const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
            const user = auth[0];
            const pass = auth[1];

            if (user === 'admin' && pass === 'password') {
                res.cookie('user', 'admin', { signed: true });
                res.status(200).json({ message: 'User authenticated for first time!' });
            } else {
                let err = new Error('User not authorized. Incorrect Username or password!');
                res.setHeader('WWW-Authenticate', 'Basic');
                err.status = 401;
                return next(err);
            }
        }
    } else {
        if (req.signedCookies.user === 'admin') {
            res.status(200).json({ message: 'Existing User authenticated!' });
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status = 401;
            return next(new Error('Cookies not valid!'));            
        }
    }
}

// app.get('/', (req, res) => {
//     res.status(200);
//     res.send('Authentication with Cookies!');
// });

app.use(cookieParser('12345'));
app.use(authentication);

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});
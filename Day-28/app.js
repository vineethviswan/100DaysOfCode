
/*------------------------------------------------------------------------
    Day 28 - JWT Authorization Middleware
             Implement middleware to authorize routes using JWT
-------------------------------------------------------------------------*/

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const {registerUser, loginUser} = require('./userController');
const {verifyToken} = require('./authMiddleware');

app.post('/register', registerUser);
app.post('/login', loginUser);

//Protected route
app.get('/dashboard', verifyToken, (req, res) => {    
    res.json({ message: `Welcome to the dashboard, ${req.body.user}!` });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

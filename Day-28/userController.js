
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = "yourSecretKey";

let users = []; // Store users in memory

//Register a new user
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
        username,
        password: hashedPassword
    });

    res.status(201).send('User registered successfully');
};

//Login a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username);
    if (!user) 
        return res.status(400).send('User not found');

    //Compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) 
        return res.status(400).send('Invalid password');

    //Create a JWT token
    const token = jwt.sign({ username }, secretkey, { expiresIn: '1h' });

    res.status(200).send(token);

};

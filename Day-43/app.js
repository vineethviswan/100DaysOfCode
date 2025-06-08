
/*------------------------------------------------------------------------
    Day 43: Authentication with JWT and Cookies
            Implement JWT authentication with secure cookies
-------------------------------------------------------------------------*/

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// User data (in-memory for simplicity)
const users = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

// Register route

app.post('/api/register', async (req, res) => {
    try{
        const { username, password } = req.body;

        // Check if user already exists
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        users.push({id: users.length + 1, username, password: hashedPassword});
        res.status(201).json({ message: 'User registered successfully.' });
    } catch(error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error Creating User!' });
    }
});

// Login route

app.post('/api/login', async (req, res) => {

    try {
        const { username, password } = req.body;

        //Find user
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password!' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token in secure cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in!' });
    }
});

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

// Logout route
app.post('/api/logout', (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Clear the cookie
    });
    res.json({ message: 'Logged out successfully.' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
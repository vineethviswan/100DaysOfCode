/*------------------------------------------------------------------------
    Day 36: Express Rate Limiting
            Implement rate limiting for your API
-------------------------------------------------------------------------*/

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

// Rate limiting middleware
const appLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per windowMs
    message: {
     status : 429,
     error:'Too many requests from this IP, please try again later.'
    }        
});

// Apply the rate limiting middleware to all requests
app.use('/api', appLimiter);

app.get('/api/example', (req, res) => {
    res.status(200).send('This is a rate-limited API endpoint!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});   
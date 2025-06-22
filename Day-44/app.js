/*------------------------------------------------------------------------
    Day 44: Caching in Nodejs
            Implement caching strategies for better performance
-------------------------------------------------------------------------*/

const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const port = 3000;

const cache = new NodeCache({ stdTTL: 60}); // Cache items for 60 seconds

// Middleware to check cache
function cacheMiddleware(req, res, next) {
    //console.log('Checking cache for:', req.originalUrl);
    const key = req.oringinalUrl || req.url;
    const cachedData = cache.get(key);
    if (cachedData) {
        console.log('Cache hit for:', key);
        return res.json(cachedData);
    }
    res.sendResponse = res.json;
    res,json = (body) => {
        console.log('Cache miss for:', key);
        cache.set(key, body);
        res.sendResponse(body);
    }
    next();
} 

// Sample route
app.get('/api/data', cacheMiddleware, (req, res) => {
    // Simulate a database call
    const data = { value: Math.random(), time: new Date() };
    setTimeout(() => res.json(data), 2000);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
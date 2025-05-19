/*------------------------------------------------------------------------
    Day 39: Pagination in API
            Implement pagination in a RESTful API
-------------------------------------------------------------------------*/

const express = require('express');
const port = 3000;
const app = express();

// Sample data for demonstration
const items = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

// Pagination endpoint
app.get('/api/items', (req, res) => {

    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)

    // Calculate the start and end indices for slicing the items array
    const startIndex = (page -1 ) * limit;
    const endIndex = startIndex + limit;

    // Slice the items array to get the current page items
    const result = items.slice(startIndex, endIndex);

    res.json({
        page: page,
        limit: limit,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / limit),
        data: result
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
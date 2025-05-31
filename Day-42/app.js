/*------------------------------------------------------------------------
    Day 42 - Express Global Error Handling
             Set up global error handling in an Express app
-------------------------------------------------------------------------*/

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Custom error class
class AppError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Operational errors are expected and handled
        Error.captureStackTrace(this, this.constructor);
    }
}

// Example route that throws an error
app.get('/api/test-error', (req, res, next) => {
    throw new AppError(400, 'This is a test error');
});

// Route not found handler
app.all('/{*any}', (req, res, next) =>{
    next(new AppError(404, `Can't find ${req.originalUrl} on this server`));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Development error response
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack
        });
    // Production error response
    } else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or other unknown error: don't leak error details
            console.error('ERROR!', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            });
        }
    }
    next(); // Add this line    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
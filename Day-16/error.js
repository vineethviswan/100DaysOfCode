
/*--------------------------------------------------------------------------------------
    Day 16 - Implement middleware for handling errors in an Express app         
----------------------------------------------------------------------------------------*/

const express = require('express');
const app = express();

//Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!!');
};

app.use(errorHandler);

app.get('/', (req, res) => {    
   throw new Error('Here is an error!!!!');
});

app.listen(3000, (req, res) => {
    console.log('Server Running at port 3000!');
});


/*------------------------------------------------------------------------
    Day 29 - REST API Documentation
             Generate API documentation using tools like Swagger
-------------------------------------------------------------------------*/

const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const routes = require('./router');

const app = express();
const port = 3000;

// Swagger Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Swagger API Documentation');
});

app.listen(port, () => {    
    console.log(`Server running on port ${port}`);
}); 
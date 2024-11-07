/*-------------------------------------------------------------------------------
Day 12 - Query Parameters
         Handle query parameters in an Express app
--------------------------------------------------------------------------------*/


const express = require('express');
const app = express();

const port = 8080;

const myLogger =  function(req, res, next){
    console.log('Request received.');
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.get('/search', function(req, res){
    let requestTime = new Date(req.requestTime);
    let responseText = `GET Request received at : ${requestTime.toUTCString()}`;

    const queryTerm = req.query.query;
    const category = req.query.category;

    responseText += `\r\n`;
    responseText += `Query Term : ${queryTerm} and Category : ${category}`;

    res.send(responseText);
});

app.listen(port, function(req, res){
    console.log('Server Running on port : ' + port);
})
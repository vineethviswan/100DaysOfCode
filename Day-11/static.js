
/*------------------------------------------------------
Day 11 - Static Files with Express
         Serve static files using Express middleware
--------------------------------------------------------*/


const express = require('express');
const app = express();
const path = require('node:path');
const bodyParser = require('body-parser');

const port = 8080;

const myLogger = function(req, res, next){
    console.log('Request Received.');
    req.requestTime = Date.now();
    next();
}

app.use(myLogger);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({extended:true}));

app.post('/', function(req, res){
    let requestTime = new Date(req.requestTime);
    let responseText = `POST Request at : ${requestTime.toUTCString()}`;
    console.log(req.body);
    res.send(responseText);    
}); 


app.listen(port, function(req, res){
    console.log(`Server Running on port : ${port}` );
});
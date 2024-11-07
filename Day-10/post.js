
/*-------------------------------------------------------------------
Day 10 - Handling POST Requests
Parse and handle POST requests in an Express app
-------------------------------------------------------------------*/


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const myLogger = function(req, res, next){
    console.log('Requested..');
    req.requestTime = Date.now();
    next();
}

app.use(myLogger);

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended:true}));

app.post('/', function(req, res){
    let requestTime = new Date(req.requestTime);
    let responseText = `POST Request at : ${requestTime.toUTCString()}`;
    console.log(req.body);
    res.send(responseText);    
}); 

app.get('/', function(req, res){
    let requestTime = new Date(req.requestTime);
    let responseText = `GET Request at : ${requestTime.toUTCString()}`;
    res.send(responseText);
})

app.listen(port, function(req, res) {
    console.log(`Server is running on ${port}`);
})
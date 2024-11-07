
/*---------------------------------------------------------------
Day 9 - Middleware in Express
Use middleware functions in Express
---------------------------------------------------------------*/

const express = require('express');
const app = express();

const myLogger = function(req, res, next){
    console.log('Logged..!!');
    next();
}

const requestTime = function(req, res, next){
    req.requestTime = Date.now();
    next();
}

app.use(requestTime);
app.use(myLogger);

app.get('/', function(req, res){
    let responseText = 'Hello World! <br>';
    var requestTime = new Date(req.requestTime);    
    responseText += `<small> Requested at : ${requestTime.toUTCString()}</small>`;
    res.send(responseText);
});

app.listen(8080, () => {
    console.log('Server Running on port : 8080');
});
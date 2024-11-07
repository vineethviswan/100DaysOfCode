
/*-------------------------------------------------------------
Day 13 - RESTful API Design
         Design a simple RESTful API using Express
---------------------------------------------------------------*/

const express = require('express');
const app = express();

const port = 8080;

const routes = require('./router');

app.use('/api', routes);

app.get('/', (req, res) => {
    //console.log(req.body);
    res.send('For REST Api..');
});

app.listen(port, () => {
    console.log('Server Running in port ' + port);
});
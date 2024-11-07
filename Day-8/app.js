
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to Express!');
});

app.listen(port, () => {
    console.log('Server Running on port : ' + port);
});
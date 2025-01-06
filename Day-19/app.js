/*------------------------------------------------------------------------
    Day 19 - File Uploads
             Handle file uploads in an Express app
-------------------------------------------------------------------------*/

const express = require('express');
const path = require('path');
const app = express();

var uploadRouter = require('./routers/upload');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('file_upload', { title: 'Express' });
});

app.use ('/', (req, res, next) => {
    console.log('Middleware for all routes!');
    next();
});

app.use(express.urlencoded({ extended: false }));

app.use('/upload', uploadRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {

    const data = SomethingThatThrowsError();
    if(!data) {
        return next(new Error('Error Retrieving data!!'));
    }
    res.send(200).json({
        message: 'Data Retrieved Successfully!', data
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.send(500).json({
        message: 'Something went Wrong!'
    });
});

app.listen(3000, (req, res) => {
    console.log('App is listening on port 3000');
});
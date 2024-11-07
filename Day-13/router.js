
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json({extended:true}));

router.get('/users', (req, res) => {
    res.send('List of Users..');
});

//GET -- Search
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    let responseText = `Details of User ${userId}`;
    //console.log(req.body);
    //responseText += req.body;
    res.send(responseText);
});

//POST -- Create New
router.post('/users', (req, res) => {
    res.send('Create New User');
    //console.log(req.body);
});

//PUT -- Update
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update User ${userId}`);
});

//DELETE -- Delete
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Deleting User ${userId}`);
});

module.exports = router;
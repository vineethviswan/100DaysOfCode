
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json({extended:true}));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', (req, res) => {
    res.send('List of Users..');
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 */
//GET -- Search
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    let responseText = `Details of User ${userId}`;
    //console.log(req.body);
    //responseText += req.body;
    res.send(responseText);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created
 */
//POST -- Create New
router.post('/users', (req, res) => {
    res.send('Create New User');
    //console.log(req.body);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User updated
 */
//PUT -- Update
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update User ${userId}`);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 */
//DELETE -- Delete
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Deleting User ${userId}`);
});

module.exports = router;
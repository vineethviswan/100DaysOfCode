
/*----------------------------------------------------------------------------------
    Day 33: Express Validation Middleware
            Implement validation middleware using a library like express-validator
------------------------------------------------------------------------------------*/

const express = require('express');
const { body, validationResult } = require('express-validator');

const PORT = 3000;
const app = express();
app.use(express.json());

// Define validation middleware
const userValidationRules = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('age').isInt({ min: 0, max: 99 }).withMessage('Age must be a positive integer between 0 and 99'),
];

app.post('/register', userValidationRules, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json({ message : 'User registered successfully', user: req.body });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


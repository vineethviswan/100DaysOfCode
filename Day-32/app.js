/*------------------------------------------------------------------------
    Day 32: Sending Emails with Nodemailer
            Use Nodemailer to send emails in a Nodejs app
-------------------------------------------------------------------------*/

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();
const { sendEmail } = require('./index');

app.use(express.json());

app.use((req, res, next) => {
    res.locals.userData = {
        email: process.env.TO_EMAIL,        
        subject: 'Hello from NodeJS!',
        message: 'This is a test email sent from a Node.js backend using Nodemailer.',
        userEmail: process.env.EMAIL_USER
    }
    next();
});

app.post('/send-email', sendEmail);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});





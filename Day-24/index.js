
/*------------------------------------------------------------------------
    Day 24 - CRON Jobs in Nodejs
             Schedule tasks using CRON syntax in a Nodejs app
-------------------------------------------------------------------------*/

const cron = require('node-cron');
const express = require('express');

const app = express();

var task_counter = 0;

// Schedule tasks to be run on the server.
cron.schedule('*/2 * * * * *', () => {
    console.log('Running a task every 2 seconds');
    task_counter++;
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Cron Job executed ' + task_counter + ' times' });
});

app.listen(3000);
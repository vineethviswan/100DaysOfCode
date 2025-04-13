/*------------------------------------------------------------------------
    Day 35: SocketIO for Real-Time Communication
            Use SocketIO to implement real-time communication
-------------------------------------------------------------------------*/

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { appendFile } = require('fs');

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on ('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


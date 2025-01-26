
/*------------------------------------------------------------------------
    Day 23 - Basic WebSocket Server
             Create a WebSocket server using the ws library
-------------------------------------------------------------------------*/

const WebSocket = require('ws');
const http = require('http');
const config = require('./config');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end ('Http Server Connected');
});

// Create a WebSocket server from the http server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    console.log('A new client connected');
    ws.send('Welcome to the WebSocket server');

    ws.on('message', message => {
        console.log(`Received message => ${message}`);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});


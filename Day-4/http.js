/*------------------------------------------------------------------------------------------------------------------------
Day 4 - Simple HTTP Server
Goal
    Create and run a simple HTTP server using the built-in http module
Tasks
    1. Introduction to HTTP Module
        -   The http module provides functionalities to create an HTTP server and handle HTTP requests and responses.
    2. Creating an HTTP Server
        -   Create a file named server.js and implement the code to create a http server on port 8080. Send 'Hello World!' as response
        -   Test your server by opening your browser and navigating to http://localhost:8080/. You should see Hello World!.
------------------------------------------------------------------------------------------------------------------------*/

const http = require('node:http');
const { hostname } = require('node:os');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello from Node.js!!');
});

const port = 8080;
server.listen(port, hostname, () => {
    console.log('Server running on port ' + port);
});
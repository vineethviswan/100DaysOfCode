/*---------------------------------------------------------------------------------------------
Day 7 - Routing in HTTP Server
        Implement simple routing for different HTTP endpoints
---------------------------------------------------------------------------------------------*/

console.log('Http Router..!');

const http = require('node:http');

// const server = http.createServer((req, res) => {
    
//     const {method, url} = req;
//     const {headers} = req;
//     const userAgent = headers['user-agent'];

//     let body = [];
//     if(req.method === 'POST' && req.url === '/echo' ){

    
//         req.on('error', err =>{
//             console.error(err.stack);
//         })
//         .on('data', chunk =>{
//             body.push(chunk);        
//         })
//         .on('end', ()=>{
//             body = Buffer.concat(body).toString();
//         })

//         res.setHeader('Content-Type', 'application/json');
//         const responseBody = {headers, method, url, body};
//         res.write (JSON.stringify(responseBody));
//         res.end();
//     }
//     else{
//         res.statusCode = 404;
//         res.end();
//     }

// }).listen(8080);

http.createServer((request, response) => {
    
    request.on('error', err => {
        console.error(err);
        response.statusCode = 404;
        response.end();    
    });
    response.on('error', () =>{
        console.error(err);
    });

    if(request.method === 'POST' && request.url === '/echo'){
        request.pipe(response);
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080);

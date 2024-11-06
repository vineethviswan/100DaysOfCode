/*-------------------------------------------------------------------------------------------------------------
Day 6 - File System Module Basics
Node.js provides a built-in module, fs (File System), to interact with the file system. 
Explore how to read, write, and manage files and directories.

Tasks
    -   Read and write text files using both synchronous and asynchronous methods
    -   Append data to files
    -   Handle common file errors
    -   Create and read directories, and explore directory manipulation functions
-------------------------------------------------------------------------------------------------------------*/

const fs = require('node:fs');
fs.readFile('input.txt', function(err, data){
    if(err)
        return console.error(err);
    console.log('Async Read:\n' + data.toString());
});

var file_content = fs.readFileSync('input.txt');
console.log('Syncrhonous Read:\n' + file_content.toString());

var file_des = 0;
fs.open('input.txt', 'r+', function(err, fd){
    if(err)
        console.error(err);
    file_des = fd;
    console.log('\nFile opened successfully.!');
});

var buffer = new Buffer(1024);
fs.read(file_des, buffer, 0, buffer.length, 0, function(err, bytes){
    if(err)
        console.error(err);
    console.log(bytes + ' bytes read');

    if(bytes > 0)
        console.log(buffer.slice(0, bytes).toString());
});



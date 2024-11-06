/*----------------------------------------------------------------------------------------------------------------------------------
Day 2 - Global Objects
Goals
    -   Understand and explore Node.js global objects
    -   Learn how to use these global objects effectively in your Node.js applications
Tasks
    1. Global Objects
        -   __dirname: The directory name of the current module
        -   __filename: The file name of the current module
        -   process: Information about the current Node.js process
    2. Understanding 'process' Object
        -   process.env: Access environment variables.
        -   process.argv: Command line arguments.
        -   process.exit(): Exiting the current process
        -   process.cwd(): Current working directory
        -   process.memoryUsage(): Memory usage of the Node.js process.
----------------------------------------------------------------------------------------------------------------------------------*/

const path = require('path');

const directory_name = __dirname;
const file_name = __filename;

// directory and file names
console.log(`Directory Name : ${directory_name}`);
console.log(`File Name : ${file_name}` );
console.log(`This is also directory name ${path.dirname(__filename)}`)

//Process
const { env } = require('node:process');
console.log(env.homepath);

//exit
const {exit} = require('node:process');
if (true){
    process.exitCode = 1;
}

//argv
const {argv} = require('node:process');
argv.forEach((val, index) => {
    console.log(`${index} : ${val}`);
});

//cwd
const {cwd} = require('node:process');
console.log(`Current working directory : ${cwd()}`);

//Memory usage
const { memoryUsage } = require ('node:process');
console.log(memoryUsage());
console.log(memoryUsage().arrayBuffers);
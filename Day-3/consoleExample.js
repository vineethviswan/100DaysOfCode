
/*------------------------------------------------------------------------------------------------------------------------
Day 3 - Console
Goals
    Using console for Debugging
Tasks
    1. Introduction to console
        -   Provides a simple debugging console
        -   Common methods: console.log(), console.error(), console.warn(), console.time(), console.timeEnd(), console.trace()
    2. Use console
        -   Create a file named consoleExample.js and use the above methods in your code.
------------------------------------------------------------------------------------------------------------------------*/

console.log("This is console.log()");
console.error("This is an error!!!");
console.warn("This is a warning!");

console.time("bunch of stuffs");
for(i = 0; i < 10000; i++);
console.timeEnd("bunch of stuffs");

console.trace();

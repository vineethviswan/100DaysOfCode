/*------------------------------------------------------------------------
    Day 26 - Debugging in Nodejs
             Learn and use debugging tools in Nodejs
             Reference: https://nodejs.org/en/learn/getting-started/debugging
-------------------------------------------------------------------------*/

function add (a, b){
    return a + b;
}

function subtract (a, b){
    return a - b;
}

function multiply (a, b){
    return a * b;
}

function divide (a, b){
    return a / b;
}

console.log("Sum : ", add(5, 5));
console.log("Subtraction : ", subtract(15, 5));
console.log("Multiplication : ", multiply(5, 5));
console.log("Division : ", divide(15, 5));

export default add;
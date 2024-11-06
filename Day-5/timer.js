/*-----------------------------------------------------------------------------------------
Day 5 - NodeJS Timers
Goal
    -   Use timers in Node.js to execute functions after a delay or repeatedly
Tasks
    -   Executes a function after a delay using setTimeout()
    -   Executes a function repeatedly with a delay between each call using setInterval()
    -   Stop a timeout and interval from running using clearTimeout() and clearInterval()
-------------------------------------------------------------------------------------------*/
console.log('Timer in JS!');

function TimerFxn(){
    console.log('Running TimerFxn!');
}

this.timeoutID = setTimeout(TimerFxn, 2000);

setTimeout(()=>{
    console.log('Running lambda ()');
}, 1000);

setTimeout(TimerFxn2, 3000, 'ARG--1');
clearTimeout(this.timeoutID);

var counter = 0;
function RepeatFxn(){
    counter++;
    console.log('Repeat Fxn!!' + counter);    
}

var intervalID = setInterval(RepeatFxn, 1000);

function TimerFxn2(arg){
    console.log('Running Function with arg : ' + arg + ' ' + intervalID);
    clearInterval(intervalID);
    intervalID = null;
}

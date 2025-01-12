
/*------------------------------------------------------------------------
    Day 20 - Environment Variables
             Utilize environment variables in a Nodejs application
-------------------------------------------------------------------------*/

const Config = require('./config');

console.log('Port:', Config.PORT);
console.log('Environment Name:', Config.ENV);
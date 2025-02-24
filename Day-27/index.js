
/*------------------------------------------------------------------------
    Day 27 - Express Router
             Organize routes using Express Router      
-------------------------------------------------------------------------*/

const express = require('express');
const app = express ();
const port = 3000;

// Multiple Routing
const routerHome = express.Router();
const routerAdmin = express.Router();
const routerUser = express.Router();    

routerHome.get ('/', (req, res, next) =>{
    res.send ('Hello Express Router!');
    console.log('Hello Express Router!');
    res.end();
});

routerAdmin.get ('/admin', (req, res, next) =>{
    res.send ('Hello Admin!');
    console.log('Hello Admin!');
    res.end();
});

routerUser.get ('/user', (req, res, next) =>{
    res.send ('Hello User!');
    console.log('Hello User!');
    res.end();
});

app.use(routerHome);
app.use(routerAdmin);
app.use(routerUser);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

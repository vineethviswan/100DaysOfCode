/*------------------------------------------------------------------------
    Day 31: Handling CORS
            Configure CORS in an Express app
-------------------------------------------------------------------------*/

const express = require('express');
const cors = require('cors');

const app = express();

//Enable CORS for all requests
//app.use(cors());

//enabling CORS for some specific origins only.
let corsOptions = {
  origin: ['http://localhost:5500']
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Server!' });
});

app.get('/secret', (req, res) => {
    const secret = Math.floor(Math.random() * 100)
    res.json({ secret })
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

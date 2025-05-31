const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(express.json());


// Dummy users data
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
  ];

 
app.get('/users', (req, res) => {
    res.json({users:users});
});

app.listen(PORT, ()=> {
    console.log('server started');
});


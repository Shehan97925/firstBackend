const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors'); // Corrected the typo here
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors()); // Enable CORS

// Registration Page
const user = require('./routes/user-route');

app.use('/api/user', user);

// Login Page
const login = require('./routes/login-route');

app.use('/api/login', login);

// Order
const item = require('./routes/item-route');

app.use('/api/register', item);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

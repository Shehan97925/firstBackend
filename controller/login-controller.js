const express = require('express');
const connection = require('../db/db-connection');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const queryStr = 'SELECT * FROM user WHERE email=?';
  const queryParams = [email];

  connection.query(queryStr, queryParams, (err, rows, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid em credentials' });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, user.password, (bcryptErr, result) => {
      if (bcryptErr) {
        console.error(bcryptErr);
        return res.status(500).json({ error: 'Password comparison error' });
      }

      if (result) {
        // Passwords match; user is authenticated
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        // Passwords don't match
        return res.status(401).json({ error: 'Invalid ps credentials' });
      }
    });
  });
};

module.exports = { login };

const express = require('express');
const connection = require('../db/db-connection');
const bcrypt = require('bcrypt');



const userRegister = (req, res) => {
  const { id,name,contact,email,username,password } = req.body;

  const query = 'INSERT INTO registration (id,name,contact,email,username,password) VALUES (?, ?, ? ,? ,? ,?)';
  const values = [id,name,contact,email,username,password];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'Data inserted successfully', result });
  });
};

module.exports = { userRegister };

const connection = require('../db/db-connection');

const uploadImage = (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    const { filename } = req.file;
    const { item_id } = req.params;

    if (!item_id || isNaN(item_id)) {
      return res.status(400).send({ message: 'Invalid item_id' });
    }

    const sql = 'INSERT INTO image (imageName, item_id) VALUES (?, ?)';
    const values = [filename, item_id];

    connection.query(sql, values, (err, rows) => {
      if (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).send({ error: 'Failed to insert image into the database' });
      }

      return res.status(201).send({
        images: req.file,
        message: 'Image uploaded successfully',
      });
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ error: 'Internal Server Error! Try again, please!' });
  }
};

module.exports = { uploadImage };

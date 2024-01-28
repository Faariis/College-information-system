const express = require("express");
const connection = require("../connection");
const router = express.Router();

// GET courses
router.get('/get', (req, res) =>{
    const query = 'SELECT * FROM courses ORDER BY CourseName';

    connection.query(query, (err, results) =>{
          if (!err) {
            return res.status(200).json(results);
          } else
          {
            return res.status(400).json(err);
          }
    });
});


module.exports = router;
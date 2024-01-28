const express = require("express");
const connection = require("../connection");
const { ConnectionAcquireTimeoutError } = require("sequelize");
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

// POST
router.post('/post', (req, res) => {
    let courses = req.body;

    const query = 'INSERT INTO courses (CourseCode, CourseName, ECTSCredits) VALUES (?,?,?)';

    connection.query(query, [courses.CourseCode, courses.CourseName, courses.ECTSCredits], (err, results) =>{
        if (!err) {
            return res.status(200).json({message: "Uspješno dodan predmet!"});
        } else {
            return res.status(400).json(err);
        }
    });
});


module.exports = router;
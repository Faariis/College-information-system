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
    
    // Provjerava ima li više kurseva sa istim kodom
    const courseCodequery = 'SELECT * FROM courses WHERE CourseCode = ?';

    connection.query(courseCodequery, [courses.CourseCode], (err, courseCode) =>{
        if (err) {
            console.error("Error checking course code: ", err);
            return res.status(500).json({message: "Error checking course code: "});
        } 
        if (courseCode.length !== 0) {
            return res.status(400).json({message: "Već ima predmet sa istim kodom!"});
        }
    



    const query = 'INSERT INTO courses (CourseCode, CourseName, ECTSCredits) VALUES (?,?,?)';

    connection.query(query, [courses.CourseCode, courses.CourseName, courses.ECTSCredits], (err, results) =>{
        if (!err) {
            return res.status(200).json({message: "Uspješno dodan predmet!"});
        } else {
            return res.status(400).json(err);
        }
    });
});
});


module.exports = router;
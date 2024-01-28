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
    
    // Provjera ima li više kurseva sa istim nazivom
    const courseNamequery = 'SELECT * FROM courses WHERE CourseName = ?';

    connection.query(courseNamequery, [courses.CourseName], (err, courseName) =>{
         if (err) {
            console.error("Error checking course name", err);
            return res.status(500).json({message: "Error checking course name"});
         }
         if (courseName.length !== 0) {
            return res.status(400).json({message: "Već ima predmet sa istim nazivom!"});
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
});

// DELETE
router.delete('/delete', (req, res) => {
    let courese = req.body;

    const query = 'DELETE FROM courses';

    connection.query(query, (err, results) =>{
          if (results.affectedRows === 0) {
            return res.status(400).json({message: "Nema predmeta za izbrisati!"});
          }
          if (!err) {
            return res.status(200).json({message: "Predmeti uspješni izbrisani!"});
          } else {
            return res.status(500).json(err);
          }
    });

});


module.exports = router;
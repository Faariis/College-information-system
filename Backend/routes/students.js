const express = require("express");
const connection = require("../connection");
const router = express.Router();

// GET

router.get("/get", (req, res) => {
  var query = "select *from students order by StudentID";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// POST

router.post("/add", (req, res) => {
  let students = req.body;

  // Provjerava da li postoji student sa istim brojem indeksa
  const checkStudentIndexNumber =
    "SELECT * FROM students WHERE IndexNumber = ?";
  connection.query(
    checkStudentIndexNumber,
    [students.IndexNumber],
    (err, studentIN) => {
      if (err) {
        console.error("Error checking student index number existence:", err);
        return res
          .status(500)
          .json({ error: "Error checking student index number existence" });
      }

      if (studentIN.length !== 0) {
        return res
          .status(400)
          .json({ error: "Već postoji student sa tim indeksom." });
      } else if (students.IndexNumber <= 0 || students.IndexNumber >= 1000) {
        return res
          .status(400)
          .json({
            error:
              "Vrijednost indeksa ne smije biti manje od 1 ili veće od 1000!",
          });
      } else if (!/^\d+$/.test(students.IndexNumber)) {
        return res
          .status(400)
          .json({ message: "Indeks mora se sastojati od brojeva!" });
      }

      // Provjerava da li postoji student sa istim matičnim brojem
      const checkStudentJMBG = "SELECT * FROM students WHERE JMBG = ?";
      connection.query(
        checkStudentJMBG,
        [students.JMBG],
        (err, studentJMBG) => {
          if (err) {
            console.error("Error checking student JMBG existence:", err);
            return res
              .status(500)
              .json({ error: "Error checking student JMBG existence" });
          }

          if (studentJMBG.length !== 0) {
            return res
              .status(400)
              .json({ error: "Već postoji student sa tim matičnim brojem." });
          } else if (students.JMBG.length !== 13) {
            return res
              .status(400)
              .json({
                error:
                  "Vrijednost matičnog broja ne smije biti manja ili veća od 13!",
              });
          } else if (!/^\d+$/.test(students.JMBG)) {
            return res
              .status(400)
              .json({ message: "JMBG mora se sastojati od brojeva!" });
          }

          // Glavna funkcija tj. POST
          var query =
            "insert into students (RegistrationYear, Semester, IndexNumber, JMBG, FirstName, LastName, Gender, Email, Phone, DateOfBirth, PlaceOfBirth, Address, UserType, Password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          connection.query(
            query,
            [
              students.RegistrationYear,
              students.Semester,
              students.IndexNumber,
              students.JMBG,
              students.FirstName,
              students.LastName,
              students.Gender,
              students.Email,
              students.Phone,
              students.DateOfBirth,
              students.PlaceOfBirth,
              students.Address,
              students.UserType,
              students.Password,
            ],
            (err, results) => {
              if (!err) {
                return res
                  .status(200)
                  .json({ message: "Student je uspješno dodan!" });
              } else {
                return res.status(500).json(err);
              }
            }
          );
        }
      );
    }
  );
});

module.exports = router;

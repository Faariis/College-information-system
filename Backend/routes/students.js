const express = require("express");
const connection = require("../connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { route } = require("..");

//-------------------------------------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------------
// POST
/*
router.post("/add", (req, res) => {
  let students = req.body;

  // Provjera jer ima 12 semestara i ne smije biti slovo
  if (students.Semester <= 0 || students.Semester >= 12) {
    return res.status(400).json({ error: "Ima 12 semestara [1-12]!" });
  }
  // Provjera enumeracije, da mora biti student
  if (students.UserType !== "student") {
    return res.status(400).json({ error: "User type mora biti student!" });
  }
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
        return res.status(400).json({
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
            return res.status(400).json({
              error:
                "Vrijednost matičnog broja ne smije biti manja ili veća od 13!",
            });
          } else if (!/^\d+$/.test(students.JMBG)) {
            return res
              .status(400)
              .json({ message: "JMBG mora se sastojati od brojeva!" });
          }

          // Provjerava postoje li dva studenta sa istim imenom i prezimenom
          const checkStudentFirstNameLastName =
            "SELECT * FROM students WHERE FirstName = ? AND LastName = ?";
          connection.query(
            checkStudentFirstNameLastName,
            [students.FirstName, students.LastName],
            (err, studentFL) => {
              if (err) {
                console.error(
                  "Error checking student first and last name existence:",
                  err
                );
                return res.status(500).json({
                  error: "Error checking student first and last name existence",
                });
              }

              if (studentFL.length !== 0) {
                return res.status(400).json({
                  error: "Već postoji student sa tim imenom i prezimenom.",
                });
              } else if (/\d/.test(students.LastName)) {
                return res
                  .status(400)
                  .json({ message: "Prezime ne smije sadržavati brojeve!" });
              } else if (/\d/.test(students.FirstName)) {
                return res
                  .status(400)
                  .json({ message: "Ime ne smije sadržavati brojeve!" });
              }

              // Provjerava da li postoji student sa istim mailom
              const checkStudentEmail =
                "SELECT * FROM students WHERE Email = ?";
              connection.query(
                checkStudentEmail,
                [students.Email],
                (err, studentEmail) => {
                  if (err) {
                    console.error(
                      "Error checking student email existence:",
                      err
                    );
                    return res.status(500).json({
                      error: "Error checking student email existence",
                    });
                  }

                  if (studentEmail.length !== 0) {
                    return res
                      .status(400)
                      .json({ error: "Već postoji student sa tim mailom." });
                  }

                  // Provjerava da li postoji student sa istim brojem telefona
                  const checkStudentPhone =
                    "SELECT * FROM students WHERE Phone = ?";
                  connection.query(
                    checkStudentPhone,
                    [students.Phone],
                    (err, studentPhone) => {
                      if (err) {
                        console.error(
                          "Error checking student phone existence:",
                          err
                        );
                        return res.status(500).json({
                          error: "Error checking student phone existence",
                        });
                      }

                      if (studentPhone.length !== 0) {
                        return res.status(400).json({
                          error: "Već postoji student sa tim brojem telefona.",
                        });
                      } else if (!/^\d+$/.test(students.Phone)) {
                        return res.status(400).json({
                          message: "Telefon mora se sastojati od brojeva!",
                        });
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
            }
          );
        }
      );
    }
  );
});*/
//-------------------------------------------------------------------------------------------------------
// UPDATE

router.patch("/update", (req, res) => {
  let students = req.body;

  // Provjera jer ima 12 semestara i ne smije biti slovo
  if (students.Semester <= 0 || students.Semester >= 12) {
    return res.status(400).json({ error: "Ima 12 semestara [1-12]!" });
  }
  // Provjera enumeracije, da mora biti student
  if (students.UserType !== "student") {
    return res.status(400).json({ error: "User type mora biti student!" });
  }

  // Provjerava da li postoji student sa istim brojem indeksa
  const checkStudentIndexNumber =
    "SELECT * FROM students WHERE IndexNumber = ? AND StudentID <> ?";
  connection.query(
    checkStudentIndexNumber,
    [students.IndexNumber, students.StudentID],
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
        return res.status(400).json({
          error:
            "Vrijednost indeksa ne smije biti manje od 1 ili veće od 1000!",
        });
      } else if (!/^\d+$/.test(students.IndexNumber)) {
        return res
          .status(400)
          .json({ message: "Indeks mora se sastojati od brojeva!" });
      }

      // Provjerava da li postoji student sa istim matičnim brojem
      const checkStudentJMBG =
        "SELECT * FROM students WHERE JMBG = ? AND StudentID <> ?";
      connection.query(
        checkStudentJMBG,
        [students.JMBG, students.StudentID],
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
            return res.status(400).json({
              error:
                "Vrijednost matičnog broja ne smije biti manja ili veća od 13!",
            });
          } else if (!/^\d+$/.test(students.JMBG)) {
            return res
              .status(400)
              .json({ message: "JMBG mora se sastojati od brojeva!" });
          }

          // Provjerava postoje li dva studenta sa istim imenom i prezimenom
          const checkStudentFirstNameLastName =
            "SELECT * FROM students WHERE FirstName = ? AND LastName = ? AND StudentID <> ?";
          connection.query(
            checkStudentFirstNameLastName,
            [students.FirstName, students.LastName, students.StudentID],
            (err, studentFL) => {
              if (err) {
                console.error(
                  "Error checking student first and last name existence:",
                  err
                );
                return res.status(500).json({
                  error: "Error checking student first and last name existence",
                });
              }

              if (studentFL.length !== 0) {
                return res.status(400).json({
                  error: "Već postoji student sa tim imenom i prezimenom.",
                });
              } else if (/\d/.test(students.LastName)) {
                return res
                  .status(400)
                  .json({ message: "Prezime ne smije sadržavati brojeve!" });
              } else if (/\d/.test(students.FirstName)) {
                return res
                  .status(400)
                  .json({ message: "Ime ne smije sadržavati brojeve!" });
              }

              // Provjerava da li postoji student sa istim mailom
              const checkStudentEmail =
                "SELECT * FROM students WHERE Email = ? AND StudentID <> ?";
              connection.query(
                checkStudentEmail,
                [students.Email, students.StudentID],
                (err, studentEmail) => {
                  if (err) {
                    console.error(
                      "Error checking student email existence:",
                      err
                    );
                    return res.status(500).json({
                      error: "Error checking student email existence",
                    });
                  }

                  if (studentEmail.length !== 0) {
                    return res
                      .status(400)
                      .json({ error: "Već postoji student sa tim mailom." });
                  }

                  // Provjerava da li postoji student sa istim brojem telefona
                  const checkStudentPhone =
                    "SELECT * FROM students WHERE Phone = ? AND StudentID <> ?";
                  connection.query(
                    checkStudentPhone,
                    [students.Phone, students.StudentID],
                    (err, studentPhone) => {
                      if (err) {
                        console.error(
                          "Error checking student phone existence:",
                          err
                        );
                        return res.status(500).json({
                          error: "Error checking student phone existence",
                        });
                      }

                      if (studentPhone.length !== 0) {
                        return res.status(400).json({
                          error: "Već postoji student sa tim brojem telefona.",
                        });
                      } else if (!/^\d+$/.test(students.Phone)) {
                        return res.status(400).json({
                          message: "Telefon mora se sastojati od brojeva!",
                        });
                      }

                      // UPDATE Glavna funkcija
                      var query =
                        "update students set RegistrationYear=?, Semester=?, IndexNumber=?, JMBG=?, FirstName=?, LastName=?, Gender=? ,Email=?, Phone=?, DateOfBirth=?, PlaceOfBirth=?, Address=?, UserType=?, Password=? where StudentID=?";
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
                          students.StudentID,
                        ],
                        (err, results) => {
                          if (!err) {
                            if (results.affectedRows === 0) {
                              return res.status(404).json({
                                message: "Id biranog studenta ne postoji!",
                              });
                            }
                            return res.status(200).json({
                              message: "Student uspješno izmijenjen!",
                            });
                          } else {
                            return res.status(500).json(err);
                          }
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
//-------------------------------------------------------------------------------------------------------
// DELETE

router.delete("/delete", (req, res) => {
  let students = req.body;
  var query = "delete from students";
  connection.query(query, (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Svi studenti uspješno izbrisani!" });
      } else {
        return res
          .status(404)
          .json({ message: "Nema studenata za izbrisati!" });
      }
    } else {
      return res
        .status(500)
        .json({ error: "Greška prilikom brisanja studenata!" });
    }
  });
});
//-------------------------------------------------------------------------------------------------------
// REGISTRATION

router.post("/register", (req, res) => {
  const {
    RegistrationYear,
    Semester,
    IndexNumber,
    JMBG,
    FirstName,
    LastName,
    Gender,
    Email,
    Phone,
    DateOfBirth,
    PlaceOfBirth,
    Address,
    UserType,
    Password,
  } = req.body;
  let students = req.body;

  // Provjera jer ima 12 semestara i ne smije biti slovo
  if (students.Semester <= 0 || students.Semester >= 12) {
    return res.status(400).json({ error: "Ima 12 semestara [1-12]!" });
  }
  // Provjera enumeracije, da mora biti student
  if (students.UserType !== "student") {
    return res.status(400).json({ error: "User type mora biti student!" });
  }
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
        return res.status(400).json({
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
            return res.status(400).json({
              error:
                "Vrijednost matičnog broja ne smije biti manja ili veća od 13!",
            });
          } else if (!/^\d+$/.test(students.JMBG)) {
            return res
              .status(400)
              .json({ message: "JMBG mora se sastojati od brojeva!" });
          }

          // Provjerava postoje li dva studenta sa istim imenom i prezimenom
          const checkStudentFirstNameLastName =
            "SELECT * FROM students WHERE FirstName = ? AND LastName = ?";
          connection.query(
            checkStudentFirstNameLastName,
            [students.FirstName, students.LastName],
            (err, studentFL) => {
              if (err) {
                console.error(
                  "Error checking student first and last name existence:",
                  err
                );
                return res.status(500).json({
                  error: "Error checking student first and last name existence",
                });
              }

              if (studentFL.length !== 0) {
                return res.status(400).json({
                  error: "Već postoji student sa tim imenom i prezimenom.",
                });
              } else if (/\d/.test(students.LastName)) {
                return res
                  .status(400)
                  .json({ message: "Prezime ne smije sadržavati brojeve!" });
              } else if (/\d/.test(students.FirstName)) {
                return res
                  .status(400)
                  .json({ message: "Ime ne smije sadržavati brojeve!" });
              }

              // Provjerava da li postoji student sa istim mailom
              const checkStudentEmail =
                "SELECT * FROM students WHERE Email = ?";
              connection.query(
                checkStudentEmail,
                [students.Email],
                (err, studentEmail) => {
                  if (err) {
                    console.error(
                      "Error checking student email existence:",
                      err
                    );
                    return res.status(500).json({
                      error: "Error checking student email existence",
                    });
                  }

                  if (studentEmail.length !== 0) {
                    return res
                      .status(400)
                      .json({ error: "Već postoji student sa tim mailom." });
                  }

                  // Provjerava da li postoji student sa istim brojem telefona
                  const checkStudentPhone =
                    "SELECT * FROM students WHERE Phone = ?";
                  connection.query(
                    checkStudentPhone,
                    [students.Phone],
                    (err, studentPhone) => {
                      if (err) {
                        console.error(
                          "Error checking student phone existence:",
                          err
                        );
                        return res.status(500).json({
                          error: "Error checking student phone existence",
                        });
                      }

                      if (studentPhone.length !== 0) {
                        return res.status(400).json({
                          error: "Već postoji student sa tim brojem telefona.",
                        });
                      } else if (!/^\d+$/.test(students.Phone)) {
                        return res.status(400).json({
                          message: "Telefon mora se sastojati od brojeva!",
                        });
                      }

                      // Hash the password
                      bcrypt
                        .hash(Password, 10)
                        .then((hashedPassword) => {
                          // Insert into the database
                          const query =
                            "INSERT INTO Students (RegistrationYear, Semester, IndexNumber, JMBG, FirstName, LastName, Gender, Email, Phone, DateOfBirth, PlaceOfBirth, Address, UserType, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                          connection.query(
                            query,
                            [
                              RegistrationYear,
                              Semester,
                              IndexNumber,
                              JMBG,
                              FirstName,
                              LastName,
                              Gender,
                              Email,
                              Phone,
                              DateOfBirth,
                              PlaceOfBirth,
                              Address,
                              UserType,
                              hashedPassword,
                            ],
                            (err, results) => {
                              if (!err) {
                                return res
                                  .status(201)
                                  .json({
                                    message: "Korisnik uspješno registrovan!",
                                  });
                              } else {
                                console.error(
                                  "Error inserting into the database:",
                                  err
                                );
                                return res
                                  .status(500)
                                  .json({
                                    error: "Error inserting into the database",
                                  });
                              }
                            }
                          );
                        })
                        .catch((error) => {
                          console.error("Error hashing password:", error);
                          return res
                            .status(500)
                            .json({ error: "Greška kod hashiranja šifre!" });
                        });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { Email, Password, UserType } = req.body;

  // Izabrati tabelu
  const tableName = UserType === "admin" ? "admins" : "students";

  // Glavna funkcija
  connection.query(
    `SELECT * FROM ${tableName} WHERE Email = ?`,
    [Email],
    async (error, results) => {
      if (error) {
        console.error("Error in login:", error);
        return res.status(500).json(error);
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Nema korisnika" });
      }

      const user = results[0];

      try {
        // Poređenje šifre
        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
          // JWT
          const token = jwt.sign(
            { userId: user.id, userType: user.UserType },
            "your-secret-key",
            { expiresIn: "1h" }
          );

          return res
            .status(200)
            .json({
              message: "Uspješna prijava!",
              token,
              userType: user.UserType,
            });
        } else {
          // Passwords do not match, authentication failed
          return res.status(401).json({ message: "Neuspješna prijava!" });
        }
      } catch (compareError) {
        console.error("Error comparing passwords:", compareError);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  );
});

module.exports = router;

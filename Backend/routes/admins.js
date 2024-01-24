const express = require("express");
const connection = require("../connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//-------------------------------------------------------------------------------------------
// GET
router.get("/get", (req, res) => {
  var query = "select * from admins order by AdminID";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(400).json(err);
    }
  });
});
//-------------------------------------------------------------------------------------------
// REGISTRATION
router.post("/register", (req, res) => {
  const { FirstName, LastName, Email, Password, UserType } = req.body;
  let admins = req.body;
  
  // Provjera enumeracije da je "admin"
  if (admins.UserType !== "admin"){
    return res.status(400).json({error: 'UserType mora biti admin!'});
  }

  // Provjera da više admina nema isto ime i prezime
  const checkAdminsFirstNameLastName = 'SELECT * FROM admins WHERE FirstName = ? AND LastName = ?';

  connection.query(checkAdminsFirstNameLastName, [admins.FirstName, admins.LastName], (err, adminFL) =>{
     if (err) {
        console.error('Error checking student first and last name existence:', err);
        return res.status(500).json({message: 'Error checking student first and last name existence:'});
     }
     if (adminFL.length !== 0) {
         return res.status(401).json({error: 'Već ima admin sa istim imenom i prezimenom!'});
     } else if (/\d/.test(admins.LastName)) {
          return res.status(400).json({error: 'Prezime ne smije sadržavati brojeve!'});
     } else if (/\d/.test(admins.FirstName)) {
          return res.status(400).json({error: 'Ime ne smije sadržavati brojeve!'});
     }

     // Provjera da više admina nema isti mail
     const checkAdminsEmail = 'SELECT * FROM admins WHERE Email = ?';
     
     connection.query(checkAdminsEmail, [admins.Email], (err, adminEmail) => {
          if (err) {
            console.error('Error checking student first and last name existence:', err);
            return res.status(500).json({message: 'Error checking student first and last name existence:'});
          }
          if (adminEmail.length !== 0) {
            return res.status(400).json({error: 'Već ima admin sa istim mailom!'});
          } 
        
        // Haširanje šifre
        bcrypt.hash(Password, 10).then((hashedPassword) =>{
        
        const query = 'INSERT INTO admins (FirstName, LastName, Email, UserType, Password) VALUES (?,?,?,?,?)';
        
        connection.query(query, [admins.FirstName, admins.LastName, admins.Email, admins.UserType, hashedPassword], (err, results) =>{
             if(!err) {
                return res.status(200).json({message: "Admin uspješno registrovan!"});
             } else {
                console.error("Error inserting into the database", err);
                return res.status(500).json({error: "Error inserting into the database"});
             }
        });
        }).catch((error) => {
                console.error("Error hashing password:", err);
                return res.status(500).json({message: "Greška kod haširanja šifre!"});
        });
        });
  });   
  });
//-------------------------------------------------------------------------------------------
// LOGIN 
router.post('/login', (req, res) =>{
    const { Email, Password, UserType } = req.body;
    
    // Biranje tabele na osnovu usertype
    const tableName = UserType === 'admin' ? 'admins' : 'students';
    
    const query = `SELECT * FROM ${tableName} WHERE Email = ?`

    connection.query(query, [Email], async(error, results) =>{
          if (error) {
            console.error("Error in login:", error);
            return res.status(500).json(error);
          }
          if (results.length === 0) {
            return res.status(200).json({message: "Nema korisnika!"});
          }

          const user = results[0];

          try {
            // Poređenje šifre
            const paswordMatch = await bcrypt.compare(Password, user.Password);

            if (paswordMatch) {
                // JWT
                const token = jwt.sign({userId: user.userId, userType: user.userType}, "your-secret-key", {expiresIn: "1h"});
                return res.status(200).json({message: "Uspješna prijava!", token, userType: user.userType });
            } else {
                return res.status(400).json({message: "Neuspješna prijava!"});
            }
          } catch (compareError) {
            console.error("Error comparing passwords: ", compareError);
            return res.status(500).json({message: "Internal server error"});
          }
    })
});

//-------------------------------------------------------------------------------------------
// DELETE 
router.delete("/delete", (req, res) => {
  var query = "delete from admins";

  connection.query(query, (err, results) => {
    if (!err) {
      if (results.affectedRows > 0) {
        return res.status(200).json({ message: "Uspješno izbrisani admini!" });
      } else {
        return res.status(404).json({ message: "Nema admina za brisati!" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;

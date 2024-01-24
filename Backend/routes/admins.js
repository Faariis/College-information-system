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
router.register("/register", (req, res) => {
  const { FirstName, LastName, Email, Password, UserType } = req.body;
  let admins = req.body;

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

  });   
  });

//-------------------------------------------------------------------------------------------
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

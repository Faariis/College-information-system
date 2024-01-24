const express = require("express");
const connection = require("../connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//-------------------------------------------------------------------------------------------
// GET
router.get('/get', (req, res) =>{
     var query = 'select * from admins order by AdminID';

     connection.query(query, (err, results) =>{
         if (!err)
         {
            return res.status(200).json(results);
         } else {
            return res.status(400).json(err);
         }
     });
});
//-------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------
router.delete('/delete', (req, res) =>{
       var query = 'delete from admins';

       connection.query(query, (err, results) =>{
           if (!err) {
             if (results.affectedRows > 0) {
                 return res.status(200).json({message: 'Uspješno izbrisani admini!'});
             } else {
                return res.status(404).json({message: 'Nema admina za brisati!'});
             }
           } else {
                 return res.status(500).json(err);
           }
       });
});

module.exports = router;
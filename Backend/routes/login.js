const express = require("express");
const connection = require("../connection");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// LOGIN
router.post('/login', (req, res) =>{
    const { Email, Password, UserType } = req.body;

    // Biranje tabele na osnovu korisnika
    if (UserType !== 'admin' && UserType !== 'student') {
        return res.status(401).json({message: "UserType mora biti admin ili student!"});
    }
    const tableName = UserType === 'admin' ? 'admins' : 'students';
  
   
    const query = `SELECT * FROM ${tableName} WHERE Email = ?`;

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

            // Poređenje šifri
            const passwordMatch = await bcrypt.compare(Password, user.Password);
            
            if (passwordMatch) {
            // JWT
            const token = jwt.sign({ UserID : user.UserID, UserType: user.UserType }, 'your-secret-key', { expiresIn: '1h' });
            return res.status(200).json({message: "Uspješna prijava!", token, UserType: user.UserType});
            } else {
                return res.status(500).json({message: "Neuspješna prijava!"});
            }
        } catch (compareError) {
            console.error("Error comparing password:", compareError);
            return res.status(500).json({message: "Internal server error!"});
        }
    });
});




module.exports = router;

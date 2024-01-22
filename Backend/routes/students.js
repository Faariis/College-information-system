const express = require('express');
const connection = require('../connection');
const router = express.Router();

// GET 

router.get('/get', (req, res) => {
    
    var query = "select * from Students order by username";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});

// POST

module.exports = router;
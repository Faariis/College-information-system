const express = require('express');
const app = express();

app.get('/getData', (req, res) =>{
    res.json({
        "statusCode": 200,
        "statusMessage": "Uspjeh"
    })
})

app.listen(3000, (req, res) =>{
    console.log('Express API radi na portu 3000');
})
const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const app = express();
const studentsRoute = require('./routes/students');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/students', studentsRoute);

module.exports = app;


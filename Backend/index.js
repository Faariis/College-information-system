const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const app = express();
const studentsRoute = require('./routes/students');
const adminsRoute = require('./routes/admins');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/students', studentsRoute);
app.use('/admins', adminsRoute);

module.exports = app;


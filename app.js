const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const dashboardRoutes = require('./routes/dashboard');


const app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb',extended: false}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
let root = __dirname + '/dist';
app.use(express.static(root));

app.use("/api/dashboard", dashboardRoutes);



module.exports = app;
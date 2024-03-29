const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const dashboardRoutes = require('./routes/dashboard');


const app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb',extended: false}));
app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/dashboard", dashboardRoutes);



module.exports = app;
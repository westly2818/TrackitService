const express = require('express');
const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.post("/insertdata",  dashboardController.insertDailydata);
router.post("/getdata",  dashboardController.getdata);

module.exports = router;
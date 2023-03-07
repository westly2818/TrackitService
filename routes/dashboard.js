const express = require('express');
const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.post("/getData",  dashboardController.getDashboardData);
router.get("/getnames",  dashboardController.getnames);

module.exports = router;
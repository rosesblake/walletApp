const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

//authenticate token middleware used here
router.get("/", authenticateToken, dashboardController.getWalletBalance);

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const depositController = require("../controllers/depositController");

router.post("/", authenticateToken, depositController.deposit);

module.exports = router;

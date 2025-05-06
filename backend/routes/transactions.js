const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const transactionController = require("../controllers/transactionController");

router.get("/", authenticateToken, transactionController.getTransactions);

module.exports = router;

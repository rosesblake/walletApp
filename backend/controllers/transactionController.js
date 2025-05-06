const pool = require("../config/db");

exports.getTransactions = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, amount, status, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.userId]
    );
    res.json({ transactions: rows });
  } catch (err) {
    console.error("Transactions error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

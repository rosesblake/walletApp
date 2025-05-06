const pool = require("../config/db");

exports.getWalletBalance = async (req, res) => {
  try {
    //just grab and show the user's wallet balance on login
    const [rows] = await pool.query(
      "SELECT wallet_balance FROM users WHERE id = ?",
      [req.user.userId]
    );
    const wallet = rows[0]?.wallet_balance ?? 0;
    res.json({ wallet_balance: wallet });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

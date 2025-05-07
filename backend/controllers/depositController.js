const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const pool = require("../config/db");

exports.deposit = async (req, res) => {
  const { amount, payment_method_id } = req.body;
  console.log("REQ BODY:", req.body);

  try {
    //payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd", //static currency for now
      payment_method: payment_method_id,
      confirm: true,
      automatic_payment_methods: {
        //had to add this for stripe test use
        enabled: true,
        allow_redirects: "never",
      },
    });

    // update balance
    await pool.query(
      "UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?",
      [amount, req.user.userId]
    );

    await pool.query(
      "INSERT INTO transactions (user_id, amount, status) VALUES (?, ?, ?)",
      [req.user.userId, amount, "success"]
    );

    res.json({ message: "Deposit successful" });
  } catch (err) {
    console.error("Stripe error:", err.message);

    // log failed transaction
    await pool.query(
      "INSERT INTO transactions (user_id, amount, status) VALUES (?, ?, ?)",
      [req.user.userId, amount, "failed"]
    );

    res.status(400).json({ error: "Deposit failed" });
  }
};

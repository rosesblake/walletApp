require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const depositRoutes = require("./routes/deposit");

const cookieParser = require("cookie-parser"); //store JWT safely in cookies

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/deposit", depositRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

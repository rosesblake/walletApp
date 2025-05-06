const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.sendStatus(401); //unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //forbiddden
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

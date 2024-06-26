// utils/auth.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign({ id: user._id,unit:user.unit,name:user.firstname }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
// Protect routes with JWT middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}
module.exports = {generateToken,authenticateToken}
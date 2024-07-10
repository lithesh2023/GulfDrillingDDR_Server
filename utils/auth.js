// utils/auth.js
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, unit: user.unit, name: user.firstname }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
function generateRefreshToken(user) {
  return jwt.sign({ name: user.firstname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '6h' });
}
// Protect routes with JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization
 
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
 
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


module.exports = { generateAccessToken, authenticateToken, generateRefreshToken }
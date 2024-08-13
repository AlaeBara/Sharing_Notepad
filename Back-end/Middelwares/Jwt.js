const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.token_jwt);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Token is not valid' });
  }
};

module.exports = {jwtMiddleware};

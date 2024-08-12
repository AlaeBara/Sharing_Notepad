const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.token_jwt);

    // Attach the user to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = jwtMiddleware;

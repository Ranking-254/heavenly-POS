const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Get the token from the Header (It usually looks like "Bearer <token>")
  const authHeader = req.headers.token;
  
  if (authHeader) {
    // Split "Bearer <token>" and take the token part
    const token = authHeader.split(" ")[1];

    // 2. Verify the token using your Secret Key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      
      // 3. If valid, attach the user info to the request and let them in
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json("You are not allowed to do that! (Admin Only)");
    }
  });
};

module.exports = { verifyToken, verifyAdmin };
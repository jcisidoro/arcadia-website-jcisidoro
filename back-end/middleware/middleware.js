// middleware.js
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware for JWT token validation and role checking
function checkRole(requiredRoles) {
  return (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is missing" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decodedToken.role;

      if (!requiredRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Forbidden - Insufficient role" });
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  };
}

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      "https://arcadia-website-jcisidoro.onrender.com",
      "https://arcadia-website-sustainability-hub.vercel.app",
    ];

    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Export middleware functions
module.exports = {
  checkRole,
  limiter,
  corsOptions,
  helmet,
  cookieParser,
  cors,
};

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const authMiddleware = {
  verifyToken(req, res, next) {
    console.log('Authorization Header:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  },

  hasRole(roles) {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  },

  isAdmin(req, res, next) {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  },

  isTeacher(req, res, next) {
    if (req.user.role !== 'Teacher') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  },

  isStudent(req, res, next) {
    if (req.user.role !== 'Student') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  },
};

module.exports = authMiddleware;

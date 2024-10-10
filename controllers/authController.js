const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const jwtConfig = require('../config/jwt'); // Import JWT config

const authController = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, jwtConfig.secret, { expiresIn: jwtConfig.options.expiresIn });

    return res.status(200).json({ token }); // Send the token back to the client
  },

  async signup(req, res, next) {
    try {
      const user = await authService.signup(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;

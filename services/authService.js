const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = {
  async signup(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  },

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  },

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};

module.exports = authService;

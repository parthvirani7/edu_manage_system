const dotenv = require('dotenv');

dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_default_secret_key', 
  options: {
    expiresIn: '1h', 
}
}

module.exports = jwtConfig;

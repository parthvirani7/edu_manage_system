const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URI; 
    if (!dbURI) {
      throw new Error('DB_URI is not defined in environment variables');
    }

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;

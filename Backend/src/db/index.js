import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
  path: '../.env',
});
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `Connected to MongoDB with host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('Error connecting to MongoDB. ', error);
    process.exit(1);
  }
};

export default connectDB;

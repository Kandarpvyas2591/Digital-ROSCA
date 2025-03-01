import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import cors from 'cors';
import mongoose from 'mongoose';

app.use(cors());

dotenv.config({
  path: '../.env',
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed. ', error);
  });

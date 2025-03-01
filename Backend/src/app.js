import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cron from 'node-cron';
// import cron from 'node-cron';

const app = express();

dotenv.config({
  path: '../.env',
});

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

cron.schedule('0 8 * * *', () => {
  console.log('Running daily rosca funds allocation job...');
});

//routes import
import userRouter from './routes/user.routes.js';
import roscaGroupRouter from './routes/roscaGroup.routes.js';
import loanOfferRouter from './routes/loanOffer.routes.js';
import transactionRouter from './routes/transaction.routes.js';
//router declaration
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/loan', loanRouter);
app.use('/api/v1/rosca', roscaGroupRouter);
app.use('/api/v1/loan', loanOfferRouter);
app.use('/api/v1/transaction', transactionRouter);

export { app };

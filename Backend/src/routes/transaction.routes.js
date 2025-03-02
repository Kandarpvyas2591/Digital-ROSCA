import { Router } from 'express';
import {
  createTransaction,
  getAllTransactions,
  getGroupTransactions,
  getTransactionById,
  getUserTransactions,
} from '../controllers/transaction.controller.js';
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create-transaction', createTransaction);

router.get('/get-all-transactions', verifyJWT, verifyAdmin, getAllTransactions);

router.get('/get-transaction/:id', getTransactionById);

router.get('/get-user-transactions/:id', verifyJWT, getUserTransactions);

router.get('/get-group-transactions/:id', verifyJWT, getGroupTransactions);

export default router;

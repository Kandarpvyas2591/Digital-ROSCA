import { Router } from "express";
import { createTransaction, getAllTransactions, getGroupTransactions, getTransactionById, getUserTransactions } from "../controllers/transaction.controller.js";

const router = Router();

router.post("/create-transaction", createTransaction);

router.get("/get-all-transactions", getAllTransactions);

router.get("/get-transaction/:id", getTransactionById);

router.get("/get-user-transactions/:id", getUserTransactions);

router.get("/get-group-transactions/:id", getGroupTransactions);

export default router;
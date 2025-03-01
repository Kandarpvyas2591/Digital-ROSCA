import express from 'express';
import { createLoanOffer } from '../controllers/loanOffer.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/createLoan').post(
  verifyJWT, // Ensure user is authenticated
  upload.fields([{ name: 'aadharCard' }, { name: 'incomeCertificate' }]), // Handle file uploads for requests
  createLoanOffer
);

export default router;

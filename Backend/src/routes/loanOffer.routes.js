import express from 'express';
import {
  createLoanOffer,
  getAllLoanOffers,
  getLoanOfferById,
  updateLoanOfferStatus,
  deleteLoanOffer,
} from '../controllers/loanOffer.controller.js';
import { createLoanAgreement } from '../controllers/loanAgreement.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/createLoan').post(
  verifyJWT, // Ensure user is authenticated
  upload.fields([{ name: 'aadharCard' }, { name: 'incomeCertificate' }]), // Handle file uploads for requests
  createLoanOffer
);

router.route('/getAllLoanOffer').get(verifyJWT, getAllLoanOffers);
router.route('/loanOffer/:id').get(verifyJWT, getLoanOfferById);
router.route('/loanStatus/:id').patch(verifyJWT, updateLoanOfferStatus);
router.route('/deleteLoanOffer/:id').delete(verifyJWT, deleteLoanOffer);
router.route('/loanAgreement/:id').post(
  verifyJWT,
  upload.fields([{ name: 'aadharCard' }, { name: 'incomeCertificate' }]), // Only needed if loan type is "offer"
  createLoanAgreement
);
export default router;

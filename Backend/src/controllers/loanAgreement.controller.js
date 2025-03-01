import { LoanAgreement } from '../models/loanAgreement.model.js';
import { LoanOffer } from '../models/loanOffer.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// 🔹 CREATE LOAN AGREEMENT (Handles Document Upload for Borrower)
export const createLoanAgreement = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Loan Offer ID from URL
  const borrowerId = req.user.id; // Borrower is the logged-in user
  //   console.log(loanOfferId);
  console.log(borrowerId);

  // Fetch Loan Offer
  const loanOffer = await LoanOffer.findById(id);
  console.log(loanOffer);

  if (!loanOffer) {
    return next(new ApiError(404, 'Loan Offer not found'));
  }

  if (!loanOffer.acceptedBy) {
    return next(new ApiError(400, 'Loan Offer has not been accepted yet.'));
  }
  console.log(loanOffer.acceptedBy);

  // Ensure Only Borrower Can Accept the Offer
  if (loanOffer.acceptedBy?.toString() !== borrowerId.toString()) {
    console.log(loanOffer.acceptedBy);
    return next(
      new ApiError(403, 'You are not authorized to create this agreement')
    );
  }

  let uploadedDocuments = loanOffer.uploadedDocuments || [];

  // 🔹 If `LoanOffer.type === 'request'`, use documents already uploaded in `LoanOffer`
  if (loanOffer.type === 'request' && loanOffer.uploadedDocuments) {
    uploadedDocuments = loanOffer.uploadedDocuments;
  }

  // 🔹 If `LoanOffer.type === 'offer'`, borrower must upload the documents
  else if (loanOffer.type === 'offer') {
    if (!req.files?.aadharCard || !req.files?.incomeCertificate) {
      return next(
        new ApiError(
          400,
          'Aadhar Card and Income Certificate are required for borrowers.'
        )
      );
    }

    // Upload Aadhar Card
    const aadharCardBuffer = req.files.aadharCard[0].buffer;
    const aadharCardUpload = await uploadOnCloudinary(
      aadharCardBuffer,
      'loan_documents'
    );
    if (!aadharCardUpload) {
      return next(new ApiError(500, 'Failed to upload Aadhar card'));
    }
    uploadedDocuments.push(aadharCardUpload.secure_url);

    // Upload Income Certificate
    const incomeCertificateBuffer = req.files.incomeCertificate[0].buffer;
    const incomeCertificateUpload = await uploadOnCloudinary(
      incomeCertificateBuffer,
      'loan_documents'
    );
    if (!incomeCertificateUpload) {
      return next(new ApiError(500, 'Failed to upload Income Certificate'));
    }
    uploadedDocuments.push(incomeCertificateUpload.secure_url);
  } else {
    return next(new ApiError(400, 'Uploaded documents are missing.'));
  }

  // Calculate Amount With Interest
  const amountWithInterest =
    loanOffer.amount + (loanOffer.amount * loanOffer.interestRate) / 100;

  // Calculate Monthly Payment
  const monthlyPayment = amountWithInterest / loanOffer.duration;

  // Create Loan Agreement
  const newLoanAgreement = new LoanAgreement({
    loanOffer: id,
    borrower: borrowerId,
    lenderType: loanOffer.lenderType,
    // lender: loanOffer.lender,
    amount: loanOffer.amount,
    interestRate: loanOffer.interestRate,
    duration: loanOffer.duration,
    amountwithInterest: amountWithInterest,
    monthlyPayment: monthlyPayment,
    // amountLeft: amountWithInterest,
    requiredDocuments: ['Aadhar Card', 'Income Certificate'], // Always required for borrower
    uploadedDocuments,
    startDate: new Date(),
    endDate: new Date(
      new Date().setMonth(new Date().getMonth() + loanOffer.duration)
    ),
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  await newLoanAgreement.save();

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newLoanAgreement,
        'Loan agreement created successfully'
      )
    );
});

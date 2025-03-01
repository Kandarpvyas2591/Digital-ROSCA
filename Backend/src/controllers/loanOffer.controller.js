import { LoanOffer } from '../models/loanOffer.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
export const getAllLoanOffers = asyncHandler(async (req, res) => {
  const loanOffers = await LoanOffer.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(
      new ApiResponse(200, loanOffers, 'All loan offers retrieved successfully')
    );
});

export const createLoanOffer = asyncHandler(async (req, res, next) => {
  const {
    type,
    offeredBy,
    lenderType,
    amount,
    interestRate,
    duration,
    expiryDate,
    reason,
  } = req.body;

  // Ensure valid type
  if (!type || !['offer', 'request'].includes(type)) {
    return next(
      new ApiError(400, "Invalid type. Must be 'offer' or 'request'.")
    );
  }

  // Validate common required fields
  if (
    !offeredBy ||
    !lenderType ||
    !amount ||
    !interestRate ||
    !duration ||
    !expiryDate
  ) {
    return next(new ApiError(400, 'All required fields must be filled.'));
  }

  if (lenderType !== 'User' && lenderType !== 'ROSCAGroup') {
    return next(new ApiError(400, 'Invalid lender type.'));
  }

  let uploadedDocuments = {};

  // If type is "request", ensure reason & document uploads are provided
  if (type === 'request') {
    if (!reason) {
      return next(new ApiError(400, 'Reason is required for loan requests.'));
    }

    // Validate required documents
    if (!req.files?.aadharCard || !req.files?.incomeCertificate) {
      return next(
        new ApiError(
          400,
          'Both Aadhar card and Income Certificate are required.'
        )
      );
    }

    // Upload Aadhaar Card
    const aadharCardBuffer = req.files.aadharCard[0].buffer;
    const aadharCardUpload = await uploadOnCloudinary(
      aadharCardBuffer,
      'loan_documents'
    );
    if (!aadharCardUpload) {
      return next(new ApiError(500, 'Failed to upload Aadhar card.'));
    }

    // Upload Income Certificate
    const incomeCertificateBuffer = req.files.incomeCertificate[0].buffer;
    const incomeCertificateUpload = await uploadOnCloudinary(
      incomeCertificateBuffer,
      'loan_documents'
    );
    if (!incomeCertificateUpload) {
      return next(new ApiError(500, 'Failed to upload Income Certificate.'));
    }

    uploadedDocuments = {
      'Aadhar card': aadharCardUpload.secure_url,
      'Income Certificate': incomeCertificateUpload.secure_url,
    };
  }

  // Create the loan offer/request
  const newLoanOffer = new LoanOffer({
    type,
    offeredBy,
    lenderType,
    amount,
    interestRate,
    duration,
    expiryDate,
    reason: type === 'request' ? reason : undefined,
    requiredDocuments:
      type === 'request' ? ['Aadhar card', 'Income Certificate'] : undefined,
    uploadedDocuments: type === 'request' ? uploadedDocuments : undefined,
  });

  await newLoanOffer.save();

  res.status(201).json({
    message: `Loan ${type} created successfully`,
    loanOffer: newLoanOffer,
  });
});

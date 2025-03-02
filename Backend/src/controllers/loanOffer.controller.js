import { LoanOffer } from '../models/loanOffer.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { log } from 'console';

export const getAllLoanOffers = asyncHandler(async (req, res) => {
  const loanOffers = await LoanOffer.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(
      new ApiResponse(200, loanOffers, 'All loan offers retrieved successfully')
    );
});

export const getLoanOfferById = asyncHandler(async (req, res, next) => {
  const loanOffer = await LoanOffer.findById(req.params.id);
  if (!loanOffer) {
    return next(new ApiError(404, 'Loan offer not found'));
  }
  res
    .status(200)
    .json(new ApiResponse(200, loanOffer, 'Loan offer retrieved successfully'));
});

export const createLoanOffer = asyncHandler(async (req, res, next) => {
  const {
    type,
    offeredBy,
    lenderType,
    lender,
    amount,
    interestRate,
    duration,
    expiryDate,
    reason,
  } = req.body;
  const userId = req.user._id;

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

  let assignedLender = userId;

  if (lenderType !== 'User' && lenderType !== 'ROSCAGroup') {
    return next(new ApiError(400, 'Invalid lender type.'));
  }

  let uploadedDocuments = [];

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
    uploadedDocuments.push(aadharCardUpload.secure_url);

    // Upload Income Certificate
    const incomeCertificateBuffer = req.files.incomeCertificate[0].buffer;
    const incomeCertificateUpload = await uploadOnCloudinary(
      incomeCertificateBuffer,
      'loan_documents'
    );
    if (!incomeCertificateUpload) {
      return next(new ApiError(500, 'Failed to upload Income Certificate.'));
    }
    uploadedDocuments.push(incomeCertificateUpload.secure_url);
  }

  // Create the loan offer/request
  const newLoanOffer = new LoanOffer({
    type,
    offeredBy,
    lenderType,
    lender: assignedLender,
    amount,
    interestRate,
    duration,
    expiryDate,
    reason: type === 'request' ? reason : undefined,
    requiredDocuments:
      type === 'request' ? ['Aadhar Card', 'Income Certificate'] : undefined,
    uploadedDocuments: type === 'request' ? uploadedDocuments : undefined,
  });

  await newLoanOffer.save();

  res.status(201).json({
    message: `Loan ${type} created successfully`,
    loanOffer: newLoanOffer,
  });
});

export const updateLoanOffer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { amount, interestRate, expiryDate } = req.body;
  const userId = req.user._id;

  // ✅ Find the Loan Offer and Populate Lender
  const loanOffer = await LoanOffer.findById(id)
    .populate({
      path: 'lender',
    })
    .populate({
      path: 'lender.admin',
      select: '_id email',
    }); // ✅ Get admin ID if lender is ROSCAGroup

  if (!loanOffer) {
    return next(new ApiError(404, 'Loan offer not found'));
  }

  // ✅ Ensure Loan is Still Active (Not Accepted)
  if (loanOffer.status !== 'active') {
    return next(
      new ApiError(
        400,
        'Cannot update loan offer after it has been accepted or expired.'
      )
    );
  }

  // ✅ Check if Requesting User is the Creator
  const isCreator =
    (loanOffer.lenderType === 'User' &&
      loanOffer.lender?._id?.toString() === userId.toString()) ||
    (loanOffer.lenderType === 'ROSCAGroup' &&
      loanOffer.lender?.admin?._id?.toString() === userId.toString());

  console.log(loanOffer.lender?._id);
  console.log(loanOffer.lender?.admin);
  if (!isCreator) {
    return next(
      new ApiError(403, 'You are not authorized to update this loan offer.')
    );
  }

  // ✅ Perform Update
  const updatedLoanOffer = await LoanOffer.findByIdAndUpdate(
    id,
    { amount, interestRate, expiryDate },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedLoanOffer, 'Loan offer updated successfully.')
    );
});

export const updateLoanOfferStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  const loanOffer = await LoanOffer.findById(id);
  if (!loanOffer) {
    return next(new ApiError(404, 'Loan offer not found'));
  }

  console.log('🔹 Before Update - Loan Offer:', loanOffer);
  console.log('🔹 User ID (Borrower):', userId);
  console.log('🔹 Requested Status:', status);

  if (!['active', 'expired', 'accepted', 'declined'].includes(status)) {
    return next(new ApiError(400, 'Invalid status update'));
  }

  if (status === 'accepted') {
    if (loanOffer.status !== 'active') {
      return next(
        new ApiError(400, 'Only active loan offers can be accepted.')
      );
    }

    if (loanOffer.acceptedBy) {
      return next(
        new ApiError(400, 'Loan offer is already accepted by another user.')
      );
    }

    loanOffer.acceptedBy = userId;
    loanOffer.acceptedDate = new Date();
  }

  loanOffer.status = status;
  await loanOffer.save({ validateBeforeSave: false });

  const updatedLoanOffer = await LoanOffer.findById(id);
  console.log('🔹 After Update - Loan Offer:', updatedLoanOffer);

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedLoanOffer, `Loan status updated to ${status}`)
    );
});

export const deleteLoanOffer = asyncHandler(async (req, res, next) => {
  const loanOffer = await LoanOffer.findById(req.params.id);

  if (!loanOffer) {
    return next(new ApiError(404, 'Loan offer not found'));
  }

  let isAuthorized = false;

  if (loanOffer.offeredBy === 'individual-user') {
    // Fetch the creator's username from the User model
    const user = await User.findById(loanOffer.lender).select('username');

    if (user && user.username === req.user.username) {
      isAuthorized = true;
    }
  } else if (loanOffer.offeredBy === 'rosca-group') {
    // Fetch the ROSCA group name from the ROSCAGroup model
    const group = await ROSCAGroup.findById(loanOffer.lender).select('name');

    if (group && group.admin.toString() === req.user._id.toString()) {
      isAuthorized = true;
    }
  }

  // If the user is not authorized, return an error
  if (!isAuthorized) {
    return next(
      new ApiError(403, 'You are not authorized to delete this loan offer')
    );
  }

  await LoanOffer.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Loan offer deleted successfully'));
});

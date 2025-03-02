import { LoanOffer } from '../models/loanOffer.model.js';
import { ROSCAGroup } from '../models/roscaGroup.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const verifyLoanCreator = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Loan Offer ID from URL
  const userId = req.user._id; // Logged-in user

  // ✅ Fetch Loan Offer
  const loanOffer = await LoanOffer.findById(id);
  if (!loanOffer) {
    return next(new ApiError(404, 'Loan offer not found.'));
  }

  let isCreator = false;

  if (loanOffer.lenderType === 'User') {
    // ✅ If lender is a User, check if it matches the logged-in user
    isCreator = loanOffer.lender?.toString() === userId?.toString();
  } else if (loanOffer.lenderType === 'ROSCAGroup') {
    // ✅ If lender is a ROSCAGroup, check if the logged-in user is the admin
    const lenderGroup = await ROSCAGroup.findById(loanOffer.lender).populate(
      'admin'
    );
    isCreator = lenderGroup?.admin?._id?.toString() === userId?.toString();
  }

  // ✅ If user is not the creator, deny access
  if (!isCreator) {
    return next(
      new ApiError(403, 'You are not authorized to perform this action.')
    );
  }

  // ✅ If authorized, proceed to the next middleware/controller
  next();
});

import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = catchAsync(async (requestAnimationFrame, res) => {
  res.status(200).json({
    message: 'ok',
  });
});
export { registerUser };

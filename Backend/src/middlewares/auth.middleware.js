import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
// const { jwt } = pkg;
import { User } from '../models/user.model.js';
//no res, then _
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );
    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access Token ');
  }
});

export const verifyAdmin = asyncHandler(async (req, _, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized request');
  }
  next();
});

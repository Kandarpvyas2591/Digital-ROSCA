import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, PANNumber, mobileNumber } = req.body;
  // if (
  //   [email, username, password, PANNumber, mobileNumber].some(
  //     (field) => field?.trim() === ''
  //   )
  // ) {
  //   throw new ApiError(400, 'All fields are required');
  // }

  const existedUser = await User.findOne({
    $or: [{ email }, { mobileNumber }],
  });

  if (existedUser) {
    const conflictField =
      existedUser.email === email ? 'Email' : 'Mobile Number';
    throw new ApiError(409, `User with ${conflictField} already exists`);
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    PANNumber,
    mobileNumber,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the User');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User Registered Successfully'));
});

//loginController
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, 'Username or Email is required');
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: false,
    secure: true,
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged In Successfully'
      )
    );
});

//logoutController
const logoutUser = asyncHandler(async (req, res) => {
  //remove cookie
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200), {}, 'User logged out Successfully');
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password -refreshToken')
    .populate('joinedGroups');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, 'User details fetched successfully'));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Invalid old password');
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed successfully'));
});

const updateUser = asyncHandler(async (req, res) => {
  const { email, username, mobileNumber } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new ApiError(409, 'Email is already taken');
    }
    user.email = email.toLowerCase();
  }

  if (username) user.username = username.toLowerCase();
  if (mobileNumber) user.mobileNumber = mobileNumber;

  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, user, 'User updated successfully'));
});

const checkPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json(new ApiError(400, 'Password not provided'));
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json(new ApiError(404, 'User not found'));
    }

    if (!user.password) {
      return res
        .status(500)
        .json(new ApiError(500, 'User password is missing'));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json(new ApiError('Invalid password', 400));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Password is correct'));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getMe,
  updateUser,
  checkPassword,
};

import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid Email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    PANNumber: {
      type: String,
      // unique: true,
      trim: true,
      minlength: [10, 'PAN Number must be 10 characters long'],
      maxlength: [10, 'PAN Number must be 10 characters long'],
      sparse: true,
    },
    refreshToken: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [10, 'Mobile Number must be 10 characters long'],
      maxlength: [10, 'Mobile Number must be 10 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    reputationScore: {
      type: Number,
      required: true,
      default: 50,
    },
    joinedGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ROSCAGroup',
      },
    ],
    createdGroup: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ROSCAGroup',
      },
    ],
    timelyRepayments: {
      type: Number,
      default: 0,
    },
    missedPayments: {
      type: Number,
      default: 0,
    },
    walletAmount: {
      type: Number,
      default: 5000,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userSchema);

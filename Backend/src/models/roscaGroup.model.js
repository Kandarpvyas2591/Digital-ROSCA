import { model, Schema } from 'mongoose';

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cycleDuration: {
      type: Number, // in months
      required: true,
      default: 1
    },
    contributionAmount: {
      type: Number,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    cycleStartDate: {
      type: Date,
      // required: true,
    },
    cycleEndDate: {
      type: Date,
      // required: true,
    },
    cycleNumber: {
      type: Number,
      // required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const ROSCAGroup = model('ROSCAGroup', groupSchema);

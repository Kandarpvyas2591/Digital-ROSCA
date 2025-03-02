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
      // default: 1,
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
      default: 0,
      // required: true,
    },
    cycleDues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    walletAmount: {
      type: Number,
      // required: true,
      default: 0,
    },
    groupType: {
      type: String,
      enum: ['normal', 'lender'],
      required: true,
    },
    registrationDeadline: {
      type: Date,
      // required: true,
    },
    maxMembers: {
      type: Number,
      required: true,
    },
    payoutAmount: {
      type: Number,
    }
  },
  { timestamps: true }
);

export const ROSCAGroup = model('ROSCAGroup', groupSchema);

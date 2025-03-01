import { model, Schema } from 'mongoose';

const loanOfferSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'completed', 'declined'],
      default: 'active',
    },
    type: {
      type: String,
      enum: ['offer', 'request'],
      required: true,
    },
    acceptedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    requiredDocuments: [
      {
        type: String,
        enum: ['ID Proof', 'Income Proof', 'Collateral Proof', 'Agreement'],
      },
    ],
    acceptedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const LoanOffer = model('LoanOffer', loanOfferSchema);

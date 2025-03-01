import { model, Schema } from 'mongoose';

const loanOfferSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['offer', 'request'],
      required: true,
    },
    senderType: { type: String, enum: ["User", "ROSCAGroup"], required: true }, // Indicates if sender is a user or a group
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType",
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

import { model, Schema } from 'mongoose';

const loanOfferSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['offer', 'request'],
      // required: true,
    },
    offeredBy: {
      type: String,
      // enum: ['rosca-group', 'individual-user'],
      required: true,
    },
    lenderType: { type: String, enum: ['User', 'ROSCAGroup'], required: true }, // Indicates if sender is a user or a group
    lender: {
      type: Schema.Types.ObjectId,
      refPath: 'lenderType',
      // required: true,
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
      type: Number, //months , loan is valid until in month
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
        enum: [
          'Aadhar card',
          'Income Certificate',
          // 'Collateral Proof',
          //  'Agreement'
        ],
      },
    ],
    acceptedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const LoanOffer = model('LoanOffer', loanOfferSchema);

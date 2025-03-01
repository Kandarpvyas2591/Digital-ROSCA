import { model, Schema } from 'mongoose';

const loanOfferSchema = new Schema(
  {
    offeredBy: {
      type: String,
      enum: ['rosca-group', 'individual-user'],
      required: true,
    },
    lenderUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    lenderGroup: {
      type: Schema.Types.ObjectId,
      ref: 'ROSCAGroup',
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
    type: {
      type: String,
      enum: ['offer', 'request'],
      required: true,
    },
    acceptedByUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    acceptedByGroup: {
      type: Schema.Types.ObjectId,
      ref: 'ROSCAGroup',
    },

    requiredDocuments: [
      {
        type: String,
        enum: [
          'ID Proof',
          'Income Proof',
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

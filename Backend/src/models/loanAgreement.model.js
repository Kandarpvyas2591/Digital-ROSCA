import { model, Schema } from 'mongoose';
import { type } from 'os';

const loanAgreementSchema = new Schema(
  {
    loanOffer: {
      type: Schema.Types.ObjectId,
      ref: 'LoanOffer',
      required: true,
    },
    borrower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    lenderType: { type: String, enum: ['User', 'ROSCAGroup'], required: true }, // Indicates if sender is a user or a group
    lender: {
      type: Schema.Types.ObjectId,
      refPath: 'lenderType',
      // required: true,
    },
    amount: {
      type: Number,
      // required: true,
    },
    interestRate: {
      type: Number,
      // required: true,
    },
    duration: {
      type: Number, // in months
      // required: true,
    },
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'repaid'],
      default: 'requested',
    },
    amountwithInterest: {
      type: Number,
    },
    monthlyPayment: {
      type: Number,
    },
    requiredDocuments: [
      {
        type: String,
        enum: ['Aadhar Card', 'Income Certificate'],
        required: true,
      },
    ],
    verificationReason: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const LoanAgreement = model('LoanAgreement', loanAgreementSchema);

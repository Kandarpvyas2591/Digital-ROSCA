import { model, Schema } from 'mongoose';

const loanAgreementSchema = new Schema(
  {
    borrower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lenderType: { type: String, enum: ["User", "ROSCAGroup"], required: true }, // Indicates if sender is a user or a group
    lender: {
      type: Schema.Types.ObjectId,
      refPath: "lenderType",
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
      type: Number, // in months
      required: true,
    },
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'repaid'],
      default: 'pending',
    },
    repaidAmount: {
      type: Number,
      default: 0,
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

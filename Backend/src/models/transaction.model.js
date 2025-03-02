import { model, Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['contribution', 'payout', 'loan', 'repayment'],
      required: true,
    },
    senderType: { type: String, enum: ['User', 'ROSCAGroup'], required: true }, // Indicates if sender is a user or a group
    sender: {
      type: Schema.Types.ObjectId,
      refPath: 'senderType',
      required: true,
    },

    receiverType: {
      type: String,
      enum: ['User', 'ROSCAGroup'],
      required: true,
    }, // Indicates if receiver is a user or a group
    receiver: {
      type: Schema.Types.ObjectId,
      refPath: 'receiverType',
      required: true,
    },

    amount: { type: Number, required: true },

    orderId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', transactionSchema);

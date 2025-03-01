import { ROSCAGroup } from '../models/roscaGroup.model.js';
import { Transaction } from '../models/transaction.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import razorpay from 'razorpay';

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createTransaction = asyncHandler(async (req, res) => {
  try {
    const { type, sender, senderType, receiver, receiverType, amount } =
      req.body;

    if (amount <= 0) {
      return res
        .status(400)
        .json(new ApiError('Amount must be greater than 0', null, 400));
    }

    const senderEntity =
      senderType === 'User'
        ? await User.findById(sender)
        : await ROSCAGroup.findById(sender);
    if (!senderEntity) {
      return res.status(404).json(new ApiError());
    }

    const receiverEntity =
      receiverType === 'User'
        ? await User.findById(receiver)
        : await ROSCAGroup.findById(receiver);
    if (!receiverEntity) {
      return res
        .status(404)
        .json({ message: `Receiver (${receiverType}) not found` });
    }

    const newTransaction = new Transaction({
      type,
      senderType,
      sender,
      receiverType,
      receiver,
      amount,
      status: 'pending',
    });

    if (senderEntity.walletAmount < amount) {
      newTransaction.status = 'failed';
      await newTransaction.save();
      return res
        .status(400)
        .json(new ApiError('Insufficient funds', null, 400));
    }

    const options = {
      amount: amount * 100, //in paise
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        return res.json(new ApiError('Error creating order', null, 500));
      }
      senderEntity.walletAmount -= amount;
      receiverEntity.walletAmount += amount;
      newTransaction.status = 'completed';

      await senderEntity.save();
      await receiverEntity.save();
      await newTransaction.save();

      return res.json(
        new ApiResponse(201, order, 'Order created successfully')
      );
    });

    // senderEntity.walletAmount -= amount;
    // receiverEntity.walletAmount += amount;
    // newTransaction.status = 'completed';

    // await senderEntity.save();
    // await receiverEntity.save();
    // await newTransaction.save();

    // return res
    //   .status(201)
    //   .json(
    //     new ApiResponse(
    //       201,
    //       newTransaction,
    //       order,
    //       'Transaction created successfully'
    //     )
    //   );
  } catch (error) {
    console.log(error);
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res
      .status(200)
      .json(new ApiResponse(200, transactions, 'All transactions'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

export const getTransactionById = asyncHandler(async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res
        .status(404)
        .json(new ApiError('Transaction not found', null, 404));

    res
      .status(200)
      .json(new ApiResponse(200, transaction, 'Transaction found'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

export const getUserTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.params.id }, { receiver: req.params.id }],
    }).populate({
      path: 'sender receiver',
      select: 'username name'
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactions, 'User transactions found'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

export const getGroupTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.params.id }, { receiver: req.params.id }],
    }).populate({
      path: 'sender receiver',
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactions, 'Group transactions found'));
  } catch (error) {
    res.status(500).json(new ApiError(error.message, 500, error));
  }
});

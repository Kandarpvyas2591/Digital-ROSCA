import { Transaction } from '../models/transaction.model.js';


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  
  // API TO MAKE PAYMENT FOR CREDITS
  const paymentRazorpay = async (req, res) => {
    try {
      const { clerkId, planId } = req.body;
      const userData = await userModel.findOne({ clerkId });
  
      if (!userData || !planId) {
        return res.json({ success: false, message: "Invalid user or plan" });
      }
  
      let credits, plan, amount, date;
  
      switch (planId) {
        case "Basic":
          plan = "Basic";
          credits = 100;
          amount = 10;
          break;
        case "Advanced":
          plan = "Basic";
          credits = 500;
          amount = 50;
          break;
        case "Business":
          plan = "Basic";
          credits = 1200;
          amount = 100;
          break;
        default:
          break;
      }
      date = Date.now();
  
      // CREATING TRANSACTION
      const transactionData = {
        clerkId,
        plan,
        credits,
        amount,
        date,
      };
  
      const newTransaction = await Transaction.create(transactionData);
  
      const options = {
        amount: amount * 100,
        currency: process.env.CURRENCY,
        receipt: newTransaction._id,
      };
  
      await razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
          return res.json({ success: false, message: "Error creating order" });
        }
        res.json({ success: true, order });
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  // API CONTROLLER FUNCTION TO VERIFY RAZORPAY PAYMENT
  const verifyRazorpayPayment = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
  
      if (orderInfo.status === "paid") {
        const transactionData = await transactionModel.findById(orderInfo.receipt)
        if (transactionData.payment) {
          return res.json({ success: false, message: "Payment failed" })
        }
  
        // ADDING CREDITS IN USER DATA
        const userData = await userModel.findOne({ clerkId: transactionData.clerkId })
        const creditBalance = userData.creditBalance + transactionData.credits
        await userModel.findByIdAndUpdate(userData._id, {creditBalance})
  
        // MAKING THE PAYMENT TRUE
        await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})
        res.json({ success: true, message: "Payment successful and credits added" })
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  }
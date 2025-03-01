import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent (User → ROSCA Group)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (e.g., $10 → 1000)
      currency,
      payment_method_types: ['card'], // Accepts card payments
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Payment processing error', error: error.message });
  }
});

export default router;

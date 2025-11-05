// ...existing code...
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

/**
 * POST /api/stripe/create-payment-intent
 * body: { amount: number (in cents), currency?: string, metadata?: object }
 */
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });

    return res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe createPaymentIntent error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
// ...existing code...
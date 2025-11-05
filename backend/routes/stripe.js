import express from 'express';
import { createPaymentIntent } from '../controllers/stripe.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);

// Optional mock endpoint for UI-only testing (no Stripe keys required)
router.post('/mock-create-payment-intent', (req, res) => {
  // returns a "mock" response so front-end can proceed without a Stripe account
  return res.json({ success: true, clientSecret: 'mock_client_secret', mock: true });
});

export default router;
// Razorpay order creation placeholder — see integrations.md for full implementation

import { createOrder } from '../../../src/lib/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, items, address } = req.body;

  if (!amount || !items?.length || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // --- Razorpay integration goes here (see integrations.md) ---
  // const Razorpay = require('razorpay');
  // const rzp = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET,
  // });
  // const rzpOrder = await rzp.orders.create({
  //   amount: Math.round(amount * 100), // paise
  //   currency: 'INR',
  //   receipt: `receipt_${Date.now()}`,
  // });

  // Placeholder Firestore order record
  try {
    const orderId = await createOrder({
      amount,
      items,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
      // razorpayOrderId: rzpOrder.id,
    });
    return res.status(200).json({ success: true, orderId });
  } catch (err) {
    console.error('[create-order]', err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}

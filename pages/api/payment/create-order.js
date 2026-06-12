import Razorpay from 'razorpay';
import { adminDb } from '../../../src/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, items, address, uid } = req.body;

  if (!amount || !items?.length || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'TRUE';
  const key_id = isProd ? process.env.RAZORPAY_PROD_KEY_ID : process.env.RAZORPAY_TEST_KEY_ID;
  const key_secret = isProd ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_TEST_KEY_SECRET;

  if (!key_id || !key_secret) {
    return res.status(500).json({ error: 'Razorpay keys are not configured properly' });
  }

  const rzp = new Razorpay({ key_id, key_secret });

  try {
    const rzpOrder = await rzp.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    const orderData = {
      uid: uid || 'guest',
      amount,
      items,
      address,
      status: 'pending',
      createdAt: new Date().toISOString(),
      razorpayOrderId: rzpOrder.id,
    };

    const orderRef = await adminDb.collection('orders').add(orderData);

    return res.status(200).json({ 
      success: true, 
      orderId: orderRef.id, 
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      key_id
    });
  } catch (err) {
    console.error('[create-order]', err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}

import crypto from 'crypto';
import { adminDb } from '../../../src/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'TRUE';
  const key_secret = isProd ? process.env.RAZORPAY_PROD_KEY_SECRET : process.env.RAZORPAY_TEST_KEY_SECRET;

  try {
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(text.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update order status in Firestore
      if (orderId) {
        // Fetch order details to send to Delhivery
        const orderDoc = await adminDb.collection('orders').doc(orderId).get();
        const orderData = orderDoc.data();

        // Delhivery Integration
        const delhiveryKey = isProd ? process.env.DELHIVERY_PROD_API_KEY : process.env.DELHIVERY_TEST_API_KEY;
        const delhiveryUrl = isProd ? 'https://track.delhivery.com/api/cmu/create.json' : 'https://staging-express.delhivery.com/api/cmu/create.json';

        let delhiveryAwb = null;
        if (delhiveryKey && orderData) {
          try {
            const country = orderData.address.country || "India";
            const shippingMode = country === "India" ? "Surface" : "Express";

            const payload = `format=json&data={
              "shipments": [{
                "name": "${orderData.address.name}",
                "add": "${orderData.address.address}",
                "pin": "${orderData.address.pincode}",
                "city": "${orderData.address.city}",
                "state": "${orderData.address.state}",
                "country": "${country}",
                "phone": "${orderData.address.phone}",
                "order": "${orderId}",
                "payment_mode": "Prepaid",
                "products_desc": "Tea Blends",
                "cod_amount": 0,
                "weight": 500,
                "shipping_mode": "${shippingMode}"
              }],
              "pickup_location": {
                "name": "Amata Warehouse",
                "add": "Amata Origin, Kolkata",
                "city": "Kolkata",
                "pin": "700001",
                "country": "India",
                "phone": "9876543210"
              }
            }`;

            const response = await fetch(delhiveryUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Token ${delhiveryKey}`
              },
              body: payload
            });

            const result = await response.json();
            if (result.success && result.packages && result.packages.length > 0) {
              delhiveryAwb = result.packages[0].waybill;
            }
          } catch (err) {
            console.error('Delhivery Error:', err);
          }
        }

        await adminDb.collection('orders').doc(orderId).update({
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          delhiveryAwb: delhiveryAwb || 'pending',
          updatedAt: new Date().toISOString(),
        });
      }
      return res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      if (orderId) {
        await adminDb.collection('orders').doc(orderId).update({
          status: 'payment_failed',
          updatedAt: new Date().toISOString(),
        });
      }
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('[verify-payment]', error);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
}

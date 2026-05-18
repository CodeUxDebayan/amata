# Amata — Third-Party Integrations Guide

Placeholder routes and Firebase stubs are already in place. Fill in `.env.local` with real keys, then follow the steps below for each service.

---

## 1. Msg91 — OTP via WhatsApp & Email

**Relevant files**
- `pages/api/auth/send-otp.js`
- `pages/api/auth/verify-otp.js`
- `.env.local` → `MSG91_AUTH_KEY`, `MSG91_TEMPLATE_ID`, `MSG91_WHATSAPP_SENDER`

### Steps

1. **Create a Msg91 account** at https://msg91.com and complete KYC.

2. **Get your Auth Key** from the Msg91 dashboard → Settings → Auth Key. Add it to `.env.local`:
   ```
   MSG91_AUTH_KEY=your_auth_key_here
   ```

3. **WhatsApp OTP**
   - Apply for a WhatsApp Business API sender in the Msg91 dashboard.
   - Once approved, note your `Sender ID` and a pre-approved OTP template ID.
   - Add to `.env.local`:
     ```
     MSG91_WHATSAPP_SENDER=91XXXXXXXXXX
     MSG91_TEMPLATE_ID=your_template_id
     ```
   - Install the SDK: `npm install msg91`
   - In `send-otp.js`, replace the placeholder comment with:
     ```js
     const axios = require('axios');
     // WhatsApp OTP via Msg91 Flow API
     await axios.post('https://api.msg91.com/api/v5/flow/', {
       template_id: process.env.MSG91_TEMPLATE_ID,
       short_url: '0',
       recipients: [{ mobiles: `91${phone}`, otp: generatedOtp }],
     }, { headers: { authkey: process.env.MSG91_AUTH_KEY } });
     ```
   - Store `generatedOtp` in Redis / Firestore keyed by phone with a 10-minute TTL.

4. **Email OTP**
   - Enable Email API in Msg91 → Email Settings.
   - Add your verified sender domain.
   - In `send-otp.js` (email branch):
     ```js
     await axios.post('https://api.msg91.com/api/v5/email/send', {
       to: [{ email }],
       from: { email: 'otp@yourdomain.com', name: 'Amata Brew' },
       subject: 'Your Amata OTP',
       body: `<p>Your one-time code is: <strong>${generatedOtp}</strong></p>`,
     }, { headers: { authkey: process.env.MSG91_AUTH_KEY } });
     ```

5. **Verify OTP** in `verify-otp.js`:
   - Retrieve the stored OTP from Redis / Firestore and compare with `req.body.otp`.
   - On success, use **Firebase Admin SDK** to:
     ```js
     const admin = require('firebase-admin');
     const uid = method === 'whatsapp' ? `phone_${phone}` : `email_${email}`;
     try { await admin.auth().getUser(uid); }
     catch { await admin.auth().createUser({ uid, phoneNumber: `+91${phone}`, email }); }
     const customToken = await admin.auth().createCustomToken(uid);
     return res.status(200).json({ customToken });
     ```
   - On the client (checkout OTP step, after `verifyOtp` succeeds), call:
     ```js
     import { signInWithCustomToken } from 'firebase/auth';
     await signInWithCustomToken(auth, data.customToken);
     ```

6. **Firebase Admin SDK setup** (needed for step 5):
   - Install: `npm install firebase-admin`
   - Download your service account JSON from Firebase Console → Project Settings → Service Accounts.
   - Initialise once in `src/lib/firebaseAdmin.js`:
     ```js
     import admin from 'firebase-admin';
     if (!admin.apps.length) {
       admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
     }
     export default admin;
     ```
   - Add the service account JSON (minified, one line) to `.env.local`:
     ```
     FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
     ```

---

## 2. Razorpay — Payment Gateway

**Relevant files**
- `pages/api/payment/create-order.js`
- `pages/checkout.js` (handleRazorpay function)
- `.env.local` → `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`

> **Security note**: `RAZORPAY_KEY_SECRET` is used server-side only and is never sent to the browser. Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` is exposed to the client.

### Steps

1. **Create a Razorpay account** at https://razorpay.com and complete KYC.

2. **Get API keys** from Dashboard → Settings → API Keys → Generate Key.
   Add to `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_live_XXXX
   RAZORPAY_KEY_SECRET=your_secret_here
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXX
   ```
   Use `rzp_test_XXXX` keys during development.

3. **Install the SDK**: `npm install razorpay`

4. **Server: create a Razorpay order** in `pages/api/payment/create-order.js` — uncomment the Razorpay block:
   ```js
   const Razorpay = require('razorpay');
   const rzp = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
   const rzpOrder = await rzp.orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt: `rcpt_${Date.now()}` });
   ```
   Return `rzpOrder.id` along with `orderId` from Firestore.

5. **Client: open Razorpay Checkout** in `pages/checkout.js` — replace the `setOrderPlaced(true)` placeholder:
   ```js
   const script = document.createElement('script');
   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
   document.body.appendChild(script);
   script.onload = () => {
     const rzp = new window.Razorpay({
       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
       amount: Math.round(total * 100),
       currency: 'INR',
       name: 'Amata Brew',
       order_id: data.razorpayOrderId,
       prefill: { name: form.name, email: form.email, contact: form.phone },
       handler: async (response) => {
         await fetch('/api/payment/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ razorpay_payment_id: response.razorpay_payment_id,
             razorpay_order_id: response.razorpay_order_id,
             razorpay_signature: response.razorpay_signature,
             orderId: data.orderId }) });
         setOrderPlaced(true);
         clearCart();
       },
     });
     rzp.open();
   };
   ```

6. **Create `pages/api/payment/verify.js`** to validate the HMAC signature server-side:
   ```js
   import crypto from 'crypto';
   import { updateOrderStatus } from '../../../src/lib/firestore';
   export default async function handler(req, res) {
     const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
     const body = razorpay_order_id + '|' + razorpay_payment_id;
     const expectedSig = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
     if (expectedSig !== razorpay_signature) return res.status(400).json({ error: 'Invalid signature' });
     await updateOrderStatus(orderId, 'paid', { razorpay_payment_id, razorpay_order_id });
     return res.status(200).json({ success: true });
   }
   ```

7. **Webhooks** (optional but recommended): set up a Razorpay webhook pointing to `/api/payment/webhook` to handle payment failures and refunds asynchronously.

---

## 3. DHL — Shipping & Delivery

**Relevant files**
- `src/lib/firestore.js` → `createOrder` (add `shippingTrackingId` field)
- `.env.local` → `DHL_API_KEY`, `DHL_API_SECRET`, `DHL_ENV`

### Steps

1. **Register** at https://developer.dhl.com and create an application to get API credentials.
   Set `DHL_ENV=sandbox` for testing, `DHL_ENV=production` for live.
   ```
   DHL_API_KEY=your_key
   DHL_API_SECRET=your_secret
   DHL_ENV=sandbox
   ```

2. **Install axios** (already usable via fetch, or `npm install axios`).

3. **Create a shipment** — add `pages/api/shipping/create-shipment.js`:
   ```js
   // POST after Razorpay payment is verified
   const baseUrl = process.env.DHL_ENV === 'production'
     ? 'https://express.api.dhl.com'
     : 'https://express.api.dhl.com/mydhlapi/test';

   const response = await fetch(`${baseUrl}/shipments`, {
     method: 'POST',
     headers: {
       'Authorization': 'Basic ' + Buffer.from(`${process.env.DHL_API_KEY}:${process.env.DHL_API_SECRET}`).toString('base64'),
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       plannedShippingDateAndTime: new Date().toISOString(),
       pickup: { isRequested: false },
       productCode: 'P',  // DHL Express Worldwide
       accounts: [{ typeCode: 'shipper', number: 'YOUR_ACCOUNT_NUMBER' }],
       shipper: {
         name: 'Amata Brew',
         phone: '+910000000000',
         postalAddress: { addressLine1: 'Your warehouse address', cityName: 'Mumbai', postalCode: '400001', countryCode: 'IN' },
       },
       recipients: [{
         name: address.name,
         phone: address.phone,
         postalAddress: { addressLine1: address.address, cityName: address.city, postalCode: address.pincode, countryCode: 'IN' },
       }],
       packages: [{ weight: { netValue: 0.5, grossValue: 0.6 }, dimensions: { length: 20, width: 15, height: 10 } }],
       valueAddedServices: [{ serviceCode: 'II', localServiceCode: 'II', value: totalValue, currency: 'INR' }],
     }),
   });
   const shipment = await response.json();
   // shipment.shipmentTrackingNumber → store in Firestore
   ```

4. **Track a shipment** — add `pages/api/shipping/track.js`:
   ```js
   const trackingNumber = req.query.id;
   const response = await fetch(`${baseUrl}/tracking?shipmentTrackingNumber=${trackingNumber}`, {
     headers: { 'Authorization': 'Basic ...' },
   });
   ```

5. **Store the tracking number** in Firestore via `updateOrderStatus(orderId, 'shipped', { trackingId })` once the shipment is created.

6. **Notify the customer**: send a WhatsApp or email message via Msg91 with the DHL tracking link: `https://www.dhl.com/in-en/home/tracking.html?tracking-id=${trackingNumber}`

---

## Environment Variables Summary

```
# Firebase (client)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase (server — Admin SDK)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXX
RAZORPAY_KEY_ID=rzp_live_XXXX
RAZORPAY_KEY_SECRET=

# Msg91
MSG91_AUTH_KEY=
MSG91_TEMPLATE_ID=
MSG91_WHATSAPP_SENDER=

# DHL
DHL_API_KEY=
DHL_API_SECRET=
DHL_ENV=sandbox
```

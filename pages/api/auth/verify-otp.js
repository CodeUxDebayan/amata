// Msg91 OTP verify + Firebase Auth silent sign-in placeholder — see integrations.md

import { auth, db } from '../../../src/lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { upsertUser } from '../../../src/lib/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { method, phone, email, otp } = req.body;

  if (!otp) return res.status(400).json({ error: 'OTP is required' });

  // --- Msg91 OTP verification goes here (see integrations.md) ---
  // const verified = await msg91.verifyOtp({ method, phone, email, otp });
  // if (!verified) return res.status(401).json({ error: 'Invalid OTP' });

  // Placeholder: accept any 6-digit code in dev
  if (otp.length !== 6) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  // --- Firebase Admin SDK: create/fetch user and mint custom token ---
  // import { getAuth } from 'firebase-admin/auth';
  // const uid = `phone_${phone}` or `email_${email}`;
  // await getAuth().createUser({ uid, phoneNumber: phone, email }) — or getUser
  // const customToken = await getAuth().createCustomToken(uid);
  // return res.status(200).json({ customToken });

  console.log(`[verify-otp] method=${method} otp=${otp}`);
  return res.status(200).json({ success: true });
}

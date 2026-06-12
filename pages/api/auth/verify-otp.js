import { adminAuth } from '../../../src/lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { method, phone, email, otp, name } = req.body;

  if (!otp) return res.status(400).json({ error: 'OTP is required' });

  // --- Msg91 OTP verification goes here (placeholder for now) ---
  // const verified = await msg91.verifyOtp({ method, phone, email, otp });
  // if (!verified) return res.status(401).json({ error: 'Invalid OTP' });

  // Placeholder: accept any 6-digit code in dev
  if (otp.length !== 6) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  try {
    let uid = '';
    
    if (method === 'whatsapp' || method === 'sms') {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      try {
        const userRecord = await adminAuth.getUserByPhoneNumber(formattedPhone);
        uid = userRecord.uid;
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          const userRecord = await adminAuth.createUser({
            phoneNumber: formattedPhone,
            displayName: name,
          });
          uid = userRecord.uid;
        } else {
          throw error;
        }
      }
    } else if (method === 'email') {
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        uid = userRecord.uid;
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          const userRecord = await adminAuth.createUser({
            email,
            displayName: name,
          });
          uid = userRecord.uid;
        } else {
          throw error;
        }
      }
    }

    if (!uid) {
      return res.status(400).json({ error: 'Failed to identify user' });
    }

    const customToken = await adminAuth.createCustomToken(uid);
    return res.status(200).json({ customToken });
  } catch (err) {
    console.error('OTP verify error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

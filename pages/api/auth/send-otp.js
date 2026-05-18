// Msg91 OTP send placeholder — see integrations.md for full implementation
// Supports method: 'whatsapp' | 'email'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { method, phone, email } = req.body;

  if (!method || (method === 'whatsapp' && !phone) || (method === 'email' && !email)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // --- Msg91 integration goes here (see integrations.md) ---
  // const msg91 = require('msg91');
  // if (method === 'whatsapp') { await msg91.sendWhatsAppOtp(phone); }
  // if (method === 'email')    { await msg91.sendEmailOtp(email); }

  // Placeholder: always succeeds in dev
  console.log(`[send-otp] method=${method} phone=${phone} email=${email}`);
  return res.status(200).json({ success: true });
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, from_name, from_email, body } = req.body || {};

  if (!to || !body || !from_email) {
    return res.status(400).json({ error: 'to, body, and from_email are required' });
  }

  const personalizedBody = String(body)
    .replace(/\{firstName\}/g, 'Test')
    .replace(/\{lastName\}/g, 'User')
    .replace(/\{email\}/g, to);

  const testBanner = `<div style="background:#FFF7E6;border:1px solid #FBBF24;padding:12px 16px;font-family:Arial,sans-serif;font-size:12px;color:#92400E;max-width:600px;margin:0 auto 16px;">
  <strong>TEST EMAIL</strong> — This is a preview. Personalization tokens replaced with sample values.
</div>`;

  try {
    const result = await resend.emails.send({
      from: `${from_name || 'Concierge Nurse Business Society'} <${from_email}>`,
      to,
      subject: `[TEST] ${subject || 'Campaign preview'}`,
      html: testBanner + personalizedBody,
    });

    if (result.error) {
      return res.status(500).json({ error: result.error.message || 'Resend error' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}

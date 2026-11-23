const nodemailer = require('nodemailer');

// Preferred: Resend HTTPS API (reliable from serverless hosts).
async function sendViaResend({ subject, text, replyTo }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const to = process.env.NOTIFY_TO.split(',').map((s) => s.trim()).filter(Boolean);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `BMC Website <${from}>`,
      to,
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${body}`);
  console.log('[mailer] sent via Resend:', body);
}

// Fallback: SMTP (Gmail / Zoho / ...).
async function sendViaSmtp({ subject, text, replyTo }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const info = await transporter.sendMail({
    from: `"BMC Website" <${SMTP_USER}>`,
    to: NOTIFY_TO,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text,
  });
  console.log('[mailer] sent via SMTP:', info.messageId, 'accepted:', info.accepted.join(','), 'rejected:', info.rejected.join(','));
}

// Never throws: a mail failure must not break saving the record.
async function sendMail(data) {
  if (!process.env.NOTIFY_TO) {
    console.log('[mailer] NOTIFY_TO missing, skipping notification');
    return;
  }
  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(data);
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendViaSmtp(data);
    } else {
      console.log('[mailer] no RESEND_API_KEY and SMTP not configured, skipping');
    }
  } catch (err) {
    console.error('[mailer] failed:', err.code || '', err.message);
  }
}

function notifyNewMessage({ name, email, message }) {
  return sendMail({
    subject: `رسالة جديدة من ${name}`,
    text: `الاسم: ${name}\nالإيميل: ${email}\n\n${message}`,
    replyTo: email,
  });
}

function notifyNewOrder({ name, phone, service, details, extra, fields }) {
  const fieldLines = fields && typeof fields === 'object'
    ? Object.entries(fields)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join('\n')
    : '';
  const parts = [
    `الاسم: ${name}`,
    `الجوال: ${phone}`,
    `الخدمة: ${service}`,
    '',
    `التفاصيل:\n${details}`,
  ];
  if (extra) parts.push('', `معلومات إضافية:\n${extra}`);
  if (fieldLines) parts.push('', `حقول الخدمة:\n${fieldLines}`);
  return sendMail({
    subject: `طلب خدمة جديد: ${service} - ${name}`,
    text: parts.join('\n'),
  });
}

module.exports = { notifyNewMessage, notifyNewOrder };

const nodemailer = require('nodemailer');

function buildMail({ name, email, message }) {
  return {
    subject: `رسالة جديدة من ${name}`,
    text: `الاسم: ${name}\nالإيميل: ${email}\n\n${message}`,
  };
}

// Preferred: Resend HTTPS API (reliable from serverless hosts).
async function sendViaResend({ name, email, message }) {
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
      reply_to: email,
      ...buildMail({ name, email, message }),
    }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${body}`);
  console.log('[mailer] sent via Resend:', body);
}

// Fallback: SMTP (Gmail / Zoho / ...).
async function sendViaSmtp({ name, email, message }) {
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
    replyTo: email,
    ...buildMail({ name, email, message }),
  });
  console.log('[mailer] sent via SMTP:', info.messageId, 'accepted:', info.accepted.join(','), 'rejected:', info.rejected.join(','));
}

// Never throws: a mail failure must not break saving the message.
async function notifyNewMessage(data) {
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

module.exports = { notifyNewMessage };

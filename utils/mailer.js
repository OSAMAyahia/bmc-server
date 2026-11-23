const nodemailer = require('nodemailer');

// Sends an email notification. No-op (with a log) if SMTP is not configured.
// Never throws: a mail failure must not break saving the message.
async function notifyNewMessage({ name, email, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) {
    console.log('[mailer] SMTP not configured, skipping notification');
    return;
  }
  try {
    const port = Number(SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"BMC Website" <${SMTP_USER}>`,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `رسالة جديدة من ${name}`,
      text: `الاسم: ${name}\nالإيميل: ${email}\n\n${message}`,
    });
  } catch (err) {
    console.error('[mailer] failed:', err.message);
  }
}

module.exports = { notifyNewMessage };

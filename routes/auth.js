const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    // Simple token (base64 encoded credentials with timestamp)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    res.json({ success: true, token, email });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

router.post('/verify', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ valid: false });
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    if (email === process.env.ADMIN_EMAIL) {
      res.json({ valid: true, email });
    } else {
      res.status(401).json({ valid: false });
    }
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
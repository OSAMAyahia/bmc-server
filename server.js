require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Routes
const translationsRouter = require('./routes/translations');
const siteConfigRouter = require('./routes/siteConfig');
const techsRouter = require('./routes/techs');
const testimonialsRouter = require('./routes/testimonials');
const faqsRouter = require('./routes/faqs');
const contactRouter = require('./routes/contact');
const servicesRouter = require('./routes/services');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// API Routes
app.use('/api/translations', translationsRouter);
app.use('/api/site-config', siteConfigRouter);
app.use('/api/techs', techsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/services', servicesRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 BMC Server running on port ${PORT}`);
});

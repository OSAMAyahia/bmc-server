const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

const DIGITAL_MARKETING_SLUG = 'ai-solutions';

const canonicalServiceImagesBySlug = {
  'web-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490766/ChatGPT_Image_Jun_3_2026_03_30_44_PM_mabpls.png',
  'e-commerce-website-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490773/ChatGPT_Image_Jun_3_2026_03_32_23_PM_uxzmme.png',
  'mobile-app-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492386/ChatGPT_Image_Jun_3_2026_04_08_20_PM_gmfa5h.png?v=1780492386',
  'erp-systems': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492458/ChatGPT_Image_Jun_3_2026_04_14_01_PM_itewvs.png?v=1780492458',
  'ui-ux-design': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492387/ChatGPT_Image_Jun_3_2026_04_07_08_PM_fig092.png?v=1780492387',
  [DIGITAL_MARKETING_SLUG]: 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490772/ChatGPT_Image_Jun_3_2026_03_40_21_PM_o6oijd.png',
};

const digitalMarketingCopy = {
  titleAr: 'التسويق الرقمي',
  titleEn: 'Digital Marketing',
  descAr: 'في البنية الماسية الرقمية نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية.',
  descEn: 'At Al Binyah Al Masiyah Digital, we deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms.',
  detailTitleAr: 'حلول',
  detailTitleEn: 'Digital',
  detailTitleSpanAr: 'التسويق الرقمي',
  detailTitleSpanEn: 'Marketing',
  detailDescAr: 'في البنية الماسية الرقمية نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية. نعتمد على استراتيجيات مدروسة وإعلانات ممولة فعّالة للوصول للجمهور المناسب بأقل تكلفة وأعلى عائد.',
  detailDescEn: 'At Al Binyah Al Masiyah Digital, we deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms.',
  featuresAr: ['إدارة الحملات الإعلانية', 'إعداد الاستراتيجيات التسويقية', 'تحليل الأداء وتحسين النتائج', 'إدارة السوشيال ميديا'],
  featuresEn: ['Ad campaign management', 'Marketing strategies', 'Performance analysis', 'Social media management'],
  benefitsAr: [
    { title: 'استهداف أدق', desc: 'نصل إلى الجمهور المناسب حسب الاهتمامات والسلوك والموقع لتحقيق أفضل استفادة من الميزانية.' },
    { title: 'تحسين مستمر', desc: 'نراقب أداء الحملات والمحتوى ونجري تحسينات مستمرة لرفع النتائج وخفض التكلفة.' },
    { title: 'محتوى احترافي', desc: 'نكتب إعلانات مؤثرة ونصمم منشورات احترافية تعكس هوية علامتك التجارية.' },
    { title: 'نتائج ملموسة', desc: 'نحوّل حضورك الرقمي إلى زيارات ورسائل ومبيعات عبر خطط واضحة قابلة للقياس.' },
  ],
  benefitsEn: [
    { title: 'Precise Targeting', desc: 'We reach the right audience based on interests, behavior, and location to maximize your budget.' },
    { title: 'Continuous Optimization', desc: 'We monitor campaigns and content closely and keep refining them for stronger outcomes.' },
    { title: 'Professional Content', desc: 'We create ad copy and visual content that reflect your brand and increase engagement.' },
    { title: 'Measurable Results', desc: 'We turn your digital presence into visits, leads, and sales through clear plans.' },
  ],
};

function normalizeService(service) {
  if (!service) return service;
  const item = typeof service.toObject === 'function' ? service.toObject() : { ...service };
  const normalized = {
    ...item,
    cardImage: canonicalServiceImagesBySlug[item.slug] || item.cardImage || '',
  };

  if (item.slug !== DIGITAL_MARKETING_SLUG) return normalized;
  return {
    ...normalized,
    ...digitalMarketingCopy,
    icon: '📣',
  };
}

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services.map(normalizeService));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single service by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(normalizeService(service));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single service by id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(normalizeService(service));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create service
router.post('/', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(normalizeService(service));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(normalizeService(service));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

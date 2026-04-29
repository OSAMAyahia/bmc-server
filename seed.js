require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const SiteConfig = require('./models/SiteConfig');
const Translation = require('./models/Translation');
const Tech = require('./models/Tech');
const Testimonial = require('./models/Testimonial');
const Faq = require('./models/Faq');
const Service = require('./models/Service');

const seedTranslations = async () => {
  await Translation.deleteMany({});

  const translations = [
    {
      section: 'nav',
      data: {
        ar: {
          about: 'من نحن',
          services: 'خدماتنا',
          works: 'أعمالنا',
          process: 'منهجيتنا',
          tech: 'تقنياتنا',
          contact: 'تواصل معنا',
        },
        en: {
          about: 'About',
          services: 'Services',
          works: 'Works',
          process: 'Process',
          tech: 'Tech Stack',
          contact: 'Contact',
        },
      },
    },
    {
      section: 'hero',
      data: {
        ar: {
          badge: 'شريكك الرقمي الموثوق',
          title: 'نبني',
          titleSpan: 'مستقبلك الرقمي',
          subtitle: 'حلول برمجية متكاملة — مواقع، تطبيقات، أنظمة ERP، وتجارة إلكترونية مصممة لتنمية أعمالك.',
          cta: 'ابدأ مشروعك',
          ctaSecondary: 'أعمالنا',
        },
        en: {
          badge: 'Your Trusted Digital Partner',
          title: 'We Build Your',
          titleSpan: 'Digital Future',
          subtitle: 'Full-stack software solutions — websites, mobile apps, ERP systems, and e-commerce designed to grow your business.',
          cta: 'Start Your Project',
          ctaSecondary: 'Our Work',
        },
      },
    },
    {
      section: 'about',
      data: {
        ar: {
          label: 'من نحن',
          title: 'شركة برمجيات',
          titleSpan: 'بطموح لا حدود له',
          desc1: 'BMC Digital شركة سعودية متخصصة في تطوير البرمجيات وتحويل الأعمال رقمياً. نجمع بين الإبداع التقني والفهم العميق لاحتياجات السوق المحلية والعالمية.',
          desc2: 'فريقنا من المطورين والمصممين المحترفين يعمل على بناء حلول رقمية تدوم وتنمو مع أعمالك.',
          stats: [
            { value: '+50', label: 'مشروع منجز' },
            { value: '+30', label: 'عميل سعيد' },
            { value: '5', label: 'سنوات خبرة' },
            { value: '98%', label: 'نسبة رضا العملاء' },
          ],
        },
        en: {
          label: 'About Us',
          title: 'A Software Company',
          titleSpan: 'With Limitless Ambition',
          desc1: 'BMC Digital is a Saudi software company specializing in digital transformation. We combine technical creativity with a deep understanding of local and global market needs.',
          desc2: 'Our team of professional developers and designers builds digital solutions that last and grow with your business.',
          stats: [
            { value: '50+', label: 'Projects Done' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5', label: 'Years Experience' },
            { value: '98%', label: 'Client Satisfaction' },
          ],
        },
      },
    },
    {
      section: 'services',
      data: {
        ar: {
          label: 'خدماتنا',
          title: 'كل ما تحتاجه',
          titleSpan: 'تحت سقف واحد',
          items: [
            { title: 'تطوير المواقع', desc: 'مواقع ويب احترافية وسريعة بتقنيات React وNext.js مع تحسين محركات البحث وتجربة مستخدم استثنائية.' },
            { title: 'تطبيقات الجوال', desc: 'تطبيقات iOS وAndroid بأداء عالٍ وتجربة مستخدم سلسة باستخدام React Native وFlutter.' },
            { title: 'المتاجر الإلكترونية', desc: 'منصات تجارة إلكترونية متكاملة مع بوابات دفع آمنة وإدارة المخزون وتجربة تسوق مميزة.' },
            { title: 'أنظمة ERP', desc: 'أنظمة تخطيط موارد المؤسسة المخصصة لإدارة العمليات والحسابات والموارد البشرية بكفاءة عالية.' },
            { title: 'تصميم UI/UX', desc: 'تصاميم جذابة وواجهات مستخدم بديهية تعكس هوية علامتك التجارية وتحقق أهدافك.' },
            { title: 'حلول الذكاء الاصطناعي', desc: 'دمج تقنيات الذكاء الاصطناعي في منتجاتك — chatbots، تحليل البيانات، والتوصيات الذكية.' },
            { title: 'استشارات تقنية ودعم', desc: 'نقدم استشارات تقنية متخصصة وخطط تحول رقمي شاملة، مع دعم مستمر وصيانة دورية لضمان استمرارية أعمالك.' },
          ],
        },
        en: {
          label: 'Our Services',
          title: 'Everything You Need',
          titleSpan: 'Under One Roof',
          items: [
            { title: 'Web Development', desc: 'Professional, fast websites built with React and Next.js with SEO optimization and exceptional UX.' },
            { title: 'Mobile Apps', desc: 'High-performance iOS and Android apps with smooth UX using React Native and Flutter.' },
            { title: 'E-Commerce', desc: 'Full e-commerce platforms with secure payment gateways, inventory management, and great shopping experience.' },
            { title: 'ERP Systems', desc: 'Custom enterprise resource planning systems for efficient operations, accounting, and HR management.' },
            { title: 'UI/UX Design', desc: 'Attractive designs and intuitive interfaces that reflect your brand identity and achieve your goals.' },
            { title: 'AI Solutions', desc: 'Integrate AI technologies into your products — chatbots, data analytics, and smart recommendations.' },
            { title: 'Tech Consulting & Support', desc: 'Expert technical consulting and comprehensive digital transformation plans, with ongoing support and maintenance.' },
          ],
        },
      },
    },
    {
      section: 'works',
      data: {
        ar: {
          label: 'أعمالنا',
          title: 'مشاريع',
          titleSpan: 'نفخر بها',
          items: [
            { title: 'منصة تجارة إلكترونية', category: 'متجر إلكتروني', tag: 'React · Node.js · MongoDB' },
            { title: 'نظام ERP متكامل', category: 'برمجيات مؤسسية', tag: 'React · PostgreSQL · Docker' },
            { title: 'تطبيق توصيل', category: 'تطبيق جوال', tag: 'React Native · Firebase' },
            { title: 'موقع شركة مقاولات', category: 'موقع مؤسسي', tag: 'React · Vite · Tailwind' },
            { title: 'لوحة تحكم تحليلية', category: 'داشبورد', tag: 'React · D3.js · REST API' },
            { title: 'منصة حجز خدمات', category: 'SaaS', tag: 'Next.js · Prisma · Stripe' },
          ],
        },
        en: {
          label: 'Our Work',
          title: 'Projects We',
          titleSpan: 'Are Proud Of',
          items: [
            { title: 'E-Commerce Platform', category: 'Online Store', tag: 'React · Node.js · MongoDB' },
            { title: 'Integrated ERP System', category: 'Enterprise Software', tag: 'React · PostgreSQL · Docker' },
            { title: 'Delivery App', category: 'Mobile App', tag: 'React Native · Firebase' },
            { title: 'Contracting Website', category: 'Corporate Site', tag: 'React · Vite · Tailwind' },
            { title: 'Analytics Dashboard', category: 'Dashboard', tag: 'React · D3.js · REST API' },
            { title: 'Service Booking Platform', category: 'SaaS', tag: 'Next.js · Prisma · Stripe' },
          ],
        },
      },
    },
    {
      section: 'process',
      data: {
        ar: {
          label: 'منهجيتنا',
          title: 'كيف نعمل',
          titleSpan: 'معك؟',
          steps: [
            { num: '01', title: 'الاستماع والتحليل', desc: 'نبدأ بفهم عميق لأهدافك وتحدياتك وجمهورك المستهدف.' },
            { num: '02', title: 'التخطيط والتصميم', desc: 'نضع خطة واضحة ونصمم النماذج الأولية للحصول على موافقتك.' },
            { num: '03', title: 'التطوير والبناء', desc: 'فريقنا يبني مشروعك بأعلى معايير الجودة وأحدث التقنيات.' },
            { num: '04', title: 'الاختبار والإطلاق', desc: 'اختبار شامل لضمان الجودة ثم إطلاق المشروع بسلاسة تامة.' },
            { num: '05', title: 'الدعم والتطوير', desc: 'نستمر معك بعد الإطلاق بدعم مستمر وتحديثات دورية.' },
          ],
        },
        en: {
          label: 'Our Process',
          title: 'How We',
          titleSpan: 'Work With You',
          steps: [
            { num: '01', title: 'Listen & Analyze', desc: 'We start with a deep understanding of your goals, challenges, and target audience.' },
            { num: '02', title: 'Plan & Design', desc: 'We create a clear plan and design prototypes for your approval.' },
            { num: '03', title: 'Develop & Build', desc: 'Our team builds your project to the highest quality standards with the latest technologies.' },
            { num: '04', title: 'Test & Launch', desc: 'Thorough testing ensures quality, then a smooth project launch.' },
            { num: '05', title: 'Support & Evolve', desc: 'We continue with you after launch with ongoing support and regular updates.' },
          ],
        },
      },
    },
    {
      section: 'tech',
      data: {
        ar: {
          label: 'تقنياتنا',
          title: 'نعمل بـ',
          titleSpan: 'أفضل الأدوات',
        },
        en: {
          label: 'Our Tech Stack',
          title: 'We Work With',
          titleSpan: 'The Best Tools',
        },
      },
    },
    {
      section: 'contact',
      data: {
        ar: {
          label: 'تواصل معنا',
          title: 'ابدأ',
          titleSpan: 'مشروعك اليوم',
          subtitle: 'أخبرنا عن مشروعك وسنتواصل معك خلال 24 ساعة',
          namePlaceholder: 'اسمك الكريم',
          emailPlaceholder: 'بريدك الإلكتروني',
          msgPlaceholder: 'أخبرنا عن مشروعك...',
          btn: 'أرسل رسالتك',
          phone: '+966 50 000 0000',
          email: 'hello@bmc-digital.sa',
        },
        en: {
          label: 'Contact Us',
          title: 'Start Your',
          titleSpan: 'Project Today',
          subtitle: "Tell us about your project and we'll reach out within 24 hours",
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'Your Email',
          msgPlaceholder: 'Tell us about your project...',
          btn: 'Send Message',
          phone: '+966 50 000 0000',
          email: 'hello@bmc-digital.sa',
        },
      },
    },
  ];

  await Translation.insertMany(translations);
  console.log('✅ Translations seeded');
};

const seedTechs = async () => {
  await Tech.deleteMany({});

  const techs = [
    { name: 'React', color: '#61DAFB', order: 0 },
    { name: 'Next.js', color: '#FFFFFF', order: 1 },
    { name: 'Node.js', color: '#68A063', order: 2 },
    { name: 'TypeScript', color: '#3178C6', order: 3 },
    { name: 'MongoDB', color: '#47A248', order: 4 },
    { name: 'PostgreSQL', color: '#336791', order: 5 },
    { name: 'Docker', color: '#2496ED', order: 6 },
    { name: 'Tailwind', color: '#38BDF8', order: 7 },
    { name: 'Figma', color: '#F24E1E', order: 8 },
    { name: 'Firebase', color: '#FFCA28', order: 9 },
    { name: 'AWS', color: '#FF9900', order: 10 },
    { name: 'React Native', color: '#61DAFB', order: 11 },
  ];

  await Tech.insertMany(techs);
  console.log('✅ Techs seeded');
};

const seedTestimonials = async () => {
  await Testimonial.deleteMany({});

  const testimonials = [
    {
      nameAr: 'محمد العتيبي',
      nameEn: 'Mohammed Al-Otaibi',
      roleAr: 'مدير شركة تقنية',
      roleEn: 'Tech Company Director',
      textAr: 'تعاملنا مع BMC لتطوير موقعنا الإلكتروني وكانت التجربة استثنائية. الاحترافية في العمل والالتزام بالمواعيد كان أمراً مميزاً جداً. أنصح بشدة بالتعامل معهم.',
      textEn: 'We worked with BMC to develop our website and the experience was exceptional. The professionalism and commitment to deadlines was outstanding. Highly recommend.',
      rating: 5,
      order: 0,
    },
    {
      nameAr: 'سارة الحربي',
      nameEn: 'Sara Al-Harbi',
      roleAr: 'صاحبة متجر إلكتروني',
      roleEn: 'E-Commerce Owner',
      textAr: 'أطلقوا متجري الإلكتروني في الوقت المحدد وبجودة عالية جداً. المبيعات تضاعفت بعد إطلاق الموقع والتصميم احترافي جداً. شكراً جزيلاً للفريق.',
      textEn: 'They launched my online store on time with very high quality. Sales doubled after the site launched and the design is extremely professional. Thank you so much to the team.',
      rating: 5,
      order: 1,
    },
    {
      nameAr: 'فهد الدوسري',
      nameEn: 'Fahad Al-Dosari',
      roleAr: 'رائد أعمال',
      roleEn: 'Entrepreneur',
      textAr: 'تطبيق الجوال الذي طوروه لي يعمل بشكل مثالي على iOS و Android. الفريق متجاوب جداً ويهتم بأدق التفاصيل. تجربة رائعة من البداية للنهاية.',
      textEn: 'The mobile app they developed for me works perfectly on both iOS and Android. The team is very responsive and pays attention to the smallest details. A wonderful experience from start to finish.',
      rating: 5,
      order: 2,
    },
    {
      nameAr: 'نورة القحطاني',
      nameEn: 'Noura Al-Qahtani',
      roleAr: 'مديرة تسويق',
      roleEn: 'Marketing Manager',
      textAr: 'قدموا لنا حلولاً رقمية متكاملة وكانوا شريكاً حقيقياً في نجاح مشروعنا. السرعة في التنفيذ مع الحفاظ على أعلى معايير الجودة أمر نادر في السوق.',
      textEn: "They provided us with comprehensive digital solutions and were a true partner in our project's success. Speed of execution while maintaining the highest quality standards is rare in the market.",
      rating: 5,
      order: 3,
    },
  ];

  await Testimonial.insertMany(testimonials);
  console.log('✅ Testimonials seeded');
};

const seedFaqs = async () => {
  await Faq.deleteMany({});

  const faqs = [
    {
      questionAr: 'كم يستغرق تطوير موقع إلكتروني؟',
      questionEn: 'How long does it take to develop a website?',
      answerAr: 'يعتمد الوقت على حجم وتعقيد المشروع. الموقع البسيط يستغرق من 2-4 أسابيع، بينما المشاريع الكبيرة قد تأخذ من 2-4 أشهر. نحدد الجدول الزمني بدقة بعد دراسة متطلباتك.',
      answerEn: 'The time depends on the size and complexity of the project. A simple website takes 2-4 weeks, while larger projects may take 2-4 months. We set the exact timeline after studying your requirements.',
      order: 0,
    },
    {
      questionAr: 'هل تقدمون خدمات الصيانة بعد الإطلاق؟',
      questionEn: 'Do you provide maintenance services after launch?',
      answerAr: 'نعم، نقدم خطط صيانة شاملة تشمل التحديثات الأمنية، إصلاح الأخطاء، والتحسينات المستمرة. فريقنا متاح على مدار الساعة لدعم مشاريعك.',
      answerEn: 'Yes, we offer comprehensive maintenance plans including security updates, bug fixes, and ongoing improvements. Our team is available around the clock to support your projects.',
      order: 1,
    },
    {
      questionAr: 'ما هي تقنيات البرمجة التي تستخدمونها؟',
      questionEn: 'What programming technologies do you use?',
      answerAr: 'نستخدم أحدث التقنيات مثل React، Next.js، Node.js، وReact Native للتطبيقات. نختار التقنية المناسبة بناءً على متطلبات مشروعك لضمان أفضل أداء وقابلية للتوسع.',
      answerEn: 'We use the latest technologies such as React, Next.js, Node.js, and React Native for apps. We choose the appropriate technology based on your project requirements to ensure the best performance and scalability.',
      order: 2,
    },
    {
      questionAr: 'كيف يتم التواصل خلال مراحل التطوير؟',
      questionEn: 'How do you communicate during development stages?',
      answerAr: 'نوفر تقارير أسبوعية مفصلة عن التقدم، ولقاءات منتظمة لمراجعة العمل. كما يتوفر لك مدير مشروع مخصص للتواصل معه في أي وقت عبر واتساب أو البريد الإلكتروني.',
      answerEn: 'We provide detailed weekly progress reports and regular review meetings. You also get a dedicated project manager you can contact at any time via WhatsApp or email.',
      order: 3,
    },
    {
      questionAr: 'هل يمكنني رؤية نماذج من أعمالكم السابقة؟',
      questionEn: 'Can I see examples of your previous work?',
      answerAr: 'بالتأكيد! يمكنك مراجعة قسم "أعمالنا" في الموقع. كما يسعدنا مشاركتك بمحفظة أعمال تفصيلية تتضمن مشاريع مماثلة لمجال عملك عند التواصل معنا.',
      answerEn: 'Absolutely! You can review the "Works" section on our website. We\'re also happy to share a detailed portfolio including projects similar to your field when you contact us.',
      order: 4,
    },
    {
      questionAr: 'هل تعملون مع الشركات الصغيرة والناشئة؟',
      questionEn: 'Do you work with small businesses and startups?',
      answerAr: 'نعم، نعمل مع جميع أحجام الشركات من الأفراد والمشاريع الناشئة حتى المؤسسات الكبرى. لدينا حلول مرنة تناسب ميزانيات واحتياجات مختلفة.',
      answerEn: 'Yes, we work with all company sizes from individuals and startups to large enterprises. We have flexible solutions that suit different budgets and needs.',
      order: 5,
    },
  ];

  await Faq.insertMany(faqs);
  console.log('✅ FAQs seeded');
};

const seedSiteConfig = async () => {
  await SiteConfig.deleteMany({});

  const config = {
    siteName: 'BMC Digital',
    navLinks: [
      { key: 'home', labelAr: 'الرئيسية', labelEn: 'Home', href: '/', order: 0, visible: true },
      { key: 'services', labelAr: 'خدماتنا', labelEn: 'Services', href: '#services', order: 1, visible: true },
      { key: 'works', labelAr: 'أعمالنا', labelEn: 'Works', href: '#works', order: 2, visible: true },
      { key: 'process', labelAr: 'منهجيتنا', labelEn: 'Process', href: '#process', order: 3, visible: true },
      { key: 'tech', labelAr: 'تقنياتنا', labelEn: 'Tech Stack', href: '#tech', order: 4, visible: true },
      { key: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact', href: '#contact', order: 5, visible: true },
    ],
    sections: [
      { key: 'hero', visible: true, order: 0 },
      { key: 'about', visible: true, order: 1 },
      { key: 'services', visible: true, order: 2 },
      { key: 'works', visible: true, order: 3 },
      { key: 'process', visible: true, order: 4 },
      { key: 'tech', visible: true, order: 5 },
      { key: 'testimonials', visible: true, order: 6 },
      { key: 'faq', visible: true, order: 7 },
      { key: 'contact', visible: true, order: 8 },
    ],
  };

  await SiteConfig.create(config);
  console.log('✅ SiteConfig seeded');
};

const seedServices = async () => {
  await Service.deleteMany({});

  const services = [
    {
      slug: 'web-development',
      icon: '🌐',
      titleAr: 'تطوير المواقع الإلكترونية',
      titleEn: 'Website Development',
      descAr: 'نبني مواقع احترافية عالية الأداء تعكس هوية علامتك التجارية وتحقق أهدافك التجارية.',
      descEn: 'We build professional, high-performance websites that reflect your brand identity and achieve your business goals.',
      featuresAr: ['تصميم متجاوب مع كل الأجهزة', 'سرعة تحميل فائقة', 'تحسين محركات البحث SEO', 'لوحة إدارة سهلة الاستخدام'],
      featuresEn: ['Responsive on all devices', 'Lightning fast loading', 'SEO optimization', 'Easy-to-use admin panel'],
      detailTitleAr: 'تطوير',
      detailTitleEn: 'Web',
      detailTitleSpanAr: 'المواقع الإلكترونية',
      detailTitleSpanEn: 'Development',
      detailDescAr: 'نبني مواقع احترافية عالية الأداء بتقنيات React و Next.js مع تحسين محركات البحث وتجربة مستخدم استثنائية. كل موقع نصممه فريد ومُخصص لاحتياجات عملك.',
      detailDescEn: 'We build professional, high-performance websites using React and Next.js with SEO optimization and exceptional UX. Every site we design is unique and tailored to your business needs.',
      benefitsAr: [
        { title: 'أداء فائق السرعة', desc: 'مواقع تتحمل في أقل من ثانية مع تحسين كامل للأداء وCore Web Vitals.' },
        { title: 'تحسين SEO', desc: 'هيكلة تقنية ممتازة لمحركات البحث لضمان ظهور موقعك في النتائج الأولى.' },
        { title: 'تصميم متجاوب', desc: 'تصميم يتكيف مع جميع الأجهزة والشاشات بسلاسة تامة.' },
        { title: 'أمان عالي', desc: 'حماية متقدمة مع SSL وتحديثات أمنية مستمرة.' },
      ],
      benefitsEn: [
        { title: 'Lightning Performance', desc: 'Websites that load in under a second with full Core Web Vitals optimization.' },
        { title: 'SEO Optimized', desc: 'Excellent technical structure for search engines to ensure top rankings.' },
        { title: 'Responsive Design', desc: 'Design that adapts seamlessly to all devices and screens.' },
        { title: 'High Security', desc: 'Advanced protection with SSL and continuous security updates.' },
      ],
      order: 0,
    },
    {
      slug: 'e-commerce-website-development',
      icon: '🛒',
      titleAr: 'تطوير المتاجر الإلكترونية',
      titleEn: 'E-Commerce Development',
      descAr: 'متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق استثنائية تزيد مبيعاتك.',
      descEn: 'Full e-commerce solutions with secure payment gateways and exceptional shopping experiences that boost your sales.',
      featuresAr: ['بوابات دفع متعددة', 'إدارة المخزون', 'تقارير المبيعات', 'تجربة مستخدم محسّنة'],
      featuresEn: ['Multiple payment gateways', 'Inventory management', 'Sales reports', 'Optimized UX'],
      detailTitleAr: 'متاجر',
      detailTitleEn: 'E-Commerce',
      detailTitleSpanAr: 'إلكترونية متكاملة',
      detailTitleSpanEn: 'Solutions',
      detailDescAr: 'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وإدارة المخزون وتجربة تسوق مميزة تزيد من مبيعاتك وتوسع قاعدة عملائك.',
      detailDescEn: 'We build complete e-commerce stores with secure payment gateways, inventory management, and an exceptional shopping experience that boosts your sales and expands your customer base.',
      benefitsAr: [
        { title: 'بوابات دفع آمنة', desc: 'دمج مع أبرز بوابات الدفع المحلية والعالمية بأمان عالي.' },
        { title: 'إدارة المخزون', desc: 'نظام ذكي لإدارة المخزون والطلبات والمتابعة التلقائية.' },
        { title: 'تحليلات متقدمة', desc: 'تقارير مفصلة عن المبيعات والعملاء والأداء.' },
        { title: 'تجربة تسوق مميزة', desc: 'واجهة سهلة الاستخدام تشجع على الشراء والعودة.' },
      ],
      benefitsEn: [
        { title: 'Secure Payment Gateways', desc: 'Integration with top local and global payment gateways with high security.' },
        { title: 'Inventory Management', desc: 'Smart system for inventory, orders, and automatic tracking.' },
        { title: 'Advanced Analytics', desc: 'Detailed reports on sales, customers, and performance.' },
        { title: 'Great Shopping Experience', desc: 'Easy-to-use interface that encourages purchases and repeat visits.' },
      ],
      order: 1,
    },
    {
      slug: 'mobile-app-development',
      icon: '📱',
      titleAr: 'تطوير التطبيقات',
      titleEn: 'Mobile App Development',
      descAr: 'تطبيقات جوال احترافية لنظامي iOS و Android تمنح مستخدميك تجربة استثنائية.',
      descEn: 'Professional mobile apps for iOS and Android that give your users an exceptional experience.',
      featuresAr: ['iOS و Android', 'أداء عالي', 'واجهة مستخدم جذابة', 'تكامل مع الخدمات الخارجية'],
      featuresEn: ['iOS & Android', 'High performance', 'Attractive UI', 'Third-party integration'],
      detailTitleAr: 'تطوير',
      detailTitleEn: 'Mobile',
      detailTitleSpanAr: 'التطبيقات',
      detailTitleSpanEn: 'Apps',
      detailDescAr: 'تطبيقات جوال احترافية لنظامي iOS و Android باستخدام React Native و Flutter. أداء عالي وتجربة مستخدم سلسة تمنح عملاءك وصولاً سهلاً لخدماتك.',
      detailDescEn: 'Professional mobile apps for iOS and Android using React Native and Flutter. High performance and smooth UX that gives your customers easy access to your services.',
      benefitsAr: [
        { title: 'أداء أصلي', desc: 'تطبيقات بأداء قريب من التطبيقات الأصلية على iOS و Android.' },
        { title: 'تجربة مستخدم سلسة', desc: 'واجهات بديهية وسلسة تحقق رضا المستخدمين.' },
        { title: 'إشعارات ذكية', desc: 'نظام إشعارات متقدم للتواصل الفعال مع المستخدمين.' },
        { title: 'تحديثات سهلة', desc: 'إمكانية التحديث والصيانة بسهولة وسرعة.' },
      ],
      benefitsEn: [
        { title: 'Native Performance', desc: 'Apps with near-native performance on both iOS and Android.' },
        { title: 'Smooth UX', desc: 'Intuitive and smooth interfaces that achieve user satisfaction.' },
        { title: 'Smart Notifications', desc: 'Advanced notification system for effective user engagement.' },
        { title: 'Easy Updates', desc: 'Ability to update and maintain with ease and speed.' },
      ],
      order: 2,
    },
    {
      slug: 'erp-systems',
      icon: '⚙️',
      titleAr: 'أنظمة ERP',
      titleEn: 'ERP Systems',
      descAr: 'أنظمة تخطيط موارد المؤسسة المخصصة لإدارة العمليات والحسابات والموارد البشرية بكفاءة عالية.',
      descEn: 'Custom enterprise resource planning systems for efficient operations, accounting, and HR management.',
      featuresAr: ['إدارة الموارد البشرية', 'المحاسبة والمالية', 'إدارة المخزون', 'تقارير ولوحات تحكم'],
      featuresEn: ['HR Management', 'Accounting & Finance', 'Inventory Management', 'Reports & Dashboards'],
      detailTitleAr: 'أنظمة',
      detailTitleEn: 'ERP',
      detailTitleSpanAr: 'ERP متكاملة',
      detailTitleSpanEn: 'Systems',
      detailDescAr: 'أنظمة تخطيط موارد المؤسسة المخصصة لإدارة العمليات والحسابات والموارد البشرية بكفاءة عالية. حلول مصممة خصيصاً لتناسب طبيعة عملك.',
      detailDescEn: 'Custom enterprise resource planning systems for efficient operations, accounting, and HR management. Solutions designed specifically to fit your business nature.',
      benefitsAr: [
        { title: 'أتمتة العمليات', desc: 'أتمتة كاملة للعمليات التجارية وتقليل الأخطاء البشرية.' },
        { title: 'تقارير ذكية', desc: 'لوحات تحكم وتقارير لحظية لدعم اتخاذ القرار.' },
        { title: 'إدارة شاملة', desc: 'نظام واحد لإدارة جميع جوانب العمل بكفاءة.' },
        { title: 'قابلية التوسع', desc: 'نظام ينمو مع أعمالك ويتكيف مع احتياجاتك المتغيرة.' },
      ],
      benefitsEn: [
        { title: 'Process Automation', desc: 'Complete automation of business processes and reduced human errors.' },
        { title: 'Smart Reports', desc: 'Real-time dashboards and reports to support decision making.' },
        { title: 'Comprehensive Management', desc: 'One system to manage all aspects of business efficiently.' },
        { title: 'Scalability', desc: 'A system that grows with your business and adapts to changing needs.' },
      ],
      order: 3,
    },
    {
      slug: 'ui-ux-design',
      icon: '🎨',
      titleAr: 'تصميم UI/UX',
      titleEn: 'UI/UX Design',
      descAr: 'تصاميم جذابة وواجهات مستخدم بديهية تعكس هوية علامتك التجارية وتحقق أهدافك.',
      descEn: 'Attractive designs and intuitive interfaces that reflect your brand identity and achieve your goals.',
      featuresAr: ['بحث المستخدمين', 'نماذج Wireframes', 'تصميم واجهات UI', 'تجربة المستخدم UX'],
      featuresEn: ['User Research', 'Wireframes', 'UI Interface Design', 'UX Optimization'],
      detailTitleAr: 'تصميم',
      detailTitleEn: 'UI/UX',
      detailTitleSpanAr: 'UI/UX احترافي',
      detailTitleSpanEn: 'Design',
      detailDescAr: 'تصاميم جذابة وواجهات مستخدم بديهية تعكس هوية علامتك التجارية. نبدأ ببحث المستخدمين وننتهي بتصميم نهائي يحقق أهدافك التجارية.',
      detailDescEn: 'Attractive designs and intuitive interfaces that reflect your brand identity. We start with user research and end with a final design that achieves your business goals.',
      benefitsAr: [
        { title: 'بحث المستخدمين', desc: 'فهم عميق لاحتياجات وسلوك المستخدمين المستهدفين.' },
        { title: 'تصميم احترافي', desc: 'واجهات جذابة وعصرية تعكس هوية علامتك التجارية.' },
        { title: 'اختبار الاستخدام', desc: 'اختبارات مستمرة لضمان أفضل تجربة استخدام ممكنة.' },
        { title: 'نماذج تفاعلية', desc: 'نماذج أولية تفاعلية لمراجعة التعديلات قبل التطوير.' },
      ],
      benefitsEn: [
        { title: 'User Research', desc: 'Deep understanding of target users needs and behavior.' },
        { title: 'Professional Design', desc: 'Modern, attractive interfaces that reflect your brand identity.' },
        { title: 'Usability Testing', desc: 'Continuous testing to ensure the best possible user experience.' },
        { title: 'Interactive Prototypes', desc: 'Interactive prototypes to review changes before development.' },
      ],
      order: 4,
    },
    {
      slug: 'ai-solutions',
      icon: '🤖',
      titleAr: 'حلول الذكاء الاصطناعي',
      titleEn: 'AI Solutions',
      descAr: 'دمج تقنيات الذكاء الاصطناعي في منتجاتك — chatbots، تحليل البيانات، والتوصيات الذكية.',
      descEn: 'Integrate AI technologies into your products — chatbots, data analytics, and smart recommendations.',
      featuresAr: ['روبوتات محادثة', 'تحليل البيانات', 'أنظمة التوصية', 'معالجة اللغة الطبيعية'],
      featuresEn: ['Chatbots', 'Data Analytics', 'Recommendation Systems', 'NLP'],
      detailTitleAr: 'حلول',
      detailTitleEn: 'AI',
      detailTitleSpanAr: 'الذكاء الاصطناعي',
      detailTitleSpanEn: 'Solutions',
      detailDescAr: 'دمج تقنيات الذكاء الاصطناعي في منتجاتك — chatbots، تحليل البيانات، والتوصيات الذكية. نساعدك في استغلال قوة AI لتحسين أعمالك.',
      detailDescEn: 'Integrate AI technologies into your products — chatbots, data analytics, and smart recommendations. We help you leverage the power of AI to improve your business.',
      benefitsAr: [
        { title: 'روبوتات محادثة ذكية', desc: 'chatbots متقدمة لخدمة العملاء على مدار الساعة.' },
        { title: 'تحليل البيانات', desc: 'تحليل ذكي للبيانات لاستخراج رؤى قيمة لدعم القرار.' },
        { title: 'توصيات مخصصة', desc: 'أنظمة توصية تزيد من معدل التحويل والرضا.' },
        { title: 'أتمتة ذكية', desc: 'أتمتة المهام المتكررة باستخدام AI لتوفير الوقت والجهد.' },
      ],
      benefitsEn: [
        { title: 'Smart Chatbots', desc: 'Advanced chatbots for 24/7 customer service.' },
        { title: 'Data Analytics', desc: 'Smart data analysis to extract valuable insights for decision support.' },
        { title: 'Personalized Recommendations', desc: 'Recommendation systems that increase conversion and satisfaction.' },
        { title: 'Smart Automation', desc: 'Automate repetitive tasks using AI to save time and effort.' },
      ],
      order: 5,
    },
    {
      slug: 'tech-consulting',
      icon: '💡',
      titleAr: 'استشارات تقنية ودعم',
      titleEn: 'Tech Consulting & Support',
      descAr: 'نقدم استشارات تقنية متخصصة وخطط تحول رقمي شاملة مع دعم مستمر وصيانة دورية.',
      descEn: 'Expert technical consulting and comprehensive digital transformation plans with ongoing support and maintenance.',
      featuresAr: ['تحليل البنية التحتية', 'خطة التحول الرقمي', 'الصيانة والدعم المستمر', 'أمن المعلومات'],
      featuresEn: ['Infrastructure Analysis', 'Digital Transformation', 'Ongoing Support', 'Information Security'],
      detailTitleAr: 'استشارات',
      detailTitleEn: 'Tech',
      detailTitleSpanAr: 'تقنية متخصصة',
      detailTitleSpanEn: 'Consulting',
      detailDescAr: 'نقدم استشارات تقنية متخصصة وخطط تحول رقمي شاملة، مع دعم مستمر وصيانة دورية لضمان استمرارية ونمو أعمالك.',
      detailDescEn: 'Expert technical consulting and comprehensive digital transformation plans, with ongoing support and maintenance to ensure business continuity and growth.',
      benefitsAr: [
        { title: 'تحليل شامل', desc: 'تقييم كامل للبنية التحتية التقنية الحالية وتحديد فرص التحسين.' },
        { title: 'خطة تحول رقمي', desc: 'خطة واضحة ومفصلة للتحول الرقمي مع مراحل زمنية محددة.' },
        { title: 'دعم مستمر', desc: 'فريق دعم متاح على مدار الساعة لحل أي مشاكل تقنية.' },
        { title: 'أمن المعلومات', desc: 'حماية متقدمة لبياناتك وأنظمتك من التهديدات الإلكترونية.' },
      ],
      benefitsEn: [
        { title: 'Comprehensive Analysis', desc: 'Full assessment of current tech infrastructure and identifying improvement opportunities.' },
        { title: 'Digital Transformation Plan', desc: 'Clear, detailed digital transformation plan with defined timelines.' },
        { title: 'Ongoing Support', desc: 'Support team available around the clock to resolve any technical issues.' },
        { title: 'Information Security', desc: 'Advanced protection for your data and systems from cyber threats.' },
      ],
      order: 6,
    },
  ];

  await Service.insertMany(services);
  console.log('✅ Services seeded');
};

const seedAll = async () => {
  try {
    await connectDB();
    await seedTranslations();
    await seedTechs();
    await seedTestimonials();
    await seedFaqs();
    await seedServices();
    await seedSiteConfig();
    console.log('\n🎉 All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedAll();
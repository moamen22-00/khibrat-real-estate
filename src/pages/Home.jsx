import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Home() {
  const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'ar')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [servicesOpen, setServicesOpen] = useState(false)

  const content = {
    ar: {
      dir: 'rtl',
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'خدماتنا',
        partners: 'شركاؤنا',
        contact: 'اتصل بنا',
      },
      heroBtn1: 'استعرض خدماتنا',
      heroBtn2: 'تعرّف علينا',
      stats: [
        { value: '2003', label: 'بداية الخبرة' },
        { value: '9+', label: 'خدمات متخصصة' },
        { value: 'احترافية', label: 'في كل التفاصيل' },
      ],
      aboutKicker: 'من نحن',
      aboutTitle: 'خبرات لإدارة الأملاك والاستشارات العقارية',
      aboutText:
        'شركة خدمات عقارية متكاملة ضمن مجموعة خبرات، تقدم حلولًا نوعية للشركات والمطورين والأفراد في الاستثمار العقاري وإدارة الأملاك والبيع والشراء والوساطة.',
      aboutCards: [
        {
          title: 'رؤية مبنية على الخبرة والتحليل',
          desc: 'نعتمد في خدماتنا على أبحاث سوق واقعية ومعلومات موثوقة وتحليلات احترافية تساعد على اتخاذ قرارات أكثر دقة وفعالية.',
        },
        {
          title: 'شبكة علاقات قوية',
          desc: 'نمتلك علاقات واسعة مع المستثمرين والمطورين والملاك بما يدعم سرعة التنفيذ وجودة الفرص.',
        },
        {
          title: 'معرفة قانونية عميقة',
          desc: 'فهم دقيق للأنظمة والقوانين الضابطة لسوق العقار لضمان مهنية أعلى ومخاطر أقل.',
        },
      ],
      messageKicker: 'رسالتنا',
      messageTitle: 'نرفع مستوى الخدمات العقارية إلى تجربة أكثر احترافية',
      messageList: [
        'المساهمة الفاعلة في الارتقاء بخدمات الإدارة العقارية.',
        'المحافظة على القيم العالية في إدارة العقارات من خلال تطوير وتدريب وتأهيل الموارد البشرية والنظم الإدارية والشركات الاستراتيجية.',
        'زيادة المعرفة والتوعية العقارية لأطراف المجتمع العقاري.',
        'تغطية السوق المحلية والإقليمية بخدماتنا العقارية.',
      ],
      servicesKicker: 'خدماتنا',
      servicesTitle: 'حلول متكاملة تغطي دورة القرار العقاري',
      servicesText:
        'خدمات مصممة لتلبية احتياجات المستثمرين والشركات والأفراد بأسلوب احترافي واضح ومرن.',
      partnersKicker: 'شركاؤنا',
      partnersTitle: 'شراكات استراتيجية تعزز الثقة والقيمة',
      partnersText:
        'نعمل ضمن شبكة من الجهات والشركات التي تدعم تكامل الخدمات وتوسّع نطاق التأثير.',
      visitSite: 'زيارة الموقع',
      contactKicker: 'تواصل معنا',
      contactTitle: 'لنبدأ مشروعك العقاري بثقة',
      contactText:
        'تواصل معنا للحصول على استشارة أو لمناقشة احتياجاتك العقارية والاستثمارية.',
      footer1: '© 2003 - 2025 Khibrat Group. All Rights Reserved.',
      footer2: 'Powered by Khibrat Group',
      serviceDetails: 'تفاصيل الخدمة',
    },
    en: {
      dir: 'ltr',
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        partners: 'Partners',
        contact: 'Contact',
      },
      heroBtn1: 'View Services',
      heroBtn2: 'About Us',
      stats: [
        { value: '2003', label: 'Established Experience' },
        { value: '9+', label: 'Specialized Services' },
        { value: 'Professional', label: 'In Every Detail' },
      ],
      aboutKicker: 'About Us',
      aboutTitle: 'Khibrat for Property Management and Real Estate Consulting',
      aboutText:
        'An integrated real estate services company within Khibrat Group, delivering tailored solutions for companies, developers, and individuals in investment, property management, sales, and brokerage.',
      aboutCards: [
        {
          title: 'A Vision Built on Expertise',
          desc: 'Our services rely on real market research, trusted data, and professional analysis that support accurate and effective decisions.',
        },
        {
          title: 'Strong Network',
          desc: 'We maintain broad relationships with investors, developers, and owners to support speed and quality of execution.',
        },
        {
          title: 'Deep Legal Knowledge',
          desc: 'A strong understanding of real estate regulations helps ensure higher professionalism and lower risk.',
        },
      ],
      messageKicker: 'Our Message',
      messageTitle: 'We elevate real estate services into a more professional experience',
      messageList: [
        'Enhancing real estate management through practical modern solutions.',
        'Preserving high values in real estate management through development, training, and strategic systems.',
        'Increasing awareness and real estate knowledge for all stakeholders.',
        'Covering local and regional markets with our real estate services.',
      ],
      servicesKicker: 'Services',
      servicesTitle: 'Integrated solutions across the real estate decision cycle',
      servicesText:
        'Services designed for investors, companies, and individuals with a professional and flexible approach.',
      partnersKicker: 'Partners',
      partnersTitle: 'Strategic partnerships that strengthen trust and value',
      partnersText:
        'We work within a network of companies and entities that strengthen service integration and market reach.',
      visitSite: 'Visit Website',
      contactKicker: 'Contact Us',
      contactTitle: 'Let’s start your real estate project with confidence',
      contactText:
        'Contact us for a consultation or to discuss your real estate and investment needs.',
      footer1: '© 2003 - 2025 Khibrat Group. All Rights Reserved.',
      footer2: 'Powered by Khibrat Group',
      serviceDetails: 'Service Details',
    },
  }

  const t = content[lang]

  const heroImages = [
    '/Images/images/tabels.jpg',
    '/Images/images/auction.jpg',
    '/Images/images/sell-2.jpg',
  ]

  const serviceCards = [
    {
      slug: 'sell',
      title: lang === 'ar' ? 'بيع الأصول' : 'Asset Disposition',
      icon: '/Images/images/sell.png',
      desc:
        lang === 'ar'
          ? 'هناك اسباب عديدة تحدد توجه الشركات أو الأفراد إلى بيع أصولهم العقارية منها على سبيل المثال ...'
          : 'There are many reasons for companies or individuals to sell their real estate assets, for example...',
    },
    {
      slug: 'buy',
      title: lang === 'ar' ? 'شراء الأصول' : 'Asset Acquisition',
      icon: '/Images/images/buy.png',
      desc:
        lang === 'ar'
          ? 'شراء الأصول المناسبة في الوقت الصحيح والموقع المميز يعتبر العامل الأساس لتحقيق عائد جيد و ...'
          : 'Buying the right assets at the right time and in a great location is key to achieving a good return...',
    },
    {
      slug: 'consulting',
      title: lang === 'ar' ? 'استشارات استثمارية' : 'Investment Consulting',
      icon: '/Images/images/pen.png',
      desc:
        lang === 'ar'
          ? 'تقوم شركة خبرات بمساعدة الشركات والمستثمرين والمطورين في اتخاذ القرارات فيما يتعلق بـ ...'
          : 'Khibrat helps companies, investors, and developers make decisions regarding...',
    },
    {
      slug: 'exchanges',
      title: lang === 'ar' ? 'المبادلات العقارية' : 'Real Estate Exchanges',
      icon: '/Images/images/law.png',
      desc:
        lang === 'ar'
          ? 'تقدم شركة خبرات حلولاً مرنة ومبتكرة للتعامل مع الأصول العقارية غير المستغلة أو التي ...'
          : 'Khibrat provides flexible and innovative solutions for underutilized real estate assets...',
    },
    {
      slug: 'auction',
      title: lang === 'ar' ? 'المزادات العقارية' : 'Real Estate Auctions',
      icon: '/Images/images/incres.png',
      desc:
        lang === 'ar'
          ? 'ليست جميع الفرص العقارية متاحة عبر القنوات التقليدية، إذ تظهر بعض من أبرز الفرص الاستثمارية ...'
          : 'Not all real estate opportunities are available through traditional channels...',
    },
    {
      slug: 'portfolio',
      title: lang === 'ar' ? 'إدارة المحافظ' : 'Portfolio Management',
      icon: '/Images/images/wellet.png',
      desc:
        lang === 'ar'
          ? 'تسهيل الأعمال الإدارية العقارية تقدم شركتنا حلولاً عملية في إدارة المحافظ العقارية بحيث ...'
          : 'Our company provides practical solutions in managing real estate portfolios...',
    },
    {
      slug: 'marketing',
      title: lang === 'ar' ? 'التسويق العقاري' : 'Real Estate Marketing',
      icon: '/Images/images/markiting.png',
      desc:
        lang === 'ar'
          ? 'تقدم شركة خبرات لإدارة الأملاك والاستشارات العقارية خدمات التسويق العقاري لـ ...'
          : 'Khibrat Property Management provides real estate marketing services for...',
    },
    {
      slug: 'legal',
      title: lang === 'ar' ? 'الاستشارات القانونية' : 'Legal Advisory',
      icon: '/Images/images/law.png',
      desc:
        lang === 'ar'
          ? 'خبرة شركتنا في المجال القانوني تمثل القالب الاحترافي لعمل الشركة ...'
          : "Our company's legal expertise forms the professional foundation of our work...",
    },
    {
      slug: 'gis',
      title: lang === 'ar' ? 'الدراسات التخصصية و GIS' : 'Specialized Studies & GIS',
      icon: '/Images/images/pen.png',
      desc:
        lang === 'ar'
          ? 'إن شركة خبرات بما لديها من كادر متكامل مؤلف من مستشارين اختصاصيين وفنيين خبراء ...'
          : 'Khibrat has an integrated team of consultants and expert technicians...',
    },
  ]

  const dropdownServices = [
    ...serviceCards.map((service) => ({
      type: 'page',
      ...service,
    })),
    {
      type: 'page',
      slug: 'lease',
      title: lang === 'ar' ? 'إدارة الإيجارات' : 'Lease Management',
      icon: '/Images/images/wellet.png',
    },

    {
  type: 'page',
  slug: 'rate',
  title: lang === 'ar' ? 'التقييم و التثمين' : 'Valuation',
  icon: '/Images/images/pen.png',
},
  ]

  const partners = [
    {
      image: '/Images/images/Khibrat.png',
      link: 'https://khibratgroup.com',
    },
    {
      image: '/Images/images/Mawared.png',
      link: 'https://greenmawared.com',
    },
    {
      image: '/Images/images/GLS.png',
      link: 'https://www.continentaljet.aero/',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
    localStorage.setItem('siteLang', lang)
  }, [lang, t.dir])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: 'easeOut',
      },
    }),
  }

  const handleDropdownScroll = (target) => {
    setServicesOpen(false)
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`app-shell ${lang === 'en' ? 'lang-en' : 'lang-ar'}`}>
      <header className="site-header">
        <nav className="navbar">
          <Link to="/" className="brand">
            <img src="/Images/Logo.png" alt="Khibrat Logo" className="logo" />
          </Link>

          <ul className="nav-links">
            <li><a href="#hero">{t.nav.home}</a></li>
            <li><a href="#about">{t.nav.about}</a></li>

            <li className="services-dropdown-wrapper">
              <button
                className={`services-toggle ${servicesOpen ? 'active' : ''}`}
                onClick={() => setServicesOpen(!servicesOpen)}
                type="button"
              >
                {t.nav.services}
                <span className="services-arrow">⌄</span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="services-dropdown"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    {dropdownServices.map((service, index) =>
                      service.type === 'page' ? (
                        <Link
                          key={index}
                          to={`/services/${service.slug}`}
                          className="dropdown-service-item"
                          onClick={() => setServicesOpen(false)}
                        >
                          <img src={service.icon} alt={service.title} />
                          <span>{service.title}</span>
                        </Link>
                      ) : (
                        <button
                          key={index}
                          type="button"
                          className="dropdown-service-item dropdown-service-button"
                          onClick={() => handleDropdownScroll(service.target)}
                        >
                          <img src={service.icon} alt={service.title} />
                          <span>{service.title}</span>
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li><a href="#partners">{t.nav.partners}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>

          <div className="nav-actions">
            <div className="language-switcher">
              <button
                type="button"
                className={lang === 'ar' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLang('ar')}
              >
                عربي
              </button>
              <button
                type="button"
                className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImages[currentSlide]}
              src={heroImages[currentSlide]}
              alt={`hero-${currentSlide + 1}`}
              className="hero-bg"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          <div className="hero-overlay"></div>

          <div className="hero-content limit-width">
            <motion.div
              className="hero-actions"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
            >
              <a href="#services" className="hero-btn primary">
                {t.heroBtn1}
              </a>

              <a href="#about" className="hero-btn ghost">
                {t.heroBtn2}
              </a>
            </motion.div>

            <div className="hero-stats">
              {t.stats.map((stat, index) => (
                <motion.div
                  className="stat-card"
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + index * 0.15,
                    ease: 'easeOut',
                  }}
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="hero-dots">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-company-block">
            <div className="about-company-top">
              <div className="about-company-copy">
                <span className="section-kicker about-company-kicker">{t.aboutKicker}</span>
                <h2 className="about-company-title">{t.aboutTitle}</h2>
                <p className="about-company-description">{t.aboutText}</p>
              </div>
            </div>

            <div className="about-company-values">
              <div className="about-value-item">
                <span className="about-value-number">01</span>
                <div>
                  <h3>{t.aboutCards[0].title}</h3>
                  <p>{t.aboutCards[0].desc}</p>
                </div>
              </div>

              <div className="about-value-item">
                <span className="about-value-number">02</span>
                <div>
                  <h3>{t.aboutCards[1].title}</h3>
                  <p>{t.aboutCards[1].desc}</p>
                </div>
              </div>

              <div className="about-value-item">
                <span className="about-value-number">03</span>
                <div>
                  <h3>{t.aboutCards[2].title}</h3>
                  <p>{t.aboutCards[2].desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="limit-width">
            <div className="message-panel message-panel-bg">
              <div className="message-panel-overlay"></div>

              <div className="message-panel-content">
                <div className="message-header">
                  <span className="section-kicker message-kicker">{t.messageKicker}</span>
                  <h3>{t.messageTitle}</h3>
                </div>

                <ul className="message-grid">
                  {t.messageList.map((item, index) => (
                    <li key={index} className="message-card">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="limit-width">
            <motion.div
              className="section-heading center light services-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="section-kicker">{t.servicesKicker}</span>
              <h2>{t.servicesTitle}</h2>
              <p>{t.servicesText}</p>
            </motion.div>

            <div className="services-grid services-grid-premium">
              {serviceCards.map((service, index) => (
                <motion.article
                  className="service-card service-card-premium"
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: 'easeOut',
                  }}
                >
                  <div className="service-top">
                    <div className="service-icon-wrap service-icon-wrap-premium">
                      <img src={service.icon} alt={service.title} className="service-icon" />
                    </div>

                    <span className="service-index">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>

                  <div className="service-actions">
                    <Link to={`/services/${service.slug}`} className="service-details-btn">
                      {t.serviceDetails}
                      <span className="arrow">→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="partners-wrapper limit-width" id="partners">
          <div className="section-heading center">
            <span className="section-kicker">{t.partnersKicker}</span>
            <h2>{t.partnersTitle}</h2>
            <p>{t.partnersText}</p>
          </div>

          <div className="partners-grid">
            {partners.map((partner, index) => (
              <motion.div
                className="partner-card"
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: 'easeOut',
                }}
              >
                <div className="partner-logo-wrap">
                  <img src={partner.image} alt={`partner-${index + 1}`} className="partner-logo" />
                </div>

                <a href={partner.link} target="_blank" rel="noreferrer" className="partner-btn">
                  {t.visitSite}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="limit-width contact-layout">
            <div className="contact-copy">
              <span className="section-kicker light-kicker">{t.contactKicker}</span>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>

              <div className="contact-list">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span dir="ltr">011 226 3476</span>
                </div>
                <div className="contact-item">
                  <i className="fab fa-whatsapp"></i>
                  <span dir="ltr">+963 997 395 487</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:info@khibratrealestate.com">info@khibratrealestate.com</a>
                </div>
                <div className="contact-item">
                  <i className="fas fa-globe"></i>
                  <a href="http://www.khibratrealestate.com" target="_blank" rel="noreferrer">
                    www.khibratrealestate.com
                  </a>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Office 17, Vision 8, The Eight Gate, Damascus, Syria</span>
                </div>
              </div>
            </div>

            <div className="contact-map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.3135406243823!2d36.12501472694941!3d33.499095934403826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518d9f34a62a073%3A0x67703329615f07d1!2z2YrYudmB2YjYsSDYp9mE2KjZiNin2KjZhyDYp9mE2KvYp9mF2YbZhw!5e0!3m2!1sar!2sus!4v1750231202432!5m2!1sar!2sus"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Khibrat Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="limit-width footer-inner">
          <p>{t.footer1}</p>
          <p>{t.footer2}</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
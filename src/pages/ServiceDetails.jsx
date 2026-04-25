import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import servicesData from '../data/services'

function ServiceDetails() {
  const { slug } = useParams()
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('siteLang') || 'ar')
  const [selectedImage, setSelectedImage] = useState(null)

  const service = servicesData.find((item) => item.slug === slug)
  const content = service?.[currentLang] || service?.ar
  const hasGallery = Array.isArray(service?.gallery) && service.gallery.length > 0

  useEffect(() => {
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('siteLang', currentLang)
  }, [currentLang])

  if (!service || !content) {
    return (
      <div className={`service-page ${currentLang === 'en' ? 'lang-en' : 'lang-ar'}`}>
        <div className="container service-page-top-space">
          <Link to="/" className="back-btn">
            ← {currentLang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
          <h1>{currentLang === 'ar' ? 'الخدمة غير موجودة' : 'Service not found'}</h1>
        </div>
      </div>
    )
  }

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }

  return (
    <div
      className={`service-page ${slug === 'sell' ? 'service-page-sell' : ''} ${
        !hasGallery ? 'no-gallery' : ''
      } ${currentLang === 'en' ? 'lang-en' : 'lang-ar'}`}
    >
      <div className="service-ambient service-ambient-1"></div>
      <div className="service-ambient service-ambient-2"></div>
      <div className="service-noise"></div>

      <section
        className="service-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8,18,37,0.42), rgba(8,18,37,0.9)), url(${service.heroImage})`,
        }}
      >
        <button type="button" className="service-lang-floating" onClick={toggleLanguage}>
          {content.toggleLang}
        </button>

        <div className="service-hero-content service-fade-up service-delay-1">
          <Link to="/" className="back-btn">
            ← {content.backText}
          </Link>
          
          <h1>{content.title}</h1>
          <p className="hero-sub">{content.shortDescription}</p>
        </div>
      </section>

      <section className="service-body">
        <div className="container service-content-narrow">
          <div className="service-intro-card service-fade-up service-delay-2">
            <span className="service-mini-kicker">{content.overviewTitle}</span>
            <p>{content.intro}</p>
          </div>

          <div className="service-paragraphs-wrap">
            {content.paragraphs.map((paragraph, index) => (
              <div
                className="service-paragraph-card service-fade-up"
                key={index}
                style={{ animationDelay: `${0.22 + index * 0.12}s` }}
              >
                <p>{paragraph}</p>
              </div>
            ))}
          </div>

          {content.ctaTitle && (
            <div className="property-action-panel service-fade-up service-delay-3">
              <div className="property-action-badge">
                <span className="property-action-icon">⌂</span>
              </div>

              <div className="property-action-copy">
                <span className="property-action-kicker">{content.ctaTitle}</span>
                <h3>{currentLang === 'ar' ? 'ابدأ بعرض عقارك معنا' : 'Start Listing Your Property With Us'}</h3>
                <p>{content.ctaText}</p>
              </div>

              <div className="property-action-side">
                <Link to={content.ctaLink} className="property-action-btn">
                  {content.ctaButton}
                </Link>
              </div>
            </div>
          )}

          {hasGallery && (
            <>
              <div className="service-gallery-head service-fade-up service-delay-3">
                <h2>{content.galleryTitle}</h2>
              </div>

              <div className="service-gallery">
                {service.gallery.map((image, index) => (
                  <button
                    type="button"
                    key={index}
                    className="service-gallery-item service-fade-up"
                    style={{ animationDelay: `${0.45 + index * 0.15}s` }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`${content.title}-${index + 1}`} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="image-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="image-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="image-lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              {content.closeImage}
            </button>

            <img src={selectedImage} alt="Expanded view" className="image-lightbox-img" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceDetails
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function PropertyCard() {
  const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'ar')
  const isArabic = lang === 'ar'

  const content = useMemo(
    () => ({
      ar: {
        dir: 'rtl',
        pageTitle: 'بطاقة عقارية',
        backText: 'العودة',
        switchLang: 'EN',
        heroTitle: 'بطاقة عقارية',
        heroText:
          'يمكنك تعبئة بيانات العقار المطلوب بيعه بطريقة واضحة ومنظمة، ليقوم فريقنا بدراسة الحالة والتواصل معك لاستكمال الإجراءات بكفاءة أعلى.',
        basicTitle: 'المعلومات الأساسية',
        propertyTitle: 'تفاصيل العقار',
        attachmentsTitle: 'المرفقات',
        submitText: 'إرسال البيانات',
        submittingText: 'جاري الإرسال...',
        ownerAdd: 'إضافة مالك',
        ownershipTitle: 'نوع الملكية',
        fullOwnership: 'كامل الملكية',
        sharedOwnership: 'حصة على الشيوع',

        name: 'السيد',
        namePlaceholder: 'اكتب اسمك هنا',
        relation: 'العلاقة والصفة',
        relationPlaceholder: 'وكيل، وسيط، مالك العقار',
        phone: 'رقم هاتف صاحب العلاقة',
        phonePlaceholder: '0999999999',
        email: 'البريد الالكتروني',
        emailPlaceholder: 'example@gmail.com',

        propertyArea: 'المنطقة العقارية',
        propertyAreaPlaceholder: 'اسم المنطقة العقارية',
        propertyNumber: 'عقار رقم',
        propertyNumberPlaceholder: 'رقم العقار',
        description: 'وصف العقار',
        descriptionPlaceholder: 'وصف تفصيلي للعقار',
        totalArea: 'بيان مساحة العقار',
        totalAreaPlaceholder: 'المساحة بالمتر المربع',
        soldArea: 'المساحة المباعة (م²)',
        soldAreaPlaceholder: 'المساحة المباعة بالمتر المربع',
        owners: 'المالك/الملاك',
        ownerPlaceholder: 'اسم المالك',

        propertyRegister: 'إخراج قيد عقاري',
        areaStatement: 'بيان مساحة العقار',
        surveyPlan: 'مخطط مساحي',
        contracts: 'عقود الإشارات (إن وجدت)',
        otherAttachments: 'بيان بالمرفقات الأخرى',
        noFile: 'لم يتم اختيار ملف',
        uploaded: 'تم الرفع',
        filesSelected: 'ملفات مختارة',

        chooseFile: 'اختيار ملف',
        chooseFiles: 'اختيار الملفات',

        successMessage: 'تم إرسال البيانات بنجاح',
        errorMessage: 'حدث خطأ أثناء الإرسال',
        validationTitle: 'الرجاء التحقق من الحقول التالية:',
      },
      en: {
        dir: 'ltr',
        pageTitle: 'Property Card',
        backText: 'Back',
        switchLang: 'عربي',
        heroTitle: 'Property Card',
        heroText:
          'Submit the property details in a clear and structured way so our team can review the case and contact you to proceed efficiently.',
        basicTitle: 'Basic Information',
        propertyTitle: 'Property Details',
        attachmentsTitle: 'Attachments',
        submitText: 'Submit Data',
        submittingText: 'Submitting...',
        ownerAdd: 'Add Owner',
        ownershipTitle: 'Ownership Type',
        fullOwnership: 'Full Ownership',
        sharedOwnership: 'Shared Ownership',

        name: 'Mr',
        namePlaceholder: 'Enter your name here',
        relation: 'Relationship and Capacity',
        relationPlaceholder: 'Agent, Broker, Property Owner',
        phone: 'Phone Number',
        phonePlaceholder: '0999999999',
        email: 'Email',
        emailPlaceholder: 'example@gmail.com',

        propertyArea: 'Property Area',
        propertyAreaPlaceholder: 'Property area name',
        propertyNumber: 'Property No',
        propertyNumberPlaceholder: 'Property number',
        description: 'Property Description',
        descriptionPlaceholder: 'Detailed description of the property',
        totalArea: 'Property Area Statement',
        totalAreaPlaceholder: 'Area in square meters',
        soldArea: 'Sold Area (m²)',
        soldAreaPlaceholder: 'Sold area in square meters',
        owners: 'Owner/Owners',
        ownerPlaceholder: 'Owner name',

        propertyRegister: 'Property Register Extract',
        areaStatement: 'Property Area Statement',
        surveyPlan: 'Survey Plan',
        contracts: 'Signing Contracts (if any)',
        otherAttachments: 'Other Attachments',
        noFile: 'No file chosen',
        uploaded: 'Uploaded',
        filesSelected: 'files selected',

        chooseFile: 'Choose File',
        chooseFiles: 'Choose Files',

        successMessage: 'Data submitted successfully',
        errorMessage: 'An error occurred while submitting',
        validationTitle: 'Please check the following fields:',
      },
    }),
    []
  )

  const t = content[lang]

  const [ownershipType, setOwnershipType] = useState('full')
  const [owners, setOwners] = useState([''])
  const [files, setFiles] = useState({
    propertyRegister: null,
    areaStatement: null,
    surveyPlan: null,
    contracts: null,
    otherAttachments: null,
  })

  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    phone: '',
    email: '',
    propertyArea: '',
    propertyNumber: '',
    propertyDescription: '',
    totalArea: '',
    totalAreaShared: '',
    soldArea: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
    localStorage.setItem('siteLang', lang)
  }, [lang, t.dir])

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const updateOwner = (index, value) => {
    setOwners((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const addOwner = () => {
    setOwners((prev) => [...prev, ''])
  }

  const updateFile = (key, fileList) => {
    const value = key === 'otherAttachments' ? Array.from(fileList || []) : fileList?.[0] || null
    setFiles((prev) => ({ ...prev, [key]: value }))
  }

  const getFileLabel = (key) => {
    const value = files[key]

    if (!value) return t.noFile

    if (Array.isArray(value)) {
      return value.length
        ? isArabic
          ? `تم اختيار ${value.length} ملفات`
          : `${value.length} files selected`
        : t.noFile
    }

    return value.name
  }

  const resetForm = () => {
    setOwnershipType('full')
    setOwners([''])
    setFiles({
      propertyRegister: null,
      areaStatement: null,
      surveyPlan: null,
      contracts: null,
      otherAttachments: null,
    })
    setFormData({
      name: '',
      relation: '',
      phone: '',
      email: '',
      propertyArea: '',
      propertyNumber: '',
      propertyDescription: '',
      totalArea: '',
      totalAreaShared: '',
      soldArea: '',
    })
    setValidationErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    setSubmitSuccess('')
    setSubmitError('')
    setValidationErrors({})

    try {
      const payload = new FormData()

      payload.append('lang', lang)
      payload.append('ownership_type', ownershipType)

      payload.append('name', formData.name)
      payload.append('relation', formData.relation)
      payload.append('phone', formData.phone)
      payload.append('email', formData.email)

      payload.append('property_area', formData.propertyArea)
      payload.append('property_number', formData.propertyNumber)
      payload.append('property_description', formData.propertyDescription)

      if (ownershipType === 'full') {
        if (formData.totalArea !== '') {
          payload.append('total_area', formData.totalArea)
        }
      } else {
        if (formData.totalAreaShared !== '') {
          payload.append('total_area_shared', formData.totalAreaShared)
        }
        if (formData.soldArea !== '') {
          payload.append('sold_area', formData.soldArea)
        }
      }

      owners
        .filter((owner) => owner.trim() !== '')
        .forEach((owner, index) => {
          payload.append(`owners[${index}]`, owner)
        })

      if (files.propertyRegister) {
        payload.append('property_register', files.propertyRegister)
      }

      if (files.areaStatement) {
        payload.append('area_statement', files.areaStatement)
      }

      if (files.surveyPlan) {
        payload.append('survey_plan', files.surveyPlan)
      }

      if (files.contracts) {
        payload.append('contracts', files.contracts)
      }

      if (Array.isArray(files.otherAttachments) && files.otherAttachments.length > 0) {
        files.otherAttachments.forEach((file) => {
          payload.append('other_attachments[]', file)
        })
      }

      const response = await fetch('http://127.0.0.1:8000/api/property-submissions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          setValidationErrors(result.errors)
          setSubmitError(t.validationTitle)
        } else {
          setSubmitError(result.message || t.errorMessage)
        }
        return
      }

      setSubmitSuccess(result.message || t.successMessage)
      resetForm()
    } catch (error) {
      setSubmitError(t.errorMessage)
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`property-card-page ${isArabic ? 'lang-ar' : 'lang-en'}`}>
      <div className="property-card-ambient property-card-ambient-1"></div>
      <div className="property-card-ambient property-card-ambient-2"></div>

      <section className="property-card-hero">
        <div className="property-card-topbar">
          <Link to="/services/sell" className="property-card-back">
            {isArabic ? '←' : '←'} {t.backText}
          </Link>

          <button type="button" className="property-card-lang" onClick={toggleLanguage}>
            {t.switchLang}
          </button>
        </div>

        <div className="property-card-hero-copy">
          <span className="property-card-kicker">{t.pageTitle}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
        </div>
      </section>

      <section className="property-card-shell">
        <form className="property-card-form" onSubmit={handleSubmit}>
          {(submitSuccess || submitError) && (
            <div className="property-alerts">
              {submitSuccess && <div className="property-alert success">{submitSuccess}</div>}
              {submitError && <div className="property-alert error">{submitError}</div>}
            </div>
          )}

          {Object.keys(validationErrors).length > 0 && (
            <div className="property-validation-box">
              {Object.entries(validationErrors).map(([field, messages]) => (
                <div key={field} className="property-validation-item">
                  {Array.isArray(messages) ? messages[0] : messages}
                </div>
              ))}
            </div>
          )}

          <div className="property-card-grid">
            <section className="property-section">
              <div className="property-section-head">
                <h2>{t.basicTitle}</h2>
              </div>

              <div className="property-fields two-cols">
                <div className="property-field">
                  <label>{t.name}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>

                <div className="property-field">
                  <label>{t.relation}</label>
                  <input
                    type="text"
                    value={formData.relation}
                    onChange={(e) => updateField('relation', e.target.value)}
                    placeholder={t.relationPlaceholder}
                    required
                  />
                </div>

                <div className="property-field">
                  <label>{t.phone}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t.phonePlaceholder}
                    required
                  />
                </div>

                <div className="property-field">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="property-section">
              <div className="property-section-head">
                <h2>{t.propertyTitle}</h2>
              </div>

              <div className="property-fields two-cols">
                <div className="property-field">
                  <label>{t.propertyArea}</label>
                  <input
                    type="text"
                    value={formData.propertyArea}
                    onChange={(e) => updateField('propertyArea', e.target.value)}
                    placeholder={t.propertyAreaPlaceholder}
                  />
                </div>

                <div className="property-field">
                  <label>{t.propertyNumber}</label>
                  <input
                    type="text"
                    value={formData.propertyNumber}
                    onChange={(e) => updateField('propertyNumber', e.target.value)}
                    placeholder={t.propertyNumberPlaceholder}
                  />
                </div>

                <div className="property-field full-span">
                  <label>{t.description}</label>
                  <textarea
                    rows="4"
                    value={formData.propertyDescription}
                    onChange={(e) => updateField('propertyDescription', e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                  />
                </div>

                <div className="property-field full-span">
                  <label>{t.ownershipTitle}</label>

                  <div className="ownership-switch">
                    <button
                      type="button"
                      className={ownershipType === 'full' ? 'ownership-btn active' : 'ownership-btn'}
                      onClick={() => setOwnershipType('full')}
                    >
                      {t.fullOwnership}
                    </button>

                    <button
                      type="button"
                      className={ownershipType === 'shared' ? 'ownership-btn active' : 'ownership-btn'}
                      onClick={() => setOwnershipType('shared')}
                    >
                      {t.sharedOwnership}
                    </button>
                  </div>
                </div>

                {ownershipType === 'full' ? (
                  <div className="property-field">
                    <label>{t.totalArea}</label>
                    <input
                      type="number"
                      value={formData.totalArea}
                      onChange={(e) => updateField('totalArea', e.target.value)}
                      placeholder={t.totalAreaPlaceholder}
                    />
                  </div>
                ) : (
                  <>
                    <div className="property-field">
                      <label>{t.totalArea}</label>
                      <input
                        type="number"
                        value={formData.totalAreaShared}
                        onChange={(e) => updateField('totalAreaShared', e.target.value)}
                        placeholder={t.totalAreaPlaceholder}
                      />
                    </div>

                    <div className="property-field">
                      <label>{t.soldArea}</label>
                      <input
                        type="number"
                        value={formData.soldArea}
                        onChange={(e) => updateField('soldArea', e.target.value)}
                        placeholder={t.soldAreaPlaceholder}
                      />
                    </div>
                  </>
                )}

                <div className="property-field full-span">
                  <label>{t.owners}</label>

                  <div className="owners-stack">
                    {owners.map((owner, index) => (
                      <div className="owner-row" key={index}>
                        <input
                          type="text"
                          value={owner}
                          onChange={(e) => updateOwner(index, e.target.value)}
                          placeholder={t.ownerPlaceholder}
                        />

                        {index === owners.length - 1 && (
                          <button type="button" className="owner-add-btn" onClick={addOwner}>
                            + {t.ownerAdd}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="property-section">
              <div className="property-section-head">
                <h2>{t.attachmentsTitle}</h2>
              </div>

              <div className="property-uploads-grid">
                <label className="upload-modern-card">
                  <div className="upload-modern-copy">
                    <div className="upload-modern-title">{t.propertyRegister}</div>
                    <div className="upload-modern-file">{getFileLabel('propertyRegister')}</div>
                  </div>

                  <div className="upload-modern-action">
                    <span className="upload-modern-btn">{t.chooseFile}</span>
                  </div>

                  <input
                    type="file"
                    className="upload-hidden-input"
                    onChange={(e) => updateFile('propertyRegister', e.target.files)}
                  />
                </label>

                <label className="upload-modern-card">
                  <div className="upload-modern-copy">
                    <div className="upload-modern-title">{t.areaStatement}</div>
                    <div className="upload-modern-file">{getFileLabel('areaStatement')}</div>
                  </div>

                  <div className="upload-modern-action">
                    <span className="upload-modern-btn">{t.chooseFile}</span>
                  </div>

                  <input
                    type="file"
                    className="upload-hidden-input"
                    onChange={(e) => updateFile('areaStatement', e.target.files)}
                  />
                </label>

                <label className="upload-modern-card">
                  <div className="upload-modern-copy">
                    <div className="upload-modern-title">{t.surveyPlan}</div>
                    <div className="upload-modern-file">{getFileLabel('surveyPlan')}</div>
                  </div>

                  <div className="upload-modern-action">
                    <span className="upload-modern-btn">{t.chooseFile}</span>
                  </div>

                  <input
                    type="file"
                    className="upload-hidden-input"
                    onChange={(e) => updateFile('surveyPlan', e.target.files)}
                  />
                </label>

                <label className="upload-modern-card">
                  <div className="upload-modern-copy">
                    <div className="upload-modern-title">{t.contracts}</div>
                    <div className="upload-modern-file">{getFileLabel('contracts')}</div>
                  </div>

                  <div className="upload-modern-action">
                    <span className="upload-modern-btn">{t.chooseFile}</span>
                  </div>

                  <input
                    type="file"
                    className="upload-hidden-input"
                    onChange={(e) => updateFile('contracts', e.target.files)}
                  />
                </label>

                <label className="upload-modern-card">
                  <div className="upload-modern-copy">
                    <div className="upload-modern-title">{t.otherAttachments}</div>
                    <div className="upload-modern-file">{getFileLabel('otherAttachments')}</div>
                  </div>

                  <div className="upload-modern-action">
                    <span className="upload-modern-btn">{t.chooseFiles}</span>
                  </div>

                  <input
                    type="file"
                    multiple
                    className="upload-hidden-input"
                    onChange={(e) => updateFile('otherAttachments', e.target.files)}
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="property-submit-wrap">
            <button type="submit" className="property-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? t.submittingText : t.submitText}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default PropertyCard
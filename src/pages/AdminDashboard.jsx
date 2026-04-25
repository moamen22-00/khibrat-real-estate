import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [ownershipFilter, setOwnershipFilter] = useState('all')
  const [deletingId, setDeletingId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')

    if (!token) {
      navigate('/admin/login')
      return
    }

    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('admin_token')

      const res = await fetch('http://127.0.0.1:8000/api/property-submissions', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
        return
      }

      const result = await res.json()
      setData(result.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('admin_token')

      await fetch('http://127.0.0.1:8000/api/admin/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.error(err)
    } finally {
      localStorage.removeItem('admin_token')
      navigate('/admin/login')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('هل أنت متأكد من حذف هذا الطلب؟')
    if (!confirmed) return

    try {
      setDeletingId(id)

      const token = localStorage.getItem('admin_token')

      const res = await fetch(`http://127.0.0.1:8000/api/property-submissions/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
        return
      }

      const result = await res.json()

      if (!res.ok) {
        alert(result.message || 'فشل حذف الطلب')
        return
      }

      setData((prev) => prev.filter((item) => item.id !== id))

      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission(null)
      }
    } catch (error) {
      console.error(error)
      alert('حدث خطأ أثناء الحذف')
    } finally {
      setDeletingId(null)
    }
  }

  const fileUrl = (path) => {
    if (!path) return null
    return `http://127.0.0.1:8000/storage/${path}`
  }

  const downloadPdf = async (submission) => {
    try {
      const token = localStorage.getItem('admin_token')

      const res = await fetch(
        `http://127.0.0.1:8000/api/property-submissions/${submission.id}/pdf`,
        {
          headers: {
            Accept: 'application/pdf',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
        return
      }

      if (!res.ok) {
        alert('فشل تحميل ملف PDF')
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `property-submission-${submission.id}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      alert('حدث خطأ أثناء تحميل PDF')
    }
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const query = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.phone?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query)

      const matchesOwnership =
        ownershipFilter === 'all' ? true : item.ownership_type === ownershipFilter

      return matchesSearch && matchesOwnership
    })
  }, [data, searchTerm, ownershipFilter])

  return (
    <div className="dashboard-page" dir="rtl">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div className="dashboard-hero">
            <span className="dashboard-kicker">Khibrat Admin</span>
            <h1>لوحة التحكم</h1>
            <p>إدارة طلبات العقارات ومراجعة البيانات والمرفقات بشكل منظم وسريع.</p>
          </div>

          <div className="dashboard-top-actions">
            <div className="dashboard-stat-card">
              <span>إجمالي الطلبات</span>
              <strong>{data.length}</strong>
            </div>

            <button className="dashboard-logout-btn" onClick={logout}>
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="dashboard-table-card">
          <div className="dashboard-table-head">
            <div>
              <span className="dashboard-section-kicker">قائمة الطلبات</span>
              <h2>الطلبات الواردة</h2>
            </div>
          </div>

          <div className="dashboard-toolbar">
            <div className="dashboard-search-box">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الهاتف أو الإيميل"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="dashboard-filter-box">
              <select
                value={ownershipFilter}
                onChange={(e) => setOwnershipFilter(e.target.value)}
              >
                <option value="all">كل أنواع الملكية</option>
                <option value="full">كامل</option>
                <option value="shared">شيوع</option>
              </select>
            </div>
          </div>

          <div className="dashboard-results-bar">
            <span>عدد النتائج الظاهرة: {filteredData.length}</span>
          </div>

          {loading ? (
            <div className="dashboard-empty">جاري تحميل الطلبات...</div>
          ) : filteredData.length === 0 ? (
            <div className="dashboard-empty">لا يوجد نتائج مطابقة</div>
          ) : (
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>العلاقة</th>
                    <th>الهاتف</th>
                    <th>الإيميل</th>
                    <th>نوع الملكية</th>
                    <th>التاريخ</th>
                    <th>التفاصيل</th>
                    <th>الحذف</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.relation}</td>
                      <td dir="ltr">{item.phone}</td>
                      <td dir="ltr">{item.email}</td>
                      <td>
                        <span className="dashboard-badge">
                          {item.ownership_type === 'full' ? 'كامل' : 'شيوع'}
                        </span>
                      </td>
                      <td>{new Date(item.created_at).toLocaleDateString('en-CA')}</td>
                      <td>
                        <button
                          className="dashboard-view-btn"
                          onClick={() => setSelectedSubmission(item)}
                        >
                          عرض التفاصيل
                        </button>
                      </td>
                      <td>
                        <button
                          className="dashboard-delete-btn"
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? '...' : 'حذف'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedSubmission && (
        <div className="dashboard-modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dashboard-modal-head">
              <div>
                <span className="dashboard-section-kicker">تفاصيل الطلب</span>
                <h3>{selectedSubmission.name || 'طلب عقاري'}</h3>
              </div>

              <div className="dashboard-modal-actions">
                <button
                  className="dashboard-pdf-btn"
                  onClick={() => downloadPdf(selectedSubmission)}
                >
                  تحميل PDF
                </button>

                <button
                  className="dashboard-close-btn"
                  onClick={() => setSelectedSubmission(null)}
                >
                  إغلاق
                </button>
              </div>
            </div>

            <div className="dashboard-modal-body">
              <div className="dashboard-detail-grid">
                <div className="dashboard-detail-card">
                  <span>الاسم</span>
                  <strong>{selectedSubmission.name || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>العلاقة</span>
                  <strong>{selectedSubmission.relation || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>الهاتف</span>
                  <strong dir="ltr">{selectedSubmission.phone || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>البريد الإلكتروني</span>
                  <strong dir="ltr">{selectedSubmission.email || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>المنطقة العقارية</span>
                  <strong>{selectedSubmission.property_area || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>رقم العقار</span>
                  <strong>{selectedSubmission.property_number || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>نوع الملكية</span>
                  <strong>
                    {selectedSubmission.ownership_type === 'full' ? 'كامل' : 'شيوع'}
                  </strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>المساحة الكاملة</span>
                  <strong>{selectedSubmission.total_area || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>المساحة على الشيوع</span>
                  <strong>{selectedSubmission.total_area_shared || '-'}</strong>
                </div>

                <div className="dashboard-detail-card">
                  <span>المساحة المباعة</span>
                  <strong>{selectedSubmission.sold_area || '-'}</strong>
                </div>
              </div>

              <div className="dashboard-description-box">
                <span>وصف العقار</span>
                <p>{selectedSubmission.property_description || 'لا يوجد وصف'}</p>
              </div>

              <div className="dashboard-description-box">
                <span>الملاك</span>
                {selectedSubmission.owners && selectedSubmission.owners.length > 0 ? (
                  <ul className="dashboard-owners-list">
                    {selectedSubmission.owners.map((owner, index) => (
                      <li key={index}>{owner}</li>
                    ))}
                  </ul>
                ) : (
                  <p>لا يوجد ملاك مضافون</p>
                )}
              </div>

              <div className="dashboard-files-box">
                <span>المرفقات</span>

                <div className="dashboard-files-list">
                  {selectedSubmission.property_register && (
                    <a
                      href={fileUrl(selectedSubmission.property_register)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      إخراج قيد عقاري
                    </a>
                  )}

                  {selectedSubmission.area_statement && (
                    <a
                      href={fileUrl(selectedSubmission.area_statement)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      بيان مساحة العقار
                    </a>
                  )}

                  {selectedSubmission.survey_plan && (
                    <a
                      href={fileUrl(selectedSubmission.survey_plan)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      مخطط مساحي
                    </a>
                  )}

                  {selectedSubmission.contracts && (
                    <a
                      href={fileUrl(selectedSubmission.contracts)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      عقود الإشارات
                    </a>
                  )}

                  {selectedSubmission.other_attachments &&
                    selectedSubmission.other_attachments.map((file, index) => (
                      <a
                        key={index}
                        href={fileUrl(file)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        مرفق إضافي {index + 1}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
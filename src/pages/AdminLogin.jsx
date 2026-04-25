import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      localStorage.setItem('admin_token', data.token)
      navigate('/admin/dashboard')
    } catch {
      setError('خطأ بالسيرفر')
    }
  }

  return (
    <div className="admin-page">
      <form className="admin-card" onSubmit={handleLogin}>
        <h2>لوحة التحكم</h2>
        <p>تسجيل الدخول لإدارة طلبات البيع</p>

        {error && <div className="admin-error">{error}</div>}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>تسجيل الدخول</button>
      </form>
    </div>
  )
}

export default AdminLogin
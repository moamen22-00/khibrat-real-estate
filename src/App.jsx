import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ServiceDetails from './pages/ServiceDetails'
import PropertyCard from './pages/PropertyCard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services/:slug" element={<ServiceDetails />} />
      <Route path="/property-card" element={<PropertyCard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
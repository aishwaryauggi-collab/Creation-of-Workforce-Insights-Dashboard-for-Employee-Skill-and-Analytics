import { useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useOutletContext } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import AiAssistantPage from './pages/AiAssistantPage'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<OverviewRoute />} />
            <Route path="/retention" element={<PlaceholderPage title="Attrition & Retention" />} />
            <Route path="/performance" element={<PlaceholderPage title="Employee & Performance" />} />
            <Route path="/dei" element={<PlaceholderPage title="Diversity, Equity & Inclusion" />} />
            <Route path="/recruitment" element={<PlaceholderPage title="Recruitment & Talent Flow" />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function ProtectedLayout() {
  const { user } = useAuth()
  const [filters, setFilters] = useState({ department: 'All', timeframe: 'FY 2026' })

  if (!user) return <Navigate to="/" replace />

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:pl-72">
      <Sidebar />
      <Navbar onFilterChange={handleFilterChange} />
      <Outlet context={{ filters }} />
    </div>
  )
}

function OverviewRoute() {
  const { filters } = useOutletContext()
  return <OverviewPage filters={filters} />
}

function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">
      <div className="grid min-h-[calc(100vh-160px)] place-items-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Workforce Hub</p><h1 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h1><p className="mt-2 text-sm text-slate-500">This workspace is ready for its analytics module.</p></div>
      </div>
    </div>
  )
}

export default App

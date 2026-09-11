import { useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useOutletContext } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import AiAssistantPage from './pages/AiAssistantPage'
import RetentionPage from './pages/RetentionPage'
import PredictiveInsightsPage from './pages/PredictiveInsightsPage'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { RequireRole } from './components/RequireRole';
import { ROUTE_PERMISSIONS } from './rbacRules';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<OverviewRoute />} />
            <Route
              path="/retention"
              element={
                <RequireRole allowedRoles={ROUTE_PERMISSIONS['/retention']}>
                  <RetentionPage />
                </RequireRole>
              }
            />
            <Route
              path="/predictive-insights"
              element={
                <RequireRole allowedRoles={ROUTE_PERMISSIONS['/predictive-insights']}>
                  <PredictiveInsightsPage />
                </RequireRole>
              }
            />
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

export default App

import {
  BarChart3,
  BotMessageSquare,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  UserMinus,
  Users,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasPermission, ROUTE_PERMISSIONS } from '../rbacRules';
const links = [
  { label: 'Workforce Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Attrition & Retention', to: '/retention', icon: UserMinus },
  { label: 'Employee & Performance', to: '/performance', icon: BarChart3 },
  { label: 'Diversity, Equity & Inclusion', to: '/dei', icon: Users },
  { label: 'Recruitment & Talent Flow', to: '/recruitment', icon: Briefcase },
  { label: 'AI HR Assistant (RAG)', to: '/ai-assistant', icon: BotMessageSquare },
]

function Sidebar() {
  const { user } = useAuth()
const visibleLinks = links.filter(link => 
    hasPermission(user?.role, ROUTE_PERMISSIONS[link.to])
  );
  return (
    <aside className="flex w-full shrink-0 flex-col bg-slate-900 text-slate-300 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72">
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="grid size-10 place-items-center rounded-lg bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-950/40">W</div>
        <div>
          <p className="text-sm font-bold tracking-[0.12em] text-white">WORKFORCE HUB</p>
          <p className="mt-1 text-[11px] text-slate-500">Infosys Springboard</p>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="grid grid-cols-2 gap-1 px-3 py-5 sm:grid-cols-3 lg:block lg:flex-1 lg:space-y-1 lg:px-4">
        {visibleLinks.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-3 text-xs font-semibold transition sm:text-sm ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-950/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="shrink-0 text-blue-400" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500">Signed in as</p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-200">{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

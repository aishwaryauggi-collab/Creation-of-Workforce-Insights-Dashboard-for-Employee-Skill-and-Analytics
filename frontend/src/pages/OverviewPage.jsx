import { BarChart3, BriefcaseBusiness, Gauge, Sparkles, TrendingDown, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const overviewByDepartment = {
  All: { headcount: '1,470', health: '84', attrition: '16.1%', requisitions: '34', alert: 'Attrition risk is trending above target in critical talent segments.' },
  'Research & Development': { headcount: '620', health: '88', attrition: '12.8%', requisitions: '18', alert: 'Engineering hiring momentum is strong, but senior skill retention needs review.' },
  Sales: { headcount: '410', health: '81', attrition: '18.4%', requisitions: '9', alert: 'Sales attrition is elevated; review flight-risk signals across high performers.' },
  'Human Resources': { headcount: '96', health: '91', attrition: '9.6%', requisitions: '3', alert: 'HR workforce health is stable with opportunity to accelerate internal mobility.' },
}

function OverviewPage({ filters }) {
  const metrics = overviewByDepartment[filters.department] || overviewByDepartment.All
  const context = `${filters.department} · ${filters.timeframe}`

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Executive workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">Workforce Overview</h1>
          <p className="mt-2 text-sm text-slate-500">A clear view of workforce health, movement, and opportunity.</p>
        </div>
        <p className="text-xs font-medium text-slate-400">Showing {context}</p>
      </div>

      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 text-white shadow-xl shadow-blue-950/10 sm:p-8">
        <div className="absolute -right-16 -top-20 size-64 rounded-full border border-blue-400/15" />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-blue-500/20 text-blue-200"><Sparkles size={18} /></span><span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.13em] text-amber-200">Attention Required</span></div>
            <h2 className="text-xl font-semibold">AI Daily Highlights &amp; Intelligence</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/75">{metrics.alert}</p>
          </div>
          <Link to="/retention" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50">Review Retention Hub</Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Headcount" value={metrics.headcount} detail="+3.2% YoY" icon={Users} tone="blue" trend="up" />
        <KpiCard label="Workforce Health Index" value={`${metrics.health}/100`} detail="Benchmark: 80" icon={Gauge} tone="emerald" trend="up" />
        <KpiCard label="Attrition Rate" value={metrics.attrition} detail="+1.4%" icon={TrendingDown} tone="rose" trend="down" />
        <KpiCard label="Open Requisitions" value={metrics.requisitions} detail="12 Filled" icon={BriefcaseBusiness} tone="amber" trend="up" />
      </section>

      <section className="min-h-[500px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-lg font-semibold text-slate-900">Workforce analytics canvas</h2><p className="mt-1 text-sm text-slate-500">Power BI report embed placeholder</p></div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{context}</span>
        </div>
        <div className="grid min-h-[390px] place-items-center">
          <div className="text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-600"><BarChart3 size={30} strokeWidth={1.6} /></span><h3 className="mt-5 text-lg font-semibold text-slate-800">Power BI canvas ready</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Interactive workforce visualizations will appear here for {filters.department} during {filters.timeframe}.</p></div>
        </div>
      </section>
    </div>
  )
}

function KpiCard({ label, value, detail, icon: Icon, tone, trend }) {
  const tones = { blue: 'bg-blue-50 text-blue-600', emerald: 'bg-emerald-50 text-emerald-600', rose: 'bg-rose-50 text-rose-600', amber: 'bg-amber-50 text-amber-600' }
  return <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><span className={`grid size-10 place-items-center rounded-lg ${tones[tone]}`}><Icon size={19} /></span><span className={`flex items-center gap-1 text-xs font-semibold ${trend === 'down' ? 'text-rose-600' : 'text-emerald-600'}`}>{trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}{detail}</span></div><p className="mt-6 text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900">{value}</p></article>
}

export default OverviewPage

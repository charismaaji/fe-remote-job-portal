import { Link } from 'react-router-dom'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { BriefcaseIcon, CalendarIcon, TrendUpIcon, UsersIcon } from '../../components/dashboard/icons'
import {
  CANDIDATES,
  JOBS,
  PIPELINE_STAGES,
  STAGES,
  jobById,
  stageMeta,
  type StageKey,
} from '../../mock/data'

const APPLICATIONS_BY_DAY = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 18 },
  { day: 'Wed', value: 9 },
  { day: 'Thu', value: 22 },
  { day: 'Fri', value: 16 },
  { day: 'Sat', value: 6 },
  { day: 'Sun', value: 4 },
]

const ACTIVITY = [
  { who: 'Priya Nair', what: 'moved to Offer', when: '2h ago', color: 'bg-brand-500' },
  { who: 'Sofia Rossi', what: 'applied to Product Designer', when: '5h ago', color: 'bg-sky-500' },
  { who: 'Aisha Rahman', what: 'completed technical interview', when: '1d ago', color: 'bg-amber-500' },
  { who: 'James Carter', what: 'accepted offer — hired 🎉', when: '2d ago', color: 'bg-emerald-500' },
]

function countByStage(stage: StageKey) {
  return CANDIDATES.filter((c) => c.stage === stage).length
}

export function Overview() {
  const openJobs = JOBS.filter((j) => j.status === 'open').length
  const totalCandidates = CANDIDATES.length
  const interviews = countByStage('interview')
  const hired = countByStage('hired')

  const stats = [
    { label: 'Active jobs', value: openJobs, delta: '+2 this month', icon: BriefcaseIcon },
    { label: 'Total candidates', value: totalCandidates, delta: '+18 this week', icon: UsersIcon },
    { label: 'In interview', value: interviews, delta: '3 scheduled', icon: CalendarIcon },
    { label: 'Hired (30d)', value: hired, delta: '+1 vs last month', icon: TrendUpIcon },
  ]

  const maxApp = Math.max(...APPLICATIONS_BY_DAY.map((d) => d.value))
  const funnelMax = Math.max(...PIPELINE_STAGES.map((s) => countByStage(s.key)), 1)

  const recent = [...CANDIDATES]
    .filter((c) => c.stage !== 'rejected')
    .slice(0, 5)

  const upcoming = CANDIDATES.filter((c) => c.stage === 'interview').slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Welcome back 👋</h1>
          <p className="mt-1 text-sm text-ink-500">
            Here's what's happening with your remote hiring today.
          </p>
        </div>
        <Link
          to="/dashboard/jobs"
          className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Post a job
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-ink-300/50 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink-500">{label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-ink-900">{value}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Applications chart */}
        <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink-900">Applications this week</h2>
            <Badge className="bg-emerald-50 text-emerald-700" dot="bg-emerald-500">
              87 total
            </Badge>
          </div>
          <div className="mt-6 flex h-48 items-end justify-between gap-3">
            {APPLICATIONS_BY_DAY.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-brand-500/90 transition-all hover:bg-brand-600"
                    style={{ height: `${(d.value / maxApp) * 100}%` }}
                    title={`${d.value} applications`}
                  />
                </div>
                <span className="text-xs text-ink-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring funnel */}
        <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-ink-900">Hiring funnel</h2>
          <div className="mt-5 space-y-3">
            {PIPELINE_STAGES.map((s) => {
              const count = countByStage(s.key)
              return (
                <div key={s.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink-700">
                      <span className={['h-2 w-2 rounded-full', s.dot].join(' ')} />
                      {s.label}
                    </span>
                    <span className="font-semibold text-ink-900">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-brand-50">
                    <div
                      className={['h-full rounded-full', s.dot].join(' ')}
                      style={{ width: `${(count / funnelMax) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent applicants */}
        <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink-900">Recent applicants</h2>
            <Link to="/dashboard/candidates" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-ink-300/40">
            {recent.map((c) => {
              const sm = stageMeta(c.stage)
              return (
                <div key={c.id} className="flex items-center gap-3 py-3">
                  <Avatar name={c.name} color={c.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                    <p className="truncate text-xs text-ink-500">
                      {jobById(c.jobId)?.title} · {c.appliedAgo}
                    </p>
                  </div>
                  <Badge className={sm.badge} dot={sm.dot}>
                    {sm.label}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming interviews + activity */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-ink-900">Upcoming interviews</h2>
            <div className="mt-4 space-y-3">
              {upcoming.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg bg-brand-50/50 p-3">
                  <Avatar name={c.name} color={c.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                    <p className="truncate text-xs text-ink-500">{c.timezone}</p>
                  </div>
                  <span className="text-xs font-medium text-brand-700">
                    {['Today 3pm', 'Tomorrow 11am', 'Thu 2pm'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-ink-900">Recent activity</h2>
            <ul className="mt-4 space-y-4">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className={['mt-1.5 h-2 w-2 flex-none rounded-full', a.color].join(' ')} />
                  <p className="text-sm text-ink-700">
                    <span className="font-semibold text-ink-900">{a.who}</span> {a.what}
                    <span className="block text-xs text-ink-500">{a.when}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-ink-500">
        Showing demo data across {STAGES.length} pipeline stages.
      </p>
    </div>
  )
}

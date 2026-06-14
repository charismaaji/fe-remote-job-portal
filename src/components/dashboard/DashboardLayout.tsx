import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { COMPANY } from '../../mock/data'
import { Avatar } from '../ui/Avatar'
import {
  BellIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  ChatIcon,
  GridIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from './icons'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: GridIcon, end: true },
  { to: '/dashboard/jobs', label: 'Jobs', icon: BriefcaseIcon },
  { to: '/dashboard/candidates', label: 'Candidates', icon: UsersIcon },
  { to: '/dashboard/interviews', label: 'Interviews', icon: CalendarIcon },
  { to: '/dashboard/messages', label: 'Messages', icon: ChatIcon },
  { to: '/dashboard/company', label: 'Company', icon: BuildingIcon },
  { to: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
]

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex min-h-full bg-brand-50/30">
      {/* Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-300/50 bg-white transition-transform lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-16 items-center gap-2 border-b border-ink-300/50 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            R
          </span>
          <span className="text-base font-bold tracking-tight text-ink-900">RemoteHub</span>
        </div>

        <nav className="space-y-1 p-4">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-500 hover:bg-brand-50/60 hover:text-ink-900',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-ink-300/50 p-4">
          <div className="flex items-center gap-3">
            <Avatar name={COMPANY.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">{COMPANY.name}</p>
              <p className="truncate text-xs text-ink-500">Employer account</p>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-300/50 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            className="rounded-lg p-2 text-ink-500 hover:bg-brand-50 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-500">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              type="search"
              placeholder="Search candidates, jobs…"
              className="w-full rounded-lg border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-lg p-2 text-ink-500 hover:bg-brand-50" aria-label="Notifications">
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="hidden rounded-lg border border-ink-300 px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-brand-50 sm:block"
            >
              Sign out
            </button>
            <Link to="/dashboard/company">
              <Avatar name={COMPANY.name} size="sm" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

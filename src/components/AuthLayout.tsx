import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const highlights = [
  'Curated 100% remote roles — no hybrid, no on-site.',
  'Verified companies hiring across every timezone.',
  'One profile, applications to teams worldwide.',
]

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-full">
      {/* Brand / marketing panel */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-700 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(99,102,241,0.6), transparent 45%)',
          }}
        />
        <div className="relative">
          <Logo light />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-snug">
            Find your next role, from anywhere.
          </h2>
          <p className="mt-4 text-brand-100">
            RemoteHub connects ambitious professionals with companies that hire
            remote-first. Build once, apply everywhere.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckIcon />
                <span className="text-brand-50">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-brand-200">
          © {new Date().getFullYear()} RemoteHub. All rights reserved.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="mt-8 lg:mt-0">
            <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
            <p className="mt-2 text-sm text-ink-500">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          'flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold',
          light ? 'bg-white text-brand-700' : 'bg-brand-600 text-white',
        ].join(' ')}
      >
        R
      </span>
      <span
        className={[
          'text-lg font-bold tracking-tight',
          light ? 'text-white' : 'text-ink-900',
        ].join(' ')}
      >
        RemoteHub
      </span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-none text-brand-200"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

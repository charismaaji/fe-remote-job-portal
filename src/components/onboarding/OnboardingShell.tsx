import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function OnboardingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-brand-50/40">
      <header className="border-b border-ink-300/50 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              R
            </span>
            <span className="text-base font-bold tracking-tight text-ink-900">
              RemoteHub
            </span>
          </Link>
          <Link to="/login" className="text-sm font-medium text-ink-500 hover:text-ink-700">
            Sign out
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

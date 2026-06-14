import { useState } from 'react'
import { COMPANY } from '../../mock/data'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'relative h-6 w-11 flex-none rounded-full transition',
        on ? 'bg-brand-600' : 'bg-ink-300',
      ].join(' ')}
      aria-pressed={on}
    >
      <span
        className={[
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
          on ? 'left-[1.375rem]' : 'left-0.5',
        ].join(' ')}
      />
    </button>
  )
}

export function Settings() {
  const [prefs, setPrefs] = useState({
    newApplicant: true,
    interviewReminders: true,
    weeklyDigest: false,
    productUpdates: false,
  })

  const PREF_LABELS: Record<keyof typeof prefs, string> = {
    newApplicant: 'Email me when a new candidate applies',
    interviewReminders: 'Send interview reminders',
    weeklyDigest: 'Weekly hiring summary',
    productUpdates: 'Product news & updates',
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-ink-900">Settings</h1>

      <section className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-ink-900">Account</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Company name" value={COMPANY.name} />
          <Field label="Website" value={COMPANY.website} />
          <Field label="Contact email" value="hiring@northwind.example" />
          <Field label="Plan" value="Growth · 10 active jobs" />
        </div>
      </section>

      <section className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-ink-900">Notifications</h2>
        <div className="mt-4 divide-y divide-ink-300/40">
          {(Object.keys(prefs) as (keyof typeof prefs)[]).map((key) => (
            <div key={key} className="flex items-center justify-between py-3">
              <span className="text-sm text-ink-700">{PREF_LABELS[key]}</span>
              <Toggle on={prefs[key]} onToggle={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-rose-700">Danger zone</h2>
        <p className="mt-1 text-sm text-ink-500">
          Deactivating your account hides all job posts and pauses applications.
        </p>
        <button className="mt-4 rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
          Deactivate account
        </button>
      </section>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <input
        defaultValue={value}
        className="w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OnboardingShell } from '../../components/onboarding/OnboardingShell'
import { Button } from '../../components/ui/Button'
import { useOnboarding, type Role } from '../../onboarding/OnboardingContext'

const ROLES: {
  value: Role
  title: string
  description: string
  icon: string
}[] = [
  {
    value: 'company',
    title: "I'm hiring",
    description: 'Post remote roles and find vetted talent for your team.',
    icon: '🏢',
  },
  {
    value: 'seeker',
    title: "I'm looking for work",
    description: 'Build a profile and apply to remote jobs worldwide.',
    icon: '🧑‍💻',
  },
]

export function SelectRole() {
  const { data, setRole } = useOnboarding()
  const [selected, setSelected] = useState<Role | null>(data.role)
  const navigate = useNavigate()

  function handleContinue() {
    if (!selected) return
    setRole(selected)
    navigate(
      selected === 'company'
        ? '/onboarding/company/information'
        : '/onboarding/seeker/information',
    )
  }

  return (
    <OnboardingShell>
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink-900">How will you use RemoteHub?</h1>
          <p className="mt-2 text-sm text-ink-500">
            Pick the option that fits you best. You can change this later.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ROLES.map((role) => {
            const active = selected === role.value
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelected(role.value)}
                aria-pressed={active}
                className={[
                  'group rounded-2xl border p-6 text-left transition',
                  active
                    ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200'
                    : 'border-ink-300/70 bg-white hover:border-brand-300 hover:bg-brand-50/40',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                    {role.icon}
                  </span>
                  <span
                    className={[
                      'flex h-5 w-5 items-center justify-center rounded-full border-2 transition',
                      active ? 'border-brand-600 bg-brand-600' : 'border-ink-300',
                    ].join(' ')}
                  >
                    {active && (
                      <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-ink-900">{role.title}</h2>
                <p className="mt-1 text-sm text-ink-500">{role.description}</p>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button fullWidth={false} className="min-w-48" disabled={!selected} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </OnboardingShell>
  )
}

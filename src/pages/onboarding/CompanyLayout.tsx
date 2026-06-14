import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { OnboardingShell } from '../../components/onboarding/OnboardingShell'
import { Stepper } from '../../components/onboarding/Stepper'
import { COMPANY_STEPS, useOnboarding } from '../../onboarding/OnboardingContext'

export function CompanyLayout() {
  const { data } = useOnboarding()
  const location = useLocation()

  // Guard: a role must be chosen before entering the company wizard.
  if (data.role !== 'company') {
    return <Navigate to="/onboarding/role" replace />
  }

  const currentIndex = Math.max(
    0,
    COMPANY_STEPS.findIndex((s) => location.pathname.startsWith(s.path)),
  )

  return (
    <OnboardingShell>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink-900">Set up your company</h1>
          <p className="mt-1 text-sm text-ink-500">
            Tell candidates who you are. You can refine these details anytime.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <Stepper steps={COMPANY_STEPS} currentIndex={currentIndex} />
          </aside>

          <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </OnboardingShell>
  )
}

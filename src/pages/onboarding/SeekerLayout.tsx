import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { OnboardingShell } from '../../components/onboarding/OnboardingShell'
import { Stepper } from '../../components/onboarding/Stepper'
import { SEEKER_STEPS, useOnboarding } from '../../onboarding/OnboardingContext'

export function SeekerLayout() {
  const { data } = useOnboarding()
  const location = useLocation()

  // Guard: a role must be chosen before entering the seeker wizard.
  if (data.role !== 'seeker') {
    return <Navigate to="/onboarding/role" replace />
  }

  const currentIndex = Math.max(
    0,
    SEEKER_STEPS.findIndex((s) => location.pathname.startsWith(s.path)),
  )

  return (
    <OnboardingShell>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ink-900">Build your profile</h1>
          <p className="mt-1 text-sm text-ink-500">
            A complete profile helps remote employers find and trust you faster.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <Stepper steps={SEEKER_STEPS} currentIndex={currentIndex} />
          </aside>

          <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </OnboardingShell>
  )
}

import { useNavigate } from 'react-router-dom'
import { OnboardingShell } from '../../components/onboarding/OnboardingShell'
import { Button } from '../../components/ui/Button'
import { useOnboarding } from '../../onboarding/OnboardingContext'

export function OnboardingComplete() {
  const { data } = useOnboarding()
  const navigate = useNavigate()

  const isCompany = data.role === 'company'
  const name = isCompany
    ? data.information.name || 'your company'
    : data.seekerInformation.fullName || 'your profile'
  const message = isCompany
    ? `${name}'s profile is ready. You can now post your first remote role and start reaching candidates worldwide.`
    : `${name}, your profile is ready. You can now browse and apply to remote roles worldwide.`
  const reviewPath = isCompany
    ? '/onboarding/company/information'
    : '/onboarding/seeker/information'

  return (
    <OnboardingShell>
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <svg className="h-8 w-8 text-brand-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4 4 10-10"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink-900">You&apos;re all set!</h1>
        <p className="mt-2 text-sm text-ink-500">{message}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button fullWidth={false} className="min-w-44" onClick={() => navigate('/dashboard')}>
            Go to dashboard
          </Button>
          <Button
            variant="outline"
            fullWidth={false}
            className="min-w-44"
            onClick={() => navigate(reviewPath)}
          >
            Review details
          </Button>
        </div>
      </div>
    </OnboardingShell>
  )
}

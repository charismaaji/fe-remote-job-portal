import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { TextAreaField } from '../../components/ui/TextAreaField'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'
import { validateEmail } from '../../lib/validation'

export function SeekerInformation() {
  const { data, update } = useOnboarding()
  const info = data.seekerInformation
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!info.fullName.trim()) next.fullName = 'Full name is required.'
    if (!info.headline.trim()) next.headline = 'Add a short professional headline.'
    const emailError = validateEmail(info.email)
    if (emailError) next.email = emailError
    setErrors(next)
    if (Object.keys(next).length) return
    navigate('/onboarding/seeker/address')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Personal information</h2>
        <p className="mt-1 text-sm text-ink-500">How employers will get to know you.</p>
      </div>

      <div className="space-y-5">
        <TextField
          label="Full name"
          placeholder="Jane Doe"
          autoComplete="name"
          value={info.fullName}
          onChange={(e) => update('seekerInformation', { fullName: e.target.value })}
          error={errors.fullName}
        />

        <TextField
          label="Professional headline"
          placeholder="Senior Frontend Engineer"
          value={info.headline}
          onChange={(e) => update('seekerInformation', { headline: e.target.value })}
          error={errors.headline}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            value={info.email}
            onChange={(e) => update('seekerInformation', { email: e.target.value })}
            error={errors.email}
          />
          <TextField
            label="Phone number"
            type="tel"
            placeholder="+1 555 000 1234"
            value={info.phone}
            onChange={(e) => update('seekerInformation', { phone: e.target.value })}
          />
        </div>

        <TextAreaField
          label="About you"
          rows={4}
          hint="Optional"
          placeholder="Summarize your experience, strengths, and what kind of remote role you're looking for."
          value={info.about}
          onChange={(e) => update('seekerInformation', { about: e.target.value })}
        />
      </div>

      <StepFooter />
    </form>
  )
}

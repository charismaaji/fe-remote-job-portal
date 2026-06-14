import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { SelectField } from '../../components/ui/SelectField'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'
import { validateEmail } from '../../lib/validation'

const METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
]

export function CompanyContact() {
  const { data, update } = useOnboarding()
  const contact = data.contact
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!contact.fullName.trim()) next.fullName = 'Contact name is required.'
    const emailError = validateEmail(contact.email)
    if (emailError) next.email = emailError
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    // Placeholder: submit the full onboarding payload to your API here.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitting(false)
    navigate('/onboarding/company/done')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Contact details</h2>
        <p className="mt-1 text-sm text-ink-500">
          The main point of contact for candidates and RemoteHub.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Full name"
            placeholder="Jane Doe"
            autoComplete="name"
            value={contact.fullName}
            onChange={(e) => update('contact', { fullName: e.target.value })}
            error={errors.fullName}
          />
          <TextField
            label="Job title"
            placeholder="Head of Talent"
            value={contact.jobTitle}
            onChange={(e) => update('contact', { jobTitle: e.target.value })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Contact email"
            type="email"
            placeholder="jane@acme.com"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => update('contact', { email: e.target.value })}
            error={errors.email}
          />
          <TextField
            label="Phone number"
            type="tel"
            placeholder="+1 555 000 1234"
            value={contact.phone}
            onChange={(e) => update('contact', { phone: e.target.value })}
          />
        </div>

        <SelectField
          label="Preferred contact method"
          options={METHODS}
          value={contact.preferredMethod}
          onChange={(e) => update('contact', { preferredMethod: e.target.value })}
        />
      </div>

      <StepFooter
        onBack={() => navigate('/onboarding/company/address')}
        nextLabel="Finish setup"
        submitting={submitting}
      />
    </form>
  )
}

import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'

export function CompanyAddress() {
  const { data, update } = useOnboarding()
  const address = data.address
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!address.country.trim()) next.country = 'Country is required.'
    if (!address.city.trim()) next.city = 'City is required.'
    setErrors(next)
    if (Object.keys(next).length) return
    navigate('/onboarding/company/contact')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Company address</h2>
        <p className="mt-1 text-sm text-ink-500">
          Your legal or headquarters location, even if your team is distributed.
        </p>
      </div>

      <div className="space-y-5">
        <label className="flex items-start gap-3 rounded-lg border border-ink-300/70 bg-brand-50/40 p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-300"
            checked={address.remoteFirst}
            onChange={(e) => update('address', { remoteFirst: e.target.checked })}
          />
          <span>
            <span className="block text-sm font-medium text-ink-900">
              We are a remote-first company
            </span>
            <span className="block text-xs text-ink-500">
              Shown on your profile so candidates know how you work.
            </span>
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Country"
            placeholder="United States"
            value={address.country}
            onChange={(e) => update('address', { country: e.target.value })}
            error={errors.country}
          />
          <TextField
            label="State / Province"
            placeholder="California"
            value={address.state}
            onChange={(e) => update('address', { state: e.target.value })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="City"
            placeholder="San Francisco"
            value={address.city}
            onChange={(e) => update('address', { city: e.target.value })}
            error={errors.city}
          />
          <TextField
            label="Postal code"
            placeholder="94105"
            value={address.postalCode}
            onChange={(e) => update('address', { postalCode: e.target.value })}
          />
        </div>

        <TextField
          label="Street address"
          placeholder="123 Market Street, Suite 400"
          value={address.street}
          onChange={(e) => update('address', { street: e.target.value })}
        />
      </div>

      <StepFooter onBack={() => navigate('/onboarding/company/branding')} />
    </form>
  )
}

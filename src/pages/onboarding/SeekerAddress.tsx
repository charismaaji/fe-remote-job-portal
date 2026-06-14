import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'

export function SeekerAddress() {
  const { data, update } = useOnboarding()
  const address = data.seekerAddress
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!address.country.trim()) next.country = 'Country is required.'
    if (!address.city.trim()) next.city = 'City is required.'
    setErrors(next)
    if (Object.keys(next).length) return
    navigate('/onboarding/seeker/experience')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Your location</h2>
        <p className="mt-1 text-sm text-ink-500">
          Used to match you with timezone-friendly remote roles.
        </p>
      </div>

      <div className="space-y-5">
        <label className="flex items-start gap-3 rounded-lg border border-ink-300/70 bg-brand-50/40 p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-300"
            checked={address.openToRelocate}
            onChange={(e) => update('seekerAddress', { openToRelocate: e.target.checked })}
          />
          <span>
            <span className="block text-sm font-medium text-ink-900">
              I'm open to relocating
            </span>
            <span className="block text-xs text-ink-500">
              Lets employers know you'll consider on-site or hybrid options too.
            </span>
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Country"
            placeholder="United States"
            value={address.country}
            onChange={(e) => update('seekerAddress', { country: e.target.value })}
            error={errors.country}
          />
          <TextField
            label="State / Province"
            placeholder="California"
            value={address.state}
            onChange={(e) => update('seekerAddress', { state: e.target.value })}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="City"
            placeholder="San Francisco"
            value={address.city}
            onChange={(e) => update('seekerAddress', { city: e.target.value })}
            error={errors.city}
          />
          <TextField
            label="Postal code"
            placeholder="94105"
            value={address.postalCode}
            onChange={(e) => update('seekerAddress', { postalCode: e.target.value })}
          />
        </div>

        <TextField
          label="Street address"
          placeholder="123 Market Street, Apt 4"
          value={address.street}
          onChange={(e) => update('seekerAddress', { street: e.target.value })}
        />
      </div>

      <StepFooter onBack={() => navigate('/onboarding/seeker/information')} />
    </form>
  )
}

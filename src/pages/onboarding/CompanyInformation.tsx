import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { SelectField } from '../../components/ui/SelectField'
import { TextAreaField } from '../../components/ui/TextAreaField'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'

const INDUSTRIES = [
  'Software & IT',
  'Finance & Fintech',
  'Healthcare',
  'E-commerce & Retail',
  'Education',
  'Marketing & Media',
  'Other',
].map((v) => ({ value: v, label: v }))

const SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees',
].map((v) => ({ value: v, label: v }))

export function CompanyInformation() {
  const { data, update } = useOnboarding()
  const info = data.information
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!info.name.trim()) next.name = 'Company name is required.'
    if (!info.industry) next.industry = 'Select an industry.'
    if (!info.size) next.size = 'Select a company size.'
    setErrors(next)
    if (Object.keys(next).length) return
    navigate('/onboarding/company/branding')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Company information</h2>
        <p className="mt-1 text-sm text-ink-500">The essentials candidates see first.</p>
      </div>

      <div className="space-y-5">
        <TextField
          label="Company name"
          placeholder="Acme Inc."
          value={info.name}
          onChange={(e) => update('information', { name: e.target.value })}
          error={errors.name}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Industry"
            placeholder="Select industry"
            options={INDUSTRIES}
            value={info.industry}
            onChange={(e) => update('information', { industry: e.target.value })}
            error={errors.industry}
          />
          <SelectField
            label="Company size"
            placeholder="Select size"
            options={SIZES}
            value={info.size}
            onChange={(e) => update('information', { size: e.target.value })}
            error={errors.size}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Founded year"
            type="number"
            placeholder="2015"
            min={1800}
            max={2026}
            value={info.founded}
            onChange={(e) => update('information', { founded: e.target.value })}
          />
          <TextField
            label="Website"
            type="url"
            placeholder="https://acme.com"
            value={info.website}
            onChange={(e) => update('information', { website: e.target.value })}
          />
        </div>

        <TextAreaField
          label="About the company"
          rows={4}
          hint="Optional"
          placeholder="What does your company do, and what makes it a great place to work remotely?"
          value={info.about}
          onChange={(e) => update('information', { about: e.target.value })}
        />
      </div>

      <StepFooter />
    </form>
  )
}

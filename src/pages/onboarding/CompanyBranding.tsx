import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { TextAreaField } from '../../components/ui/TextAreaField'
import { TextField } from '../../components/ui/TextField'
import { useOnboarding } from '../../onboarding/OnboardingContext'

export function CompanyBranding() {
  const { data, update } = useOnboarding()
  const branding = data.branding
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  function handleLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    update('branding', { logoName: file.name })
    setLogoPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/onboarding/company/address')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Branding profile</h2>
        <p className="mt-1 text-sm text-ink-500">
          Make your company page memorable. All fields here are optional.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <span className="block text-sm font-medium text-ink-700">Company logo</span>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-xl border border-dashed border-ink-300 bg-brand-50/50">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl text-ink-300">+</span>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border border-ink-300 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 shadow-sm hover:bg-brand-50"
              >
                {branding.logoName ? 'Change logo' : 'Upload logo'}
              </button>
              <p className="mt-1.5 text-xs text-ink-500">
                {branding.logoName || 'PNG, JPG or SVG up to 2MB.'}
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogo}
            />
          </div>
        </div>

        <TextField
          label="Tagline"
          placeholder="Building the future of remote work"
          value={branding.tagline}
          onChange={(e) => update('branding', { tagline: e.target.value })}
        />

        <TextAreaField
          label="Company description"
          rows={4}
          placeholder="Describe your mission, culture, and what working here is like."
          value={branding.description}
          onChange={(e) => update('branding', { description: e.target.value })}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com/company/…"
            value={branding.linkedin}
            onChange={(e) => update('branding', { linkedin: e.target.value })}
          />
          <TextField
            label="X / Twitter"
            placeholder="@acme"
            value={branding.twitter}
            onChange={(e) => update('branding', { twitter: e.target.value })}
          />
        </div>
      </div>

      <StepFooter onBack={() => navigate('/onboarding/company/information')} />
    </form>
  )
}

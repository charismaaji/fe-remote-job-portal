import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { AddItemButton, EmptyState, EntryCard } from '../../components/onboarding/EntryCard'
import { TextField } from '../../components/ui/TextField'
import {
  blankCertificate,
  useOnboarding,
  type Certificate,
} from '../../onboarding/OnboardingContext'

export function SeekerCertificate() {
  const { data, setList } = useOnboarding()
  const items = data.certificates
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  function patch(id: string, values: Partial<Certificate>) {
    setList(
      'certificates',
      items.map((it) => (it.id === id ? { ...it, ...values } : it)),
    )
  }

  function add() {
    setList('certificates', [...items, blankCertificate()])
  }

  function remove(id: string) {
    setList('certificates', items.filter((it) => it.id !== id))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // Placeholder: submit the full job-seeker profile to your API here.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitting(false)
    navigate('/onboarding/seeker/done')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Certificates</h2>
        <p className="mt-1 text-sm text-ink-500">
          Showcase licenses and certifications that set you apart.
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 && <EmptyState text="No certificates added yet." />}

        {items.map((cert, index) => (
          <EntryCard
            key={cert.id}
            title={cert.name || `Certificate ${index + 1}`}
            onRemove={() => remove(cert.id)}
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Certificate name"
                  placeholder="AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => patch(cert.id, { name: e.target.value })}
                />
                <TextField
                  label="Issuing organization"
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => patch(cert.id, { issuer: e.target.value })}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Issue date"
                  type="month"
                  value={cert.issueDate}
                  onChange={(e) => patch(cert.id, { issueDate: e.target.value })}
                />
                <TextField
                  label="Credential ID"
                  placeholder="ABC-123456"
                  value={cert.credentialId}
                  onChange={(e) => patch(cert.id, { credentialId: e.target.value })}
                />
              </div>

              <TextField
                label="Credential URL"
                type="url"
                placeholder="https://credly.com/…"
                value={cert.url}
                onChange={(e) => patch(cert.id, { url: e.target.value })}
              />
            </div>
          </EntryCard>
        ))}

        <AddItemButton label="Add certificate" onClick={add} />
      </div>

      <StepFooter
        onBack={() => navigate('/onboarding/seeker/education')}
        nextLabel="Finish setup"
        submitting={submitting}
      />
    </form>
  )
}

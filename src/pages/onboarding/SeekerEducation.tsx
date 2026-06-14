import { type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { AddItemButton, EmptyState, EntryCard } from '../../components/onboarding/EntryCard'
import { TextField } from '../../components/ui/TextField'
import {
  blankEducation,
  useOnboarding,
  type Education,
} from '../../onboarding/OnboardingContext'

export function SeekerEducation() {
  const { data, setList } = useOnboarding()
  const items = data.educations
  const navigate = useNavigate()

  function patch(id: string, values: Partial<Education>) {
    setList(
      'educations',
      items.map((it) => (it.id === id ? { ...it, ...values } : it)),
    )
  }

  function add() {
    setList('educations', [...items, blankEducation()])
  }

  function remove(id: string) {
    setList('educations', items.filter((it) => it.id !== id))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/onboarding/seeker/certificate')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Education</h2>
        <p className="mt-1 text-sm text-ink-500">
          Add your degrees, bootcamps, or relevant programs.
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 && <EmptyState text="No education added yet." />}

        {items.map((edu, index) => (
          <EntryCard
            key={edu.id}
            title={edu.school || `Education ${index + 1}`}
            onRemove={() => remove(edu.id)}
          >
            <div className="space-y-5">
              <TextField
                label="School / Institution"
                placeholder="Stanford University"
                value={edu.school}
                onChange={(e) => patch(edu.id, { school: e.target.value })}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Degree"
                  placeholder="B.Sc."
                  value={edu.degree}
                  onChange={(e) => patch(edu.id, { degree: e.target.value })}
                />
                <TextField
                  label="Field of study"
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) => patch(edu.id, { field: e.target.value })}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Start year"
                  type="number"
                  placeholder="2016"
                  min={1950}
                  max={2026}
                  value={edu.startYear}
                  onChange={(e) => patch(edu.id, { startYear: e.target.value })}
                />
                <TextField
                  label="End year"
                  type="number"
                  placeholder="2020"
                  min={1950}
                  max={2035}
                  value={edu.endYear}
                  onChange={(e) => patch(edu.id, { endYear: e.target.value })}
                />
              </div>
            </div>
          </EntryCard>
        ))}

        <AddItemButton label="Add education" onClick={add} />
      </div>

      <StepFooter onBack={() => navigate('/onboarding/seeker/experience')} />
    </form>
  )
}

import { type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepFooter } from '../../components/onboarding/StepFooter'
import { AddItemButton, EmptyState, EntryCard } from '../../components/onboarding/EntryCard'
import { TextAreaField } from '../../components/ui/TextAreaField'
import { TextField } from '../../components/ui/TextField'
import {
  blankExperience,
  useOnboarding,
  type Experience,
} from '../../onboarding/OnboardingContext'

export function SeekerExperience() {
  const { data, setList } = useOnboarding()
  const items = data.experiences
  const navigate = useNavigate()

  function patch(id: string, values: Partial<Experience>) {
    setList(
      'experiences',
      items.map((it) => (it.id === id ? { ...it, ...values } : it)),
    )
  }

  function add() {
    setList('experiences', [...items, blankExperience()])
  }

  function remove(id: string) {
    setList('experiences', items.filter((it) => it.id !== id))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/onboarding/seeker/education')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink-900">Work experience</h2>
        <p className="mt-1 text-sm text-ink-500">
          Add your most relevant roles. You can skip this and add it later.
        </p>
      </div>

      <div className="space-y-4">
        {items.length === 0 && <EmptyState text="No experience added yet." />}

        {items.map((exp, index) => (
          <EntryCard
            key={exp.id}
            title={exp.title || exp.company || `Experience ${index + 1}`}
            onRemove={() => remove(exp.id)}
          >
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Job title"
                  placeholder="Frontend Engineer"
                  value={exp.title}
                  onChange={(e) => patch(exp.id, { title: e.target.value })}
                />
                <TextField
                  label="Company"
                  placeholder="Acme Inc."
                  value={exp.company}
                  onChange={(e) => patch(exp.id, { company: e.target.value })}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Start date"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => patch(exp.id, { startDate: e.target.value })}
                />
                <TextField
                  label="End date"
                  type="month"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => patch(exp.id, { endDate: e.target.value })}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-300"
                  checked={exp.current}
                  onChange={(e) =>
                    patch(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : exp.endDate,
                    })
                  }
                />
                I currently work here
              </label>

              <TextAreaField
                label="Description"
                rows={3}
                hint="Optional"
                placeholder="Key responsibilities and achievements."
                value={exp.description}
                onChange={(e) => patch(exp.id, { description: e.target.value })}
              />
            </div>
          </EntryCard>
        ))}

        <AddItemButton label="Add experience" onClick={add} />
      </div>

      <StepFooter onBack={() => navigate('/onboarding/seeker/address')} />
    </form>
  )
}

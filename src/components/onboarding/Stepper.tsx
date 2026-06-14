import type { Step } from '../../onboarding/OnboardingContext'

export function Stepper({ steps, currentIndex }: { steps: Step[]; currentIndex: number }) {
  return (
    <ol className="space-y-1">
      {steps.map((step, index) => {
        const status =
          index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'todo'

        return (
          <li key={step.key} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <span
              className={[
                'flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold transition',
                status === 'done' && 'bg-brand-600 text-white',
                status === 'current' && 'bg-brand-100 text-brand-700 ring-2 ring-brand-300',
                status === 'todo' && 'bg-ink-300/40 text-ink-500',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {status === 'done' ? (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-wide text-ink-500">
                Step {index + 1}
              </p>
              <p
                className={[
                  'text-sm font-medium',
                  status === 'todo' ? 'text-ink-500' : 'text-ink-900',
                ].join(' ')}
              >
                {step.label}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

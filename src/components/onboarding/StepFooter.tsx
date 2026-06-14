import { Button } from '../ui/Button'

type StepFooterProps = {
  onBack?: () => void
  backLabel?: string
  nextLabel?: string
  submitting?: boolean
}

export function StepFooter({
  onBack,
  backLabel = 'Back',
  nextLabel = 'Continue',
  submitting = false,
}: StepFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-ink-300/50 pt-6">
      {onBack ? (
        <Button type="button" variant="outline" fullWidth={false} onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <span />
      )}
      <Button type="submit" fullWidth={false} loading={submitting} className="min-w-32">
        {nextLabel}
      </Button>
    </div>
  )
}

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  hint?: string
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor={fieldId} className="block text-sm font-medium text-ink-700">
            {label}
          </label>
          {hint && <span className="text-xs text-ink-500">{hint}</span>}
        </div>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          className={[
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink-900 shadow-sm outline-none transition',
            'placeholder:text-ink-500/70',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
            className ?? '',
          ].join(' ')}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </div>
    )
  },
)

TextAreaField.displayName = 'TextAreaField'

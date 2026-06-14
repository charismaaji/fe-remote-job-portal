import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  icon?: ReactNode
  trailing?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, icon, trailing, className, id, ...props }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-ink-700"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-500">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={[
              'w-full rounded-lg border bg-white py-2.5 text-sm text-ink-900 shadow-sm outline-none transition',
              'placeholder:text-ink-500/70',
              icon ? 'pl-10' : 'pl-3.5',
              trailing ? 'pr-11' : 'pr-3.5',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
              className ?? '',
            ].join(' ')}
            {...props}
          />
          {trailing && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {trailing}
            </span>
          )}
        </div>
        {error && (
          <p id={`${fieldId}-error`} className="text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  },
)

TextField.displayName = 'TextField'

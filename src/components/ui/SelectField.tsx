import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

type Option = { value: string; label: string }

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  placeholder?: string
  options: Option[]
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, placeholder, options, className, id, value, ...props }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId

    return (
      <div className="space-y-1.5">
        <label htmlFor={fieldId} className="block text-sm font-medium text-ink-700">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            value={value}
            aria-invalid={!!error}
            className={[
              'w-full appearance-none rounded-lg border bg-white py-2.5 pl-3.5 pr-10 text-sm shadow-sm outline-none transition',
              value ? 'text-ink-900' : 'text-ink-500/80',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
              className ?? '',
            ].join(' ')}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-ink-500">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </div>
    )
  },
)

SelectField.displayName = 'SelectField'

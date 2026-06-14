import type { ReactNode } from 'react'

export function Badge({
  children,
  className = '',
  dot,
}: {
  children: ReactNode
  className?: string
  dot?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        className,
      ].join(' ')}
    >
      {dot && <span className={['h-1.5 w-1.5 rounded-full', dot].join(' ')} />}
      {children}
    </span>
  )
}

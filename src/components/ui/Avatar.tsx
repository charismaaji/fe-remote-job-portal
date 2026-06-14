function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function Avatar({
  name,
  color = 'bg-brand-600',
  size = 'md',
}: {
  name: string
  color?: string
  size?: keyof typeof sizes
}) {
  return (
    <span
      className={[
        'flex flex-none items-center justify-center rounded-full font-semibold text-white',
        color,
        sizes[size],
      ].join(' ')}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}

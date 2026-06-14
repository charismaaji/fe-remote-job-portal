import type { ReactNode } from 'react'

export function EntryCard({
  title,
  onRemove,
  children,
}: {
  title: string
  onRemove: () => void
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-ink-300/70 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-700">{title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      {children}
    </div>
  )
}

export function AddItemButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 py-3 text-sm font-medium text-brand-600 transition hover:border-brand-300 hover:bg-brand-50/50"
    >
      <span className="text-base leading-none">+</span> {label}
    </button>
  )
}

export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-ink-300 bg-brand-50/30 px-4 py-6 text-center text-sm text-ink-500">
      {text}
    </p>
  )
}

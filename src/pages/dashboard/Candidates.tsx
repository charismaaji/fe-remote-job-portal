import { useMemo, useState, type DragEvent } from 'react'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { CandidateDrawer } from '../../components/dashboard/CandidateDrawer'
import { SearchIcon, StarIcon } from '../../components/dashboard/icons'
import {
  CANDIDATES,
  JOBS,
  PIPELINE_STAGES,
  jobById,
  type Candidate,
  type StageKey,
} from '../../mock/data'

export function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES)
  const [jobFilter, setJobFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<StageKey | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return candidates.filter((c) => {
      if (jobFilter !== 'all' && c.jobId !== jobFilter) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      )
    })
  }, [candidates, jobFilter, query])

  function setStage(id: string, stage: StageKey) {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)))
  }

  function setRating(id: string, rating: number) {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, rating } : c)))
  }

  function onDrop(stage: StageKey) {
    if (dragId) setStage(dragId, stage)
    setDragId(null)
    setDropTarget(null)
  }

  const selected = candidates.find((c) => c.id === selectedId) ?? null
  const rejectedCount = filtered.filter((c) => c.stage === 'rejected').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Candidates</h1>
          <p className="mt-1 text-sm text-ink-500">
            Drag candidates across stages to manage your pipeline.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-500">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or skill…"
            className="w-full rounded-lg border border-ink-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          <option value="all">All jobs</option>
          {JOBS.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
        <span className="text-sm text-ink-500">
          {filtered.length} candidate{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const items = filtered.filter((c) => c.stage === stage.key)
          return (
            <div
              key={stage.key}
              onDragOver={(e) => {
                e.preventDefault()
                setDropTarget(stage.key)
              }}
              onDragLeave={() => setDropTarget((t) => (t === stage.key ? null : t))}
              onDrop={() => onDrop(stage.key)}
              className={[
                'flex w-72 flex-none flex-col rounded-2xl border p-3 transition',
                dropTarget === stage.key
                  ? 'border-brand-400 bg-brand-50'
                  : 'border-ink-300/50 bg-brand-50/30',
              ].join(' ')}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                  <span className={['h-2 w-2 rounded-full', stage.dot].join(' ')} />
                  {stage.label}
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-500">
                  {items.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {items.map((c) => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    onClick={() => setSelectedId(c.id)}
                    onDragStart={() => setDragId(c.id)}
                    onDragEnd={() => setDragId(null)}
                  />
                ))}
                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-ink-300 px-3 py-6 text-center text-xs text-ink-500">
                    Drop here
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {rejectedCount > 0 && (
        <p className="text-sm text-ink-500">
          {rejectedCount} candidate{rejectedCount !== 1 ? 's' : ''} archived as rejected. Open a
          candidate to restore.
        </p>
      )}

      <CandidateDrawer
        candidate={selected}
        onClose={() => setSelectedId(null)}
        onStageChange={setStage}
        onRate={setRating}
      />
    </div>
  )
}

function CandidateCard({
  candidate: c,
  onClick,
  onDragStart,
  onDragEnd,
}: {
  candidate: Candidate
  onClick: () => void
  onDragStart: (e: DragEvent) => void
  onDragEnd: () => void
}) {
  return (
    <button
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="cursor-grab rounded-xl border border-ink-300/50 bg-white p-3 text-left shadow-sm transition hover:border-brand-300 hover:shadow active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <Avatar name={c.name} color={c.avatarColor} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
          <p className="truncate text-xs text-ink-500">{c.headline}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Badge className="bg-brand-50 text-brand-700">{c.matchScore}%</Badge>
        <span className="flex items-center gap-0.5 text-amber-500">
          <StarIcon className="h-3.5 w-3.5" filled={c.rating > 0} />
          <span className="text-xs font-medium text-ink-700">{c.rating || '—'}</span>
        </span>
      </div>
      <p className="mt-2 truncate text-xs text-ink-500">{jobById(c.jobId)?.title}</p>
    </button>
  )
}

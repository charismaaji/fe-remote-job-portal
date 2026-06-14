import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { CANDIDATES, jobById } from '../../mock/data'

const SLOTS = ['Today · 3:00 PM', 'Tomorrow · 11:00 AM', 'Thu · 2:00 PM', 'Fri · 9:30 AM']
const TYPES = ['Technical', 'Culture fit', 'Hiring manager', 'Final round']

export function Interviews() {
  const interviewing = CANDIDATES.filter((c) => c.stage === 'interview')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Interviews</h1>
        <p className="mt-1 text-sm text-ink-500">Your scheduled and upcoming interviews.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {interviewing.map((c, i) => (
          <div key={c.id} className="rounded-2xl border border-ink-300/50 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar name={c.name} color={c.avatarColor} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
                <p className="truncate text-xs text-ink-500">{jobById(c.jobId)?.title}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge className="bg-amber-50 text-amber-700">{TYPES[i % TYPES.length]}</Badge>
              <span className="text-xs text-ink-500">{c.timezone}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink-300/40 pt-4">
              <span className="text-sm font-semibold text-brand-700">{SLOTS[i % SLOTS.length]}</span>
              <button className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
                Join call
              </button>
            </div>
          </div>
        ))}
      </div>

      {interviewing.length === 0 && (
        <p className="rounded-2xl border border-dashed border-ink-300 px-6 py-12 text-center text-sm text-ink-500">
          No interviews scheduled yet.
        </p>
      )}
    </div>
  )
}

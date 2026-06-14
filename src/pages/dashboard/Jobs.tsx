import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { PlusIcon } from '../../components/dashboard/icons'
import { JOBS, type JobStatus } from '../../mock/data'

const STATUS_STYLES: Record<JobStatus, { label: string; className: string; dot: string }> = {
  open: { label: 'Open', className: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  paused: { label: 'Paused', className: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  closed: { label: 'Closed', className: 'bg-ink-300/30 text-ink-500', dot: 'bg-ink-500' },
}

const FILTERS: { key: 'all' | JobStatus; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'paused', label: 'Paused' },
  { key: 'closed', label: 'Closed' },
]

export function Jobs() {
  const [filter, setFilter] = useState<'all' | JobStatus>('all')
  const jobs = filter === 'all' ? JOBS : JOBS.filter((j) => j.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Jobs</h1>
          <p className="mt-1 text-sm text-ink-500">Manage your remote job postings.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          <PlusIcon className="h-4 w-4" /> Post a job
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={[
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition',
              filter === f.key
                ? 'bg-brand-600 text-white'
                : 'border border-ink-300 bg-white text-ink-700 hover:bg-brand-50',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-300/50 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-300/50 bg-brand-50/40 text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Type</th>
              <th className="hidden px-5 py-3 font-medium lg:table-cell">Region</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Applicants</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">Posted</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-300/40">
            {jobs.map((job) => {
              const s = STATUS_STYLES[job.status]
              return (
                <tr key={job.id} className="hover:bg-brand-50/30">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink-900">{job.title}</p>
                    <p className="text-xs text-ink-500">
                      {job.department} · {job.salary}
                    </p>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-700 md:table-cell">{job.type}</td>
                  <td className="hidden px-5 py-4 text-ink-700 lg:table-cell">{job.region}</td>
                  <td className="px-5 py-4">
                    <Badge className={s.className} dot={s.dot}>
                      {s.label}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/dashboard/candidates"
                      className="font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {job.applicants}
                    </Link>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-500 sm:table-cell">{job.postedAgo}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="rounded-lg border border-ink-300 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-brand-50">
                      Manage
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-ink-500">No jobs in this view.</p>
        )}
      </div>
    </div>
  )
}

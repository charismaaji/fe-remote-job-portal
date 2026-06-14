import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { COMPANY, JOBS } from '../../mock/data'

export function CompanyProfile() {
  const openJobs = JOBS.filter((j) => j.status === 'open').length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink-900">Company profile</h1>

      <div className="overflow-hidden rounded-2xl border border-ink-300/50 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-brand-600 to-brand-400" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-brand-700 text-2xl font-bold text-white">
                {COMPANY.name[0]}
              </span>
            </div>
            <button className="rounded-lg border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-brand-50">
              Edit profile
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold text-ink-900">{COMPANY.name}</h2>
          <p className="text-sm text-ink-500">{COMPANY.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="bg-brand-50 text-brand-700">{COMPANY.industry}</Badge>
            <Badge className="bg-ink-300/20 text-ink-700">{COMPANY.size}</Badge>
            <Badge className="bg-emerald-50 text-emerald-700" dot="bg-emerald-500">
              {openJobs} open roles
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-ink-900">Details</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Website" value={COMPANY.website} />
            <Row label="Industry" value={COMPANY.industry} />
            <Row label="Company size" value={COMPANY.size} />
            <Row label="Hiring regions" value="Global · EU · Americas · APAC" />
          </dl>
        </div>

        <div className="rounded-2xl border border-ink-300/50 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-ink-900">Hiring team</h3>
          <div className="mt-4 space-y-3">
            {['Jane Doe', 'Mark Lee', 'Sara Kim'].map((m, i) => (
              <div key={m} className="flex items-center gap-3">
                <Avatar name={m} size="sm" color={['bg-brand-600', 'bg-emerald-600', 'bg-amber-600'][i]} />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{m}</p>
                  <p className="text-xs text-ink-500">
                    {['Head of Talent', 'Engineering Manager', 'Recruiter'][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value}</dd>
    </div>
  )
}

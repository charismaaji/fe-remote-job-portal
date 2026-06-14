import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import {
  STAGES,
  jobById,
  stageMeta,
  type Candidate,
  type StageKey,
} from '../../mock/data'
import {
  ClockIcon,
  CloseIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
} from './icons'

type Props = {
  candidate: Candidate | null
  onClose: () => void
  onStageChange: (id: string, stage: StageKey) => void
  onRate: (id: string, rating: number) => void
}

export function CandidateDrawer({ candidate, onClose, onStageChange, onRate }: Props) {
  if (!candidate) return null

  // The page passes the live candidate object, so stage/rating stay in sync.
  const c = candidate
  const sm = stageMeta(c.stage)
  const job = jobById(c.jobId)

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-900/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl sm:max-w-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-300/50 p-6">
          <div className="flex gap-4">
            <Avatar name={c.name} color={c.avatarColor} size="lg" />
            <div>
              <h2 className="text-lg font-bold text-ink-900">{c.name}</h2>
              <p className="text-sm text-ink-500">{c.headline}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge className={sm.badge} dot={sm.dot}>
                  {sm.label}
                </Badge>
                <Badge className="bg-brand-50 text-brand-700">{c.matchScore}% match</Badge>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-500 hover:bg-brand-50" aria-label="Close">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Stage control */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Pipeline stage</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onStageChange(c.id, s.key)}
                  className={[
                    'rounded-full px-3 py-1.5 text-xs font-medium transition',
                    c.stage === s.key
                      ? 'bg-brand-600 text-white'
                      : 'border border-ink-300 bg-white text-ink-700 hover:bg-brand-50',
                  ].join(' ')}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          {/* Rating */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-500">Your rating</h3>
            <div className="mt-2 flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => onRate(c.id, n)} aria-label={`Rate ${n}`}>
                  <StarIcon className="h-6 w-6" filled={n <= c.rating} />
                </button>
              ))}
            </div>
          </section>

          {/* Contact + meta */}
          <section className="grid grid-cols-1 gap-3 rounded-xl bg-brand-50/40 p-4 text-sm sm:grid-cols-2">
            <InfoRow icon={<MailIcon className="h-4 w-4" />} text={c.email} />
            <InfoRow icon={<PhoneIcon className="h-4 w-4" />} text={c.phone} />
            <InfoRow icon={<MapPinIcon className="h-4 w-4" />} text={c.location} />
            <InfoRow icon={<ClockIcon className="h-4 w-4" />} text={c.timezone} />
          </section>

          <section>
            <h3 className="text-sm font-semibold text-ink-900">Applied for</h3>
            <p className="mt-1 text-sm text-ink-700">
              {job?.title} · {c.appliedAgo} · {c.experienceYears} yrs experience
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-ink-900">About</h3>
            <p className="mt-1 text-sm text-ink-700">{c.about}</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-ink-900">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {c.skills.map((skill) => (
                <Badge key={skill} className="bg-ink-300/20 text-ink-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-ink-900">Experience</h3>
            <div className="mt-3 space-y-4">
              {c.experiences.map((exp, i) => (
                <div key={i} className="border-l-2 border-brand-200 pl-4">
                  <p className="text-sm font-semibold text-ink-900">{exp.title}</p>
                  <p className="text-xs text-ink-500">
                    {exp.company} · {exp.period}
                  </p>
                  <p className="mt-1 text-sm text-ink-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-ink-900">Education</h3>
            <div className="mt-3 space-y-3">
              {c.educations.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-ink-900">{edu.school}</p>
                  <p className="text-xs text-ink-500">
                    {edu.degree} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {c.certificates.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-ink-900">Certificates</h3>
              <div className="mt-3 space-y-2">
                {c.certificates.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-900">{cert.name}</span>
                    <span className="text-xs text-ink-500">
                      {cert.issuer} · {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 border-t border-ink-300/50 p-4">
          <button className="flex-1 rounded-lg border border-ink-300 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-brand-50">
            Message
          </button>
          <button
            onClick={() => onStageChange(c.id, 'rejected')}
            className="rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            Reject
          </button>
          <button
            onClick={() => onStageChange(c.id, advance(c.stage))}
            className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Advance stage
          </button>
        </div>
      </aside>
    </div>
  )
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-ink-700">
      <span className="text-ink-500">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  )
}

const ORDER: StageKey[] = ['applied', 'screening', 'interview', 'offer', 'hired']

function advance(stage: StageKey): StageKey {
  const i = ORDER.indexOf(stage)
  if (i === -1 || i === ORDER.length - 1) return 'hired'
  return ORDER[i + 1]
}

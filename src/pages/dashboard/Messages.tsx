import { useState } from 'react'
import { Avatar } from '../../components/ui/Avatar'
import { CANDIDATES, jobById } from '../../mock/data'

const PREVIEW = [
  "Thanks! I'm available for a call this week.",
  'Sounds great — looking forward to it.',
  "I've attached my portfolio for review.",
  'Could we reschedule to Thursday?',
  'Appreciate the update, thank you!',
]

export function Messages() {
  const threads = CANDIDATES.slice(0, 5)
  const [activeId, setActiveId] = useState(threads[0]?.id)
  const active = threads.find((t) => t.id === activeId) ?? threads[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Messages</h1>
        <p className="mt-1 text-sm text-ink-500">Chat with candidates in your pipeline.</p>
      </div>

      <div className="grid h-[32rem] overflow-hidden rounded-2xl border border-ink-300/50 bg-white shadow-sm md:grid-cols-[300px_1fr]">
        {/* Thread list */}
        <div className="divide-y divide-ink-300/40 overflow-y-auto border-r border-ink-300/50">
          {threads.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={[
                'flex w-full items-center gap-3 p-4 text-left transition',
                t.id === active?.id ? 'bg-brand-50' : 'hover:bg-brand-50/50',
              ].join(' ')}
            >
              <Avatar name={t.name} color={t.avatarColor} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">{t.name}</p>
                <p className="truncate text-xs text-ink-500">{PREVIEW[i % PREVIEW.length]}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Conversation */}
        <div className="flex flex-col">
          {active && (
            <>
              <div className="flex items-center gap-3 border-b border-ink-300/50 p-4">
                <Avatar name={active.name} color={active.avatarColor} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{active.name}</p>
                  <p className="text-xs text-ink-500">{jobById(active.jobId)?.title}</p>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto bg-brand-50/20 p-4">
                <Bubble side="them">Hi! Thanks for considering my application.</Bubble>
                <Bubble side="me">
                  Hi {active.name.split(' ')[0]}, we'd love to set up an interview.
                </Bubble>
                <Bubble side="them">That works perfectly — I'm flexible this week.</Bubble>
              </div>
              <div className="border-t border-ink-300/50 p-3">
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Write a message…"
                    className="flex-1 rounded-lg border border-ink-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                  <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Bubble({ side, children }: { side: 'me' | 'them'; children: React.ReactNode }) {
  return (
    <div className={side === 'me' ? 'flex justify-end' : 'flex justify-start'}>
      <p
        className={[
          'max-w-xs rounded-2xl px-3.5 py-2 text-sm',
          side === 'me'
            ? 'rounded-br-sm bg-brand-600 text-white'
            : 'rounded-bl-sm bg-white text-ink-900 shadow-sm',
        ].join(' ')}
      >
        {children}
      </p>
    </div>
  )
}

export type StageKey =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export type StageMeta = {
  key: StageKey
  label: string
  // Tailwind utility fragments for dot / soft badge backgrounds.
  dot: string
  badge: string
}

export const STAGES: StageMeta[] = [
  { key: 'applied', label: 'Applied', dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700' },
  { key: 'screening', label: 'Screening', dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700' },
  { key: 'interview', label: 'Interview', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700' },
  { key: 'offer', label: 'Offer', dot: 'bg-brand-500', badge: 'bg-brand-50 text-brand-700' },
  { key: 'hired', label: 'Hired', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
  { key: 'rejected', label: 'Rejected', dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700' },
]

// Pipeline columns shown on the Kanban board (rejected handled separately).
export const PIPELINE_STAGES = STAGES.filter((s) => s.key !== 'rejected')

export type JobStatus = 'open' | 'paused' | 'closed'

export type Job = {
  id: string
  title: string
  department: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  region: string
  status: JobStatus
  salary: string
  postedAgo: string
  applicants: number
}

export type Experience = {
  title: string
  company: string
  period: string
  description: string
}

export type Education = {
  school: string
  degree: string
  period: string
}

export type Certificate = {
  name: string
  issuer: string
  year: string
}

export type Candidate = {
  id: string
  name: string
  headline: string
  jobId: string
  stage: StageKey
  location: string
  timezone: string
  email: string
  phone: string
  appliedAgo: string
  rating: number
  matchScore: number
  experienceYears: number
  avatarColor: string
  skills: string[]
  about: string
  experiences: Experience[]
  educations: Education[]
  certificates: Certificate[]
}

export const COMPANY = {
  name: 'Northwind Labs',
  tagline: 'Building the future of remote collaboration',
  industry: 'Software & IT',
  size: '51–200 employees',
  website: 'https://northwind.example',
}

export const JOBS: Job[] = [
  { id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering', type: 'Full-time', region: 'Remote · Global', status: 'open', salary: '$120k–$160k', postedAgo: '4d ago', applicants: 38 },
  { id: 'j2', title: 'Product Designer', department: 'Design', type: 'Full-time', region: 'Remote · EU', status: 'open', salary: '$90k–$120k', postedAgo: '1w ago', applicants: 24 },
  { id: 'j3', title: 'DevOps Engineer', department: 'Engineering', type: 'Full-time', region: 'Remote · Americas', status: 'open', salary: '$110k–$150k', postedAgo: '2w ago', applicants: 17 },
  { id: 'j4', title: 'Customer Success Manager', department: 'Customer', type: 'Full-time', region: 'Remote · Global', status: 'paused', salary: '$70k–$95k', postedAgo: '3w ago', applicants: 12 },
  { id: 'j5', title: 'Content Marketer', department: 'Marketing', type: 'Contract', region: 'Remote · Global', status: 'open', salary: '$50/hr', postedAgo: '5d ago', applicants: 9 },
  { id: 'j6', title: 'Backend Engineer (Go)', department: 'Engineering', type: 'Full-time', region: 'Remote · APAC', status: 'closed', salary: '$115k–$155k', postedAgo: '1mo ago', applicants: 41 },
]

const COLORS = [
  'bg-brand-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
  'bg-violet-600',
  'bg-teal-600',
  'bg-fuchsia-600',
]

function color(i: number) {
  return COLORS[i % COLORS.length]
}

export const CANDIDATES: Candidate[] = [
  {
    id: 'c1', name: 'Amara Okafor', headline: 'Senior Frontend Engineer', jobId: 'j1', stage: 'interview',
    location: 'Lagos, Nigeria', timezone: 'WAT (UTC+1)', email: 'amara.okafor@example.com', phone: '+234 802 000 1122',
    appliedAgo: '3d ago', rating: 5, matchScore: 94, experienceYears: 8, avatarColor: color(0),
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js', 'Testing'],
    about: 'Frontend engineer with 8 years building accessible, high-performance web apps for distributed teams.',
    experiences: [
      { title: 'Senior Frontend Engineer', company: 'Paystack', period: '2021 — Present', description: 'Led the design system and checkout rewrite used by thousands of merchants.' },
      { title: 'Frontend Engineer', company: 'Andela', period: '2017 — 2021', description: 'Built client dashboards in React across multiple remote engagements.' },
    ],
    educations: [{ school: 'University of Lagos', degree: 'B.Sc. Computer Science', period: '2013 — 2017' }],
    certificates: [{ name: 'Meta Front-End Developer', issuer: 'Meta', year: '2022' }],
  },
  {
    id: 'c2', name: 'Diego Martínez', headline: 'Frontend Engineer', jobId: 'j1', stage: 'screening',
    location: 'Buenos Aires, Argentina', timezone: 'ART (UTC-3)', email: 'diego.m@example.com', phone: '+54 11 5555 0190',
    appliedAgo: '1d ago', rating: 4, matchScore: 88, experienceYears: 5, avatarColor: color(1),
    skills: ['React', 'JavaScript', 'CSS', 'Redux'],
    about: 'Product-minded frontend engineer who loves polished UI and fast feedback loops.',
    experiences: [{ title: 'Frontend Engineer', company: 'MercadoLibre', period: '2019 — Present', description: 'Owned seller tooling features for the LATAM marketplace.' }],
    educations: [{ school: 'UTN Buenos Aires', degree: 'Software Engineering', period: '2014 — 2019' }],
    certificates: [],
  },
  {
    id: 'c3', name: 'Priya Nair', headline: 'Staff Frontend Engineer', jobId: 'j1', stage: 'offer',
    location: 'Bengaluru, India', timezone: 'IST (UTC+5:30)', email: 'priya.nair@example.com', phone: '+91 98800 11223',
    appliedAgo: '6d ago', rating: 5, matchScore: 96, experienceYears: 10, avatarColor: color(2),
    skills: ['React', 'TypeScript', 'Architecture', 'Performance', 'Mentoring'],
    about: 'Staff-level engineer focused on frontend architecture and web performance at scale.',
    experiences: [
      { title: 'Staff Engineer', company: 'Razorpay', period: '2020 — Present', description: 'Drove micro-frontend architecture and Core Web Vitals improvements.' },
      { title: 'Senior Engineer', company: 'Flipkart', period: '2015 — 2020', description: 'Built checkout and payments UI for millions of users.' },
    ],
    educations: [{ school: 'IIT Madras', degree: 'B.Tech', period: '2009 — 2013' }],
    certificates: [{ name: 'AWS Solutions Architect', issuer: 'AWS', year: '2021' }],
  },
  {
    id: 'c4', name: 'Sofia Rossi', headline: 'Product Designer', jobId: 'j2', stage: 'applied',
    location: 'Milan, Italy', timezone: 'CET (UTC+1)', email: 'sofia.rossi@example.com', phone: '+39 320 555 0145',
    appliedAgo: '5h ago', rating: 0, matchScore: 82, experienceYears: 6, avatarColor: color(3),
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    about: 'Designer crafting clean, usable products with a strong systems mindset.',
    experiences: [{ title: 'Product Designer', company: 'Bending Spoons', period: '2019 — Present', description: 'Designed consumer mobile apps with millions of downloads.' }],
    educations: [{ school: 'Politecnico di Milano', degree: 'M.Sc. Design', period: '2015 — 2018' }],
    certificates: [],
  },
  {
    id: 'c5', name: 'Liam Walsh', headline: 'Senior Product Designer', jobId: 'j2', stage: 'interview',
    location: 'Dublin, Ireland', timezone: 'GMT (UTC+0)', email: 'liam.walsh@example.com', phone: '+353 85 555 0178',
    appliedAgo: '2d ago', rating: 4, matchScore: 90, experienceYears: 9, avatarColor: color(4),
    skills: ['Figma', 'UX', 'Design Ops', 'Accessibility'],
    about: 'Senior designer who pairs research with crisp execution.',
    experiences: [{ title: 'Senior Designer', company: 'Intercom', period: '2018 — Present', description: 'Led design for the messenger surface.' }],
    educations: [{ school: 'NCAD Dublin', degree: 'BA Interaction Design', period: '2010 — 2014' }],
    certificates: [{ name: 'NN/g UX Certification', issuer: 'Nielsen Norman Group', year: '2020' }],
  },
  {
    id: 'c6', name: 'Yuki Tanaka', headline: 'UX Designer', jobId: 'j2', stage: 'screening',
    location: 'Tokyo, Japan', timezone: 'JST (UTC+9)', email: 'yuki.tanaka@example.com', phone: '+81 90 5555 0133',
    appliedAgo: '3d ago', rating: 3, matchScore: 79, experienceYears: 4, avatarColor: color(5),
    skills: ['Figma', 'Prototyping', 'Motion'],
    about: 'Detail-driven UX designer with a motion design background.',
    experiences: [{ title: 'UX Designer', company: 'Mercari', period: '2020 — Present', description: 'Improved onboarding conversion through iterative testing.' }],
    educations: [{ school: 'Tama Art University', degree: 'BA Design', period: '2014 — 2018' }],
    certificates: [],
  },
  {
    id: 'c7', name: 'Noah Schmidt', headline: 'DevOps Engineer', jobId: 'j3', stage: 'applied',
    location: 'Berlin, Germany', timezone: 'CET (UTC+1)', email: 'noah.schmidt@example.com', phone: '+49 151 5555 0166',
    appliedAgo: '8h ago', rating: 0, matchScore: 85, experienceYears: 7, avatarColor: color(6),
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Go'],
    about: 'Reliability-focused engineer automating everything that can be automated.',
    experiences: [{ title: 'DevOps Engineer', company: 'Zalando', period: '2018 — Present', description: 'Ran multi-region Kubernetes platforms for product teams.' }],
    educations: [{ school: 'TU Berlin', degree: 'M.Sc. Informatics', period: '2013 — 2018' }],
    certificates: [{ name: 'CKA', issuer: 'CNCF', year: '2021' }],
  },
  {
    id: 'c8', name: 'Aisha Rahman', headline: 'Site Reliability Engineer', jobId: 'j3', stage: 'interview',
    location: 'Dubai, UAE', timezone: 'GST (UTC+4)', email: 'aisha.r@example.com', phone: '+971 50 555 0121',
    appliedAgo: '4d ago', rating: 5, matchScore: 92, experienceYears: 8, avatarColor: color(7),
    skills: ['AWS', 'Observability', 'Terraform', 'Python'],
    about: 'SRE who keeps distributed systems calm under heavy load.',
    experiences: [{ title: 'SRE', company: 'Careem', period: '2017 — Present', description: 'Owned incident response and SLO program.' }],
    educations: [{ school: 'American University of Sharjah', degree: 'B.Sc. CS', period: '2009 — 2013' }],
    certificates: [{ name: 'AWS DevOps Pro', issuer: 'AWS', year: '2022' }],
  },
  {
    id: 'c9', name: 'Carlos Mendoza', headline: 'Customer Success Manager', jobId: 'j4', stage: 'applied',
    location: 'Mexico City, Mexico', timezone: 'CST (UTC-6)', email: 'carlos.m@example.com', phone: '+52 55 5555 0188',
    appliedAgo: '1d ago', rating: 0, matchScore: 76, experienceYears: 6, avatarColor: color(0),
    skills: ['SaaS', 'Onboarding', 'Retention', 'Spanish'],
    about: 'CSM passionate about turning customers into long-term advocates.',
    experiences: [{ title: 'CSM', company: 'Kavak', period: '2019 — Present', description: 'Managed a portfolio with 95% retention.' }],
    educations: [{ school: 'ITAM', degree: 'BA Business', period: '2011 — 2015' }],
    certificates: [],
  },
  {
    id: 'c10', name: 'Emma Larsson', headline: 'Content Marketer', jobId: 'j5', stage: 'screening',
    location: 'Stockholm, Sweden', timezone: 'CET (UTC+1)', email: 'emma.l@example.com', phone: '+46 70 555 0199',
    appliedAgo: '2d ago', rating: 4, matchScore: 81, experienceYears: 5, avatarColor: color(1),
    skills: ['SEO', 'Copywriting', 'Content Strategy'],
    about: 'B2B content marketer who turns complex products into clear stories.',
    experiences: [{ title: 'Content Lead', company: 'Klarna', period: '2020 — Present', description: 'Grew organic traffic 3x in 18 months.' }],
    educations: [{ school: 'Stockholm University', degree: 'BA Communications', period: '2013 — 2016' }],
    certificates: [{ name: 'HubSpot Content Marketing', issuer: 'HubSpot', year: '2021' }],
  },
  {
    id: 'c11', name: 'James Carter', headline: 'Frontend Engineer', jobId: 'j1', stage: 'hired',
    location: 'Austin, USA', timezone: 'CST (UTC-6)', email: 'james.carter@example.com', phone: '+1 512 555 0143',
    appliedAgo: '3w ago', rating: 5, matchScore: 91, experienceYears: 7, avatarColor: color(2),
    skills: ['React', 'TypeScript', 'Node'],
    about: 'Pragmatic engineer who ships reliable features fast.',
    experiences: [{ title: 'Frontend Engineer', company: 'Indeed', period: '2018 — Present', description: 'Built job-search UI used by millions daily.' }],
    educations: [{ school: 'UT Austin', degree: 'B.Sc. CS', period: '2011 — 2015' }],
    certificates: [],
  },
  {
    id: 'c12', name: 'Fatima Zahra', headline: 'Junior Designer', jobId: 'j2', stage: 'rejected',
    location: 'Casablanca, Morocco', timezone: 'WET (UTC+0)', email: 'fatima.z@example.com', phone: '+212 6 5555 0102',
    appliedAgo: '1w ago', rating: 2, matchScore: 64, experienceYears: 2, avatarColor: color(3),
    skills: ['Figma', 'Illustration'],
    about: 'Early-career designer with strong visual craft.',
    experiences: [{ title: 'Junior Designer', company: 'Freelance', period: '2022 — Present', description: 'Brand and UI work for small businesses.' }],
    educations: [{ school: 'ESAV Marrakech', degree: 'BA Visual Arts', period: '2017 — 2021' }],
    certificates: [],
  },
]

export function jobById(id: string) {
  return JOBS.find((j) => j.id === id)
}

export function stageMeta(key: StageKey) {
  return STAGES.find((s) => s.key === key)!
}

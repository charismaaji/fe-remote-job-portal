import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Role = 'company' | 'seeker'

export type CompanyInformation = {
  name: string
  industry: string
  size: string
  founded: string
  website: string
  about: string
}

export type CompanyBranding = {
  tagline: string
  description: string
  logoName: string
  linkedin: string
  twitter: string
}

export type CompanyAddress = {
  country: string
  state: string
  city: string
  street: string
  postalCode: string
  remoteFirst: boolean
}

export type CompanyContact = {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  preferredMethod: string
}

export type SeekerInformation = {
  fullName: string
  headline: string
  phone: string
  email: string
  about: string
}

export type SeekerAddress = {
  country: string
  state: string
  city: string
  street: string
  postalCode: string
  openToRelocate: boolean
}

export type Experience = {
  id: string
  title: string
  company: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type Education = {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

export type Certificate = {
  id: string
  name: string
  issuer: string
  issueDate: string
  credentialId: string
  url: string
}

export type OnboardingData = {
  role: Role | null
  // Company
  information: CompanyInformation
  branding: CompanyBranding
  address: CompanyAddress
  contact: CompanyContact
  // Job seeker
  seekerInformation: SeekerInformation
  seekerAddress: SeekerAddress
  experiences: Experience[]
  educations: Education[]
  certificates: Certificate[]
}

type ListKey = 'experiences' | 'educations' | 'certificates'

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

export const blankExperience = (): Experience => ({
  id: newId(),
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

export const blankEducation = (): Education => ({
  id: newId(),
  school: '',
  degree: '',
  field: '',
  startYear: '',
  endYear: '',
})

export const blankCertificate = (): Certificate => ({
  id: newId(),
  name: '',
  issuer: '',
  issueDate: '',
  credentialId: '',
  url: '',
})

const EMPTY: OnboardingData = {
  role: null,
  information: { name: '', industry: '', size: '', founded: '', website: '', about: '' },
  branding: { tagline: '', description: '', logoName: '', linkedin: '', twitter: '' },
  address: { country: '', state: '', city: '', street: '', postalCode: '', remoteFirst: true },
  contact: { fullName: '', jobTitle: '', email: '', phone: '', preferredMethod: 'email' },
  seekerInformation: { fullName: '', headline: '', phone: '', email: '', about: '' },
  seekerAddress: { country: '', state: '', city: '', street: '', postalCode: '', openToRelocate: false },
  experiences: [],
  educations: [],
  certificates: [],
}

const STORAGE_KEY = 'remotehub.onboarding'

type OnboardingContextValue = {
  data: OnboardingData
  setRole: (role: Role) => void
  update: <K extends keyof Omit<OnboardingData, 'role'>>(
    section: K,
    values: Partial<OnboardingData[K]>,
  ) => void
  setList: <K extends ListKey>(section: K, value: OnboardingData[K]) => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function loadInitial(): OnboardingData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    // ignore malformed storage
  }
  return EMPTY
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(loadInitial)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // storage may be unavailable; safe to ignore
    }
  }, [data])

  const value = useMemo<OnboardingContextValue>(
    () => ({
      data,
      setRole: (role) => setData((d) => ({ ...d, role })),
      update: (section, values) =>
        setData((d) => ({ ...d, [section]: { ...d[section], ...values } })),
      setList: (section, value) => setData((d) => ({ ...d, [section]: value })),
      reset: () => {
        sessionStorage.removeItem(STORAGE_KEY)
        setData(EMPTY)
      },
    }),
    [data],
  )

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}

export type Step = { key: string; label: string; path: string }

export const COMPANY_STEPS: Step[] = [
  { key: 'information', label: 'Company info', path: '/onboarding/company/information' },
  { key: 'branding', label: 'Branding', path: '/onboarding/company/branding' },
  { key: 'address', label: 'Address', path: '/onboarding/company/address' },
  { key: 'contact', label: 'Contact', path: '/onboarding/company/contact' },
]

export const SEEKER_STEPS: Step[] = [
  { key: 'information', label: 'Personal info', path: '/onboarding/seeker/information' },
  { key: 'address', label: 'Address', path: '/onboarding/seeker/address' },
  { key: 'experience', label: 'Experience', path: '/onboarding/seeker/experience' },
  { key: 'education', label: 'Education', path: '/onboarding/seeker/education' },
  { key: 'certificate', label: 'Certificates', path: '/onboarding/seeker/certificate' },
]

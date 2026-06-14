import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { SelectRole } from './pages/onboarding/SelectRole'
import { CompanyLayout } from './pages/onboarding/CompanyLayout'
import { CompanyInformation } from './pages/onboarding/CompanyInformation'
import { CompanyBranding } from './pages/onboarding/CompanyBranding'
import { CompanyAddress } from './pages/onboarding/CompanyAddress'
import { CompanyContact } from './pages/onboarding/CompanyContact'
import { OnboardingComplete } from './pages/onboarding/OnboardingComplete'
import { SeekerLayout } from './pages/onboarding/SeekerLayout'
import { SeekerInformation } from './pages/onboarding/SeekerInformation'
import { SeekerAddress } from './pages/onboarding/SeekerAddress'
import { SeekerExperience } from './pages/onboarding/SeekerExperience'
import { SeekerEducation } from './pages/onboarding/SeekerEducation'
import { SeekerCertificate } from './pages/onboarding/SeekerCertificate'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { Overview } from './pages/dashboard/Overview'
import { Jobs } from './pages/dashboard/Jobs'
import { Candidates } from './pages/dashboard/Candidates'
import { Interviews } from './pages/dashboard/Interviews'
import { Messages } from './pages/dashboard/Messages'
import { CompanyProfile } from './pages/dashboard/CompanyProfile'
import { Settings } from './pages/dashboard/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/onboarding/role" element={<SelectRole />} />

      <Route path="/onboarding/company/done" element={<OnboardingComplete />} />
      <Route path="/onboarding/company" element={<CompanyLayout />}>
        <Route index element={<Navigate to="information" replace />} />
        <Route path="information" element={<CompanyInformation />} />
        <Route path="branding" element={<CompanyBranding />} />
        <Route path="address" element={<CompanyAddress />} />
        <Route path="contact" element={<CompanyContact />} />
      </Route>

      <Route path="/onboarding/seeker/done" element={<OnboardingComplete />} />
      <Route path="/onboarding/seeker" element={<SeekerLayout />}>
        <Route index element={<Navigate to="information" replace />} />
        <Route path="information" element={<SeekerInformation />} />
        <Route path="address" element={<SeekerAddress />} />
        <Route path="experience" element={<SeekerExperience />} />
        <Route path="education" element={<SeekerEducation />} />
        <Route path="certificate" element={<SeekerCertificate />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="messages" element={<Messages />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

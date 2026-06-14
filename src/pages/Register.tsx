import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { EyeIcon, LockIcon, MailIcon } from '../components/ui/icons'
import { validateEmail, validatePassword } from '../lib/validation'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }
    setErrors(nextErrors)
    if (nextErrors.email || nextErrors.password) return

    setSubmitting(true)
    // Placeholder for the real registration API call.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitting(false)
    // Continue to onboarding to pick a role and finish setup.
    navigate('/onboarding/role')
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start applying to remote roles in minutes."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            icon={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="rounded-md p-1.5 text-ink-500 hover:text-ink-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />

          <p className="text-xs text-ink-500">
            By creating an account you agree to RemoteHub&apos;s{' '}
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-brand-600 hover:text-brand-700">
              Privacy Policy
            </a>
            .
          </p>

          <Button type="submit" loading={submitting}>
            Create account
          </Button>
        </form>

      <p className="mt-8 text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}

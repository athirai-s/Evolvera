'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SignupFormSchema, type SignupForm, PersonaData, Persona } from '@/types'
import { z } from 'zod'

const personas: PersonaData[] = [
  {
    id: 'student',
    emoji: '🎓',
    title: 'Student',
    subtitle: 'overworked undergrad who wants AI to finish assignments'
  },
  {
    id: 'silver-surfer',
    emoji: '👴',
    title: 'Silver Surfer (50–60)',
    subtitle: "doesn't want to be left behind"
  },
  {
    id: 'non-tech',
    emoji: '👩‍💼',
    title: 'Non-tech builder',
    subtitle: 'big ideas, no CS background'
  },
  {
    id: 'artist',
    emoji: '🎨',
    title: 'Doodle-to-DaVinci Artist',
    subtitle: 'turn stick figures into Pixar art'
  },
  {
    id: 'wannabe-hacker',
    emoji: '💻',
    title: 'Wannabe Hacker',
    subtitle: 'can\'t code "Hello World," but wants to sound smart'
  },
  {
    id: 'spreadsheet-samurai',
    emoji: '📊',
    title: 'Spreadsheet Samurai',
    subtitle: 'Excel warrior dreaming of AI macros'
  }
]

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    persona: '',
    role: ''
  })
  const [errors, setErrors] = useState<Partial<SignupForm>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setSubmitError('')

    try {
      // Validate form data
      SignupFormSchema.parse(formData)

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Registration failed')
        return
      }

      // Registration successful - redirect to signin
      router.push('/auth/signin?message=Registration successful! Please sign in.')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SignupForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignupForm] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setSubmitError('An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const selectedPersona = personas.find(p => p.id === formData.persona)

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            ✨ Join Pathify.ai
          </h1>
          <p className="text-gray-600">
            Create your account and get personalized AI tool recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-400'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-400'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-400'
              }`}
              placeholder="Choose a password (min. 6 characters)"
            />
            {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="persona" className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Persona
            </label>
            <select
              id="persona"
              name="persona"
              value={formData.persona}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all ${
                errors.persona ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-400'
              }`}
            >
              <option value="">Select a persona</option>
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.emoji} {persona.title}
                </option>
              ))}
            </select>
            {selectedPersona && (
              <p className="text-sm text-gray-600 mt-2 italic">
                {selectedPersona.subtitle}
              </p>
            )}
            {errors.persona && <p className="text-red-600 text-sm mt-2">{errors.persona}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Your Role/Profession
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all ${
                errors.role ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-purple-400'
              }`}
              placeholder="e.g., Teacher, Designer, Developer, Marketer"
            />
            {errors.role && <p className="text-red-600 text-sm mt-2">{errors.role}</p>}
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
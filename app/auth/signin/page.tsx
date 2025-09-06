'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SigninFormSchema, type SigninForm } from '@/types'
import { z } from 'zod'

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState<SigninForm>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<SigninForm>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setSubmitError('')

    try {
      // Validate form data
      SigninFormSchema.parse(formData)

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setSubmitError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/plan')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SigninForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SigninForm] = err.message
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof SigninForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            🔑 Sign In
          </h1>
          <p className="text-gray-600">
            Welcome back! Sign in to access your personalized AI tools.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}
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
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
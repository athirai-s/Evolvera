'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (session) {
      router.push('/plan')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Pathify.ai"
              width={120}
              height={120}
              className="h-24 md:h-32 w-auto"
            />
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Discover the Perfect AI Tools for Your Journey
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Get personalized AI tool recommendations tailored to your role and persona. 
            From students to professionals, find the perfect AI assistants to supercharge your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalized Recommendations</h3>
            <p className="text-sm text-gray-600">AI tools curated for your specific role and persona</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Actionable Guidance</h3>
            <p className="text-sm text-gray-600">Step-by-step instructions for each recommended tool</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
            >
              🌟 Get Started Free
            </Link>
            <Link 
              href="/auth/signin" 
              className="border-2 border-purple-300 text-purple-600 font-semibold py-4 px-8 rounded-full hover:bg-purple-50 transition-all duration-200 text-center"
            >
              Already have an account? Sign In
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Join thousands discovering their perfect AI toolkit
          </p>
        </div>

        {/* Sample Personas Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Choose Your Persona
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '🎓', title: 'Student' },
              { emoji: '👴', title: 'Silver Surfer' },
              { emoji: '👩‍💼', title: 'Non-tech Builder' },
              { emoji: '🎨', title: 'Artist' },
              { emoji: '💻', title: 'Developer' },
              { emoji: '📊', title: 'Data Analyst' }
            ].map((persona, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-purple-100 p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{persona.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{persona.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
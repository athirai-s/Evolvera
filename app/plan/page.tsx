import { Suspense } from 'react'
import PlanClient from '@/components/PlanClient'

export default function Plan() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            🚀 Your AI-Powered Journey
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Loading your personalized recommendations...
          </p>
        </div>
      </div>
    }>
      <PlanClient />
    </Suspense>
  )
}
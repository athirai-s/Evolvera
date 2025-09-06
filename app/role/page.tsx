import { Suspense } from 'react'
import RoleSelectClient from '@/components/RoleSelectClient'

export default function RoleSelect() {
  return (
    <Suspense fallback={
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            💼 What's Your Role?
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Loading role selection...
          </p>
        </div>
      </div>
    }>
      <RoleSelectClient />
    </Suspense>
  )
}
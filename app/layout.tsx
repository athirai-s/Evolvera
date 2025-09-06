import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import Header from '@/components/Header'
import AuthSessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'AI Pathfinder',
  description: 'Find the perfect AI tools for your persona and profession',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <AuthSessionProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
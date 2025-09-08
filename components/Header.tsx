'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="border-b border-purple-100 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <Image
              src="/logo.png"
              alt="Pathify.ai"
              width={40}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <div className="flex items-center space-x-6">
            {session && (
              <Link href="/forum" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-50">
                🗣️ AI Forum
              </Link>
            )}
            
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-purple-500"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{session.user.name}</span>
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-50">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
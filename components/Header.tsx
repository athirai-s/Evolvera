import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-purple-100 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
            🧭 AI Pathfinder
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/forum" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              🗣️ Forum
            </Link>
            <Link href="/overlay-demo" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              ✨ Overlay Demo
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
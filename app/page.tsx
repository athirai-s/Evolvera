'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PersonaCard from '@/components/PersonaCard'
import { PersonaData, Persona } from '@/types'

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

export default function PersonaSelect() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const router = useRouter()

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona)
  }

  const handleContinue = () => {
    if (selectedPersona) {
      router.push(`/role?persona=${selectedPersona}`)
    }
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          🎯 Choose Your Persona
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select the persona that best describes you to get personalized AI tool recommendations.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg border border-purple-100 overflow-hidden">
          {personas.map((persona, index) => (
            <button
              key={persona.id}
              onClick={() => handlePersonaSelect(persona.id)}
              className={`w-full text-left p-6 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-b border-purple-50 last:border-b-0 focus:outline-none focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 ${
                selectedPersona === persona.id
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-inner'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl flex-shrink-0">{persona.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{persona.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{persona.subtitle}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-200 ${
                  selectedPersona === persona.id
                    ? 'bg-purple-500 border-purple-500 shadow-lg'
                    : 'border-gray-300 hover:border-purple-400'
                }`}>
                  {selectedPersona === persona.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedPersona}
          className="rounded-full px-8 py-4 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          Continue to Role Selection →
        </button>
      </div>
    </div>
  )
}
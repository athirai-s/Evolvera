import { PersonaData, Persona } from '@/types'

interface PersonaCardProps {
  persona: PersonaData
  isSelected: boolean
  onSelect: (persona: Persona) => void
}

export default function PersonaCard({ persona, isSelected, onSelect }: PersonaCardProps) {
  return (
    <button
      onClick={() => onSelect(persona.id)}
      className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 ${
        isSelected
          ? 'border-black shadow-md bg-gray-50'
          : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
      }`}
    >
      <div className="text-3xl mb-3">{persona.emoji}</div>
      <h3 className="text-lg font-medium mb-2">{persona.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{persona.subtitle}</p>
    </button>
  )
}
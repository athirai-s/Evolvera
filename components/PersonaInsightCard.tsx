interface PersonaInsightCardProps {
  persona: string
}

const personaInsights: Record<string, string[]> = {
  student: [
    'Other students spend 40% more time on research tools than writing tools.',
    'Top performers in your persona use automation tools 3x more frequently.',
    'Students like you find voice tools most helpful for lecture transcription.'
  ],
  'silver-surfer': [
    'Other Silver Surfers spend more time in voice tools than you.',
    'Your peer group prefers simple, intuitive interfaces over complex features.',
    'Most successful Silver Surfers start with just 2-3 core tools.'
  ],
  'non-tech': [
    'Non-tech builders in your category favor no-code automation tools.',
    'Your peers typically master one tool deeply before adding another.',
    'Visual tools like design assistants show highest adoption in your group.'
  ],
  artist: [
    'Doodle-to-DaVinci artists spend 60% of their time in design tools.',
    'Your peer group experiments with 5+ different creative AI tools monthly.',
    'Artists like you see the biggest productivity gains from image generation.'
  ],
  'wannabe-hacker': [
    'Wannabe Hackers love automation tools but underuse learning resources.',
    'Your peer group spends surprisingly little time on actual coding tools.',
    'Most successful wannabe hackers focus on understanding before building.'
  ],
  'spreadsheet-samurai': [
    'Spreadsheet Samurai peers use data analysis tools 70% of the time.',
    'Your group shows highest satisfaction with automation and productivity tools.',
    'Excel warriors like you benefit most from AI-powered formula generation.'
  ]
}

export default function PersonaInsightCard({ persona }: PersonaInsightCardProps) {
  const insights = personaInsights[persona] || personaInsights['student']
  const randomInsight = insights[Math.floor(Math.random() * insights.length)]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        🎯 Your Persona Insights
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {randomInsight}
        </p>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Based on aggregated usage patterns from similar personas.</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Your progress</span>
          <span className="font-medium text-gray-900">🌟 Exploring</span>
        </div>
        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full w-1/3 transition-all duration-300"></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Keep experimenting! You're on track to become an AI power user.
        </p>
      </div>
    </div>
  )
}
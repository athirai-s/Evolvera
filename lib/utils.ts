export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getPersonaTitle(persona: string): string {
  const titles: Record<string, string> = {
    'student': '🎓 Student',
    'silver-surfer': '👴 Silver Surfer',
    'non-tech': '👩‍💼 Non-tech Builder',
    'artist': '🎨 Doodle-to-DaVinci Artist',
    'wannabe-hacker': '💻 Wannabe Hacker',
    'spreadsheet-samurai': '📊 Spreadsheet Samurai'
  }
  return titles[persona] || persona
}

export function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  return Promise.reject(new Error('Clipboard not supported'))
}

export function generateShareUrl(persona: string, role: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
  
  return `${baseUrl}/plan?persona=${encodeURIComponent(persona)}&role=${encodeURIComponent(role)}`
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RolePills from '@/components/RolePills'
import { RoleData } from '@/types'

const commonRoles: RoleData[] = [
  { id: 'nurse', name: 'Nurse' },
  { id: 'accountant', name: 'Accountant' },
  { id: 'teacher', name: 'Teacher' },
  { id: 'designer', name: 'Designer' },
  { id: 'marketer', name: 'Marketer' },
  { id: 'sales', name: 'Sales' },
  { id: 'product-manager', name: 'Product Manager' },
  { id: 'data-analyst', name: 'Data Analyst' },
  { id: 'engineer', name: 'Engineer' },
  { id: 'researcher', name: 'Researcher' },
  { id: 'founder', name: 'Founder' }
]

const roleSuggestions = [
  // Tech & Engineering
  'Software Developer', 'Data Scientist', 'DevOps Engineer', 'Computer Scientist',
  'Machine Learning Engineer', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer',
  'Mobile Developer', 'Game Developer', 'Cybersecurity Analyst', 'Cloud Architect',
  'AI Researcher', 'Blockchain Developer', 'Quality Assurance Engineer', 'Site Reliability Engineer',
  
  // Design & Creative
  'UX Designer', 'UI Designer', 'Graphic Designer', 'Product Designer',
  'Video Editor', 'Motion Graphics Designer', 'Web Designer', '3D Artist',
  'Illustrator', 'Animator', 'Art Director', 'Creative Director',
  
  // Business & Management
  'Product Manager', 'Project Manager', 'Business Analyst', 'Operations Manager',
  'Marketing Manager', 'Sales Manager', 'HR Manager', 'Financial Analyst',
  'Strategy Consultant', 'Management Consultant', 'Scrum Master', 'Team Lead',
  'CEO', 'Entrepreneur', 'Founder', 'General Manager',
  
  // Marketing & Sales
  'Digital Marketing Manager', 'Content Marketing Manager', 'SEO Specialist', 'PPC Specialist',
  'Social Media Manager', 'Content Creator', 'Copywriter', 'Brand Manager',
  'Growth Hacker', 'Sales Representative', 'Account Executive', 'Customer Success Manager',
  
  // Content & Communication
  'Content Writer', 'Technical Writer', 'Journalist', 'Editor',
  'Public Relations Manager', 'Communications Manager', 'Social Media Coordinator',
  'Content Strategist', 'Blogger', 'Podcaster', 'Video Producer',
  
  // Healthcare & Science
  'Doctor', 'Nurse', 'Researcher', 'Data Analyst', 'Bioinformatician',
  'Medical Writer', 'Clinical Research Coordinator', 'Pharmacist', 'Lab Technician',
  'Healthcare Administrator', 'Public Health Analyst',
  
  // Education & Training
  'Teacher', 'Professor', 'Instructional Designer', 'Corporate Trainer',
  'Education Coordinator', 'Curriculum Developer', 'Academic Researcher', 'Tutor',
  
  // Finance & Accounting
  'Accountant', 'Financial Advisor', 'Investment Analyst', 'Risk Analyst',
  'Controller', 'CFO', 'Bookkeeper', 'Tax Specialist', 'Credit Analyst',
  
  // Other Professions
  'Lawyer', 'Paralegal', 'Real Estate Agent', 'Insurance Agent',
  'Customer Service Representative', 'Administrative Assistant', 'Executive Assistant',
  'Recruiter', 'Librarian', 'Translator', 'Psychologist', 'Social Worker'
]

export default function RoleSelectClient() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [customRole, setCustomRole] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const persona = searchParams.get('persona')

  useEffect(() => {
    if (!persona) {
      router.push('/')
    }
  }, [persona, router])

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setCustomRole('')
  }

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value)
    setSelectedRole('')
    
    if (value.length > 1) {
      const searchTerm = value.toLowerCase()
      const filtered = roleSuggestions.filter(role => {
        const roleLower = role.toLowerCase()
        return roleLower.includes(searchTerm) || 
               roleLower.split(' ').some(word => word.startsWith(searchTerm)) ||
               searchTerm.split(' ').some(term => roleLower.includes(term))
      })
      
      const sortedFiltered = filtered.sort((a, b) => {
        const aLower = a.toLowerCase()
        const bLower = b.toLowerCase()
        
        if (aLower === searchTerm) return -1
        if (bLower === searchTerm) return 1
        if (aLower.startsWith(searchTerm)) return -1
        if (bLower.startsWith(searchTerm)) return 1
        return 0
      })
      
      setSuggestions(sortedFiltered.slice(0, 8))
      setShowSuggestions(sortedFiltered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setCustomRole(suggestion)
    setShowSuggestions(false)
  }

  const handleContinue = () => {
    const role = selectedRole || customRole.trim()
    if (role && persona) {
      router.push(`/plan?persona=${persona}&role=${encodeURIComponent(role)}`)
    }
  }

  const currentRole = selectedRole || customRole.trim()

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          💼 What's Your Role?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select your profession to get AI tools tailored to your specific needs.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Popular Roles</h2>
          <RolePills
            roles={commonRoles}
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Or Enter Your Role</h2>
          <div className="relative">
            <input
              type="text"
              value={customRole}
              onChange={(e) => handleCustomRoleChange(e.target.value)}
              placeholder="e.g., Software Developer, Marketing Manager..."
              className="w-full px-6 py-4 border border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 text-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
            />
            
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-purple-200 rounded-2xl mt-2 shadow-lg z-10 max-h-64 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 first:rounded-t-2xl last:rounded-b-2xl transition-all duration-200 border-b border-purple-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <div className="px-6 py-4 text-gray-500 text-sm rounded-2xl">
                    No matches found, but you can enter any role!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!currentRole}
            className="rounded-full px-8 py-4 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            Get My AI Recommendations ✨
          </button>
        </div>
      </div>
    </div>
  )
}
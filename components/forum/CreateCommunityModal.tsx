import { useState } from 'react'
import { CreateCommunity } from '@/types'

interface CreateCommunityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (communityData: CreateCommunity) => Promise<void>
}

const categories = [
  'AI Models',
  'Tools',
  'Discussion',
  'News', 
  'Help',
  'Other'
]

export default function CreateCommunityModal({ isOpen, onClose, onSubmit }: CreateCommunityModalProps) {
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<CreateCommunity['category']>('Other')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [nameError, setNameError] = useState('')

  const validateName = (value: string) => {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setNameError('Community name can only contain letters and numbers')
      return false
    }
    if (value.length < 1 || value.length > 50) {
      setNameError('Community name must be 1-50 characters')
      return false
    }
    setNameError('')
    return true
  }

  const handleNameChange = (value: string) => {
    setName(value.toLowerCase())
    setDisplayName(value)
    validateName(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !displayName.trim() || !description.trim() || nameError) return

    if (!validateName(name)) return

    setIsSubmitting(true)
    try {
      const communityData: CreateCommunity = {
        name: name.trim().toLowerCase(),
        displayName: displayName.trim(),
        description: description.trim(),
        category
      }

      await onSubmit(communityData)
      
      // Reset form
      setName('')
      setDisplayName('')
      setDescription('')
      setCategory('Other')
      setNameError('')
      onClose()
    } catch (error) {
      console.error('Error creating community:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create New Community</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Community Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Name *
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-1">/r</span>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="gpt4, nanobana, aitools..."
                required
                maxLength={50}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  nameError ? 'border-red-300 focus:border-red-400' : 'border-gray-300 focus:border-purple-400'
                }`}
              />
            </div>
            {nameError && (
              <p className="text-red-600 text-xs mt-1">{nameError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Only letters and numbers allowed. This will be your community URL.
            </p>
          </div>

          {/* Display Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name *
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="GPT-4, Nano Bana, AI Tools..."
              required
              maxLength={100}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Friendly name shown to users
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your community is about..."
              required
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {description.length}/500 characters
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CreateCommunity['category'])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Guidelines */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Community Guidelines</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Keep discussions respectful and on-topic</li>
              <li>• No spam or self-promotion</li>
              <li>• Share constructive feedback about AI models and tools</li>
              <li>• Help build a positive learning community</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !displayName.trim() || !description.trim() || !!nameError}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isSubmitting ? 'Creating Community...' : 'Create Community'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
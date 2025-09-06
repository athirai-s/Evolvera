'use client'

import { useState, useEffect } from 'react'
import { Community, Post, CreatePost, CreateCommunity } from '@/types'
import PostCard from '@/components/forum/PostCard'
import CommunityCard from '@/components/forum/CommunityCard'
import CreatePostModal from '@/components/forum/CreatePostModal'
import CreateCommunityModal from '@/components/forum/CreateCommunityModal'

export default function ForumPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'communities'>('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [communitiesResponse, postsResponse] = await Promise.all([
        fetch('/api/forum/communities'),
        fetch(`/api/forum/posts${activeTab === 'trending' ? '?trending=true' : ''}`)
      ])

      if (!communitiesResponse.ok || !postsResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const [communitiesData, postsData] = await Promise.all([
        communitiesResponse.json(),
        postsResponse.json()
      ])

      if (communitiesData.success) {
        setCommunities(communitiesData.data)
      }

      if (postsData.success) {
        setPosts(postsData.data)
      }
    } catch (err) {
      setError('Failed to load forum data')
      console.error('Error fetching forum data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (postData: CreatePost) => {
    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const data = await response.json()
      if (data.success) {
        setPosts(prev => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  const handleCreateCommunity = async (communityData: CreateCommunity) => {
    try {
      const response = await fetch('/api/forum/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(communityData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create community')
      }

      const data = await response.json()
      if (data.success) {
        setCommunities(prev => [data.data, ...prev])
      }
    } catch (error) {
      console.error('Error creating community:', error)
      throw error
    }
  }

  const handleVotePost = async (postId: string, vote: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vote })
      })

      if (!response.ok) {
        throw new Error('Failed to vote')
      }

      const data = await response.json()
      if (data.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? data.data : post
        ))
      }
    } catch (error) {
      console.error('Error voting on post:', error)
    }
  }

  const filteredCommunities = communities.filter(community =>
    community.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">⚠️</div>
          <h3 className="text-lg font-medium text-red-900 mb-1">Unable to Load Forum</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🗣️ AI Community Forum
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join discussions about AI models, share your experiences, and rate the latest tools.
          Create communities like /rGPT4, /rNanoBana, or search existing ones.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          + Create Post
        </button>
        <button
          onClick={() => setIsCreateCommunityModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          + Create Community
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { key: 'trending', label: '🔥 Trending', desc: 'Hot discussions' },
          { key: 'new', label: '🆕 New', desc: 'Latest posts' },
          { key: 'communities', label: '🏘️ Communities', desc: 'Browse communities' }
        ].map(({ key, label, desc }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div>{label}</div>
            <div className="text-xs opacity-75">{desc}</div>
          </button>
        ))}
      </div>

      {/* Search Bar for Communities */}
      {activeTab === 'communities' && (
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search communities..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'communities' ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {searchQuery ? 'Search Results' : 'All Communities'}
            </h2>
            <span className="text-gray-600">
              {filteredCommunities.length} communities
            </span>
          </div>

          {filteredCommunities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Communities Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a community!'}
              </p>
              <button
                onClick={() => setIsCreateCommunityModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
              >
                Create Community
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {activeTab === 'trending' ? '🔥 Trending Posts' : '🆕 Latest Posts'}
            </h2>
            <span className="text-gray-600">
              {posts.length} posts
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Posts Yet</h3>
              <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Create First Post
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showCommunity={true}
                  onVote={handleVotePost}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        communities={communities}
        onSubmit={handleCreatePost}
      />

      <CreateCommunityModal
        isOpen={isCreateCommunityModalOpen}
        onClose={() => setIsCreateCommunityModalOpen(false)}
        onSubmit={handleCreateCommunity}
      />
    </div>
  )
}
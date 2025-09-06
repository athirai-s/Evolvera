import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'
import { PostVoteSchema } from '@/types'
import { z } from 'zod'

interface RouteParams {
  params: {
    id: string
  }
}

const VoteRequestSchema = z.object({
  vote: PostVoteSchema
})

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { vote } = VoteRequestSchema.parse(body)
    
    // In a real app, you'd get user info from authentication
    const userId = 'user123'
    
    const post = ForumService.votePost(params.id, userId, vote)
    
    return NextResponse.json({
      success: true,
      data: post
    })

  } catch (error) {
    console.error('Error voting on post:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid vote data',
        details: error.errors
      }, { status: 400 })
    }
    
    if (error instanceof Error && error.message === 'Post not found') {
      return NextResponse.json({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
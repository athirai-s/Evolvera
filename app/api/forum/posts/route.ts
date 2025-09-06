import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'
import { CreatePostSchema } from '@/types'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const communityId = searchParams.get('communityId')
    const trending = searchParams.get('trending') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let posts
    
    if (trending) {
      posts = ForumService.getTrendingPosts(limit)
    } else {
      posts = ForumService.getPosts(communityId || undefined, limit, offset)
    }

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreatePostSchema.parse(body)
    
    // In a real app, you'd get user info from authentication
    const userId = 'user123'
    const userName = 'TestUser'
    
    const post = ForumService.createPost(validatedData, userId, userName)
    
    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating post:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }
    
    if (error instanceof Error && error.message === 'Community not found') {
      return NextResponse.json({
        success: false,
        error: 'Community not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
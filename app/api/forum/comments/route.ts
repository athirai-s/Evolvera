import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'
import { CreateCommentSchema } from '@/types'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json({
        success: false,
        error: 'postId parameter is required'
      }, { status: 400 })
    }

    const comments = ForumService.getComments(postId)

    return NextResponse.json({
      success: true,
      data: comments,
      total: comments.length
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreateCommentSchema.parse(body)
    
    // In a real app, you'd get user info from authentication
    const userId = 'user123'
    const userName = 'TestUser'
    
    const comment = ForumService.createComment(validatedData, userId, userName)
    
    return NextResponse.json({
      success: true,
      data: comment
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating comment:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
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
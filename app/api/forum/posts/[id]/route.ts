import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = ForumService.getPost(params.id)
    
    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
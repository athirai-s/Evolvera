import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const community = ForumService.getCommunity(params.id)
    
    if (!community) {
      return NextResponse.json({
        success: false,
        error: 'Community not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: community
    })
  } catch (error) {
    console.error('Error fetching community:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
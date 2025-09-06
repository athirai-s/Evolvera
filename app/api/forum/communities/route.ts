import { NextRequest, NextResponse } from 'next/server'
import { ForumService } from '@/lib/forumService'
import { CreateCommunitySchema } from '@/types'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const popular = searchParams.get('popular') === 'true'

    let communities
    
    if (search) {
      communities = ForumService.searchCommunities(search)
    } else if (popular) {
      communities = ForumService.getPopularCommunities(10)
    } else {
      communities = ForumService.getCommunities()
    }

    return NextResponse.json({
      success: true,
      data: communities,
      total: communities.length
    })
  } catch (error) {
    console.error('Error fetching communities:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreateCommunitySchema.parse(body)
    
    // In a real app, you'd get user info from authentication
    const userId = 'user123'
    const userName = 'TestUser'
    
    const community = ForumService.createCommunity(validatedData, userId, userName)
    
    return NextResponse.json({
      success: true,
      data: community
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating community:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }
    
    if (error instanceof Error && error.message === 'Community already exists') {
      return NextResponse.json({
        success: false,
        error: 'A community with this name already exists'
      }, { status: 409 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
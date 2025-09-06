import { NextRequest, NextResponse } from 'next/server'
import { CourseService } from '@/lib/courseService'
import { z } from 'zod'

const CourseQuerySchema = z.object({
  topic: z.string().min(1),
  role: z.string().min(1),
  platform: z.enum(['YouTube', 'Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Skillshare', 'Pluralsight']).optional(),
  maxResults: z.number().int().min(1).max(50).optional().default(10),
  minRating: z.number().min(0).max(5).optional().default(3.0)
})

const PopularCoursesQuerySchema = z.object({
  role: z.string().min(1),
  limit: z.number().int().min(1).max(20).optional().default(5)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Check if this is a request for popular courses
    if (searchParams.get('popular') === 'true') {
      const queryParams = {
        role: searchParams.get('role'),
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
      }
      
      const validatedQuery = PopularCoursesQuerySchema.parse(queryParams)
      const courses = await CourseService.getPopularCourses(validatedQuery.role, validatedQuery.limit)
      
      return NextResponse.json({
        success: true,
        data: courses,
        total: courses.length,
        type: 'popular',
        query: validatedQuery
      })
    }
    
    // Regular course search
    const queryParams = {
      topic: searchParams.get('topic'),
      role: searchParams.get('role'),
      platform: searchParams.get('platform'),
      maxResults: searchParams.get('maxResults') ? parseInt(searchParams.get('maxResults')!) : undefined,
      minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined
    }

    const validatedQuery = CourseQuerySchema.parse(queryParams)
    const courses = await CourseService.getCourses(validatedQuery)
    
    return NextResponse.json({
      success: true,
      data: courses,
      total: courses.length,
      type: 'search',
      query: validatedQuery
    })

  } catch (error) {
    console.error('Error fetching courses:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid query parameters',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check if this is a request for popular courses
    if (body.popular === true) {
      const validatedQuery = PopularCoursesQuerySchema.parse(body)
      const courses = await CourseService.getPopularCourses(validatedQuery.role, validatedQuery.limit)
      
      return NextResponse.json({
        success: true,
        data: courses,
        total: courses.length,
        type: 'popular',
        query: validatedQuery
      })
    }
    
    // Regular course search
    const validatedQuery = CourseQuerySchema.parse(body)
    const courses = await CourseService.getCourses(validatedQuery)
    
    return NextResponse.json({
      success: true,
      data: courses,
      total: courses.length,
      type: 'search',
      query: validatedQuery
    })

  } catch (error) {
    console.error('Error fetching courses:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request body',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
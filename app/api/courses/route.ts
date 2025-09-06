import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { CourseSchema } from '@/types'
import { z } from 'zod'
import { getCoursesForTool } from '@/data/courseDatabase'

const requestSchema = z.object({
  toolName: z.string(),
  persona: z.string().optional(),
  role: z.string().optional()
})

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute
    return true
  }
  
  if (limit.count >= 10) {
    return false
  }
  
  limit.count++
  return true
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const systemPrompt = `You are an assistant that creates course search links for AI tools.

Always return STRICT JSON matching this schema:
{
  "courses": [
    {
      "title": "string", 
      "platform": "YouTube|Coursera|Udemy|edX|LinkedIn Learning|Skillshare",
      "url": "https://...",
      "rating": 4.5,
      "duration": "string"
    }
  ]
}

Create WORKING search URLs that will show real courses for the tool:

URL Templates (replace TOOL_NAME with the actual tool name):
- YouTube: https://www.youtube.com/results?search_query=TOOL_NAME+tutorial
- Udemy: https://www.udemy.com/courses/search/?q=TOOL_NAME
- Coursera: https://www.coursera.org/search?query=TOOL_NAME  
- LinkedIn Learning: https://www.linkedin.com/learning/search?keywords=TOOL_NAME
- Skillshare: https://www.skillshare.com/search?query=TOOL_NAME
- edX: https://www.edx.org/search?q=TOOL_NAME

These URLs are guaranteed to work and show real courses.
URL encode spaces as + in the query.
Create realistic course titles that would appear in search results.
Use ratings between 4.0-4.8 and realistic durations.

Return 3-4 courses with variety across platforms. JSON ONLY.`

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { toolName, persona, role } = requestSchema.parse(body)

    // First, try to get courses from our curated database
    const curatedCourses = getCoursesForTool(toolName)
    
    if (curatedCourses.length > 0) {
      // Return curated courses if available
      return NextResponse.json({ courses: curatedCourses })
    }

    // Fall back to AI generation if no curated courses found
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const userContent = `Tool: "${toolName}"
${persona && role ? `User Context: ${persona} working as ${role}` : ''}

Create 3-4 course search URLs for learning ${toolName}:

Use these exact URL patterns:
- YouTube: https://www.youtube.com/results?search_query=${encodeURIComponent(toolName)}+tutorial
- Udemy: https://www.udemy.com/courses/search/?q=${encodeURIComponent(toolName)}
- Coursera: https://www.coursera.org/search?query=${encodeURIComponent(toolName)}
- LinkedIn Learning: https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(toolName)}

Create realistic course titles that would appear for ${toolName}.
Include variety: beginner tutorials, complete courses, masterclasses.
Use realistic ratings (4.0-4.8) and durations (30 mins - 5 hours).

Return JSON ONLY with working search URLs.`

    let completion
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.2,
        max_tokens: 1500
      })
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError)
      throw new Error('Failed to generate course recommendations')
    }

    const responseText = completion.choices[0]?.message?.content?.trim()
    
    if (!responseText) {
      throw new Error('Empty response from AI')
    }

    let parsedResponse
    try {
      parsedResponse = JSON.parse(responseText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Response text:', responseText)
      throw new Error('Failed to parse AI response as JSON')
    }

    // Validate each course
    const validatedCourses = parsedResponse.courses.map((course: any) => 
      CourseSchema.parse(course)
    )

    return NextResponse.json({ courses: validatedCourses })

  } catch (error) {
    console.error('Courses API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    // Return fallback courses if API fails
    const fallbackCourses = [
      {
        title: `Learn ${request.body?.toolName || 'AI Tool'} - Beginner Tutorial`,
        platform: 'YouTube' as const,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(request.body?.toolName || 'AI tutorial')}`,
        rating: 4.2,
        duration: '30 mins'
      },
      {
        title: `${request.body?.toolName || 'AI Tool'} Complete Course`,
        platform: 'Udemy' as const,
        url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(request.body?.toolName || 'AI')}`,
        rating: 4.4,
        duration: '3 hours'
      }
    ]

    return NextResponse.json({ courses: fallbackCourses })
  }
}
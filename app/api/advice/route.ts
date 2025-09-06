import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const requestSchema = z.object({
  persona: z.string(),
  role: z.string()
})

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute
    return true
  }
  
  if (limit.count >= 3) {
    return false
  }
  
  limit.count++
  return true
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const systemPrompt = `You are an AI assistant that provides personalized, actionable step-by-step instructions for using AI tools based on a person's career field. 

Always return STRICT JSON matching this schema:
{
  "advice": [
    {
      "category": "string",
      "title": "string", 
      "steps": ["string", "string", "string"],
      "tools": ["string", "string"],
      "timeEstimate": "string"
    }
  ]
}

Provide 4-6 practical, actionable advice items that are highly specific to the role. Each advice item should:
- Have a clear category (e.g. "Content Creation", "Research", "Communication", "Productivity", "Analysis")
- Include 3-5 concrete steps that can be implemented immediately
- Mention specific AI tools that are relevant
- Provide realistic time estimates

Examples for different roles:
- Teacher: Creating AI-powered flashcards, automated quiz generation, lesson planning
- Developer: Code review with AI, automated testing, documentation generation  
- Designer: AI-assisted mockups, automated asset generation, design feedback
- Marketer: Content generation, A/B testing with AI, customer persona creation

No prose, no markdown—JSON ONLY.`

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
    const { persona, role } = requestSchema.parse(body)

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const userContent = `persona: "${persona}"
role: "${role}"

Task: Provide 4-6 highly specific, actionable advice items for someone in this role to effectively use AI tools. Focus on practical, step-by-step instructions they can implement immediately.

Make each advice item career-specific and include:
- Concrete steps they can take right now
- Specific AI tools to use (ChatGPT, Claude, Midjourney, etc.)
- Realistic time estimates
- Categories relevant to their work

Return JSON ONLY per the schema.`

    let completion
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError)
      throw new Error('Failed to get advice from AI')
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

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('Advice API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
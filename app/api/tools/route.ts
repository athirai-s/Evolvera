import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ToolsResponseSchema } from '@/types'
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
  
  if (limit.count >= 5) {
    return false
  }
  
  limit.count++
  return true
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const systemPrompt = `You are an assistant that recommends ALL current AI tools (including latest releases like nanobanana, claude, gemini, etc.) for a specific persona and profession.
Always return STRICT JSON matching this schema:
{
  "persona": "string",
  "role": "string",
  "tools": [
    {
      "name": "string",
      "category": "writing|productivity|data|design|video|voice|meeting|automation|research",
      "why": "string",
      "quick_start_url": "https://...",
      "learn_tasks": ["string", "string", "string", "string"]
    }
  ]
}
No prose, no markdown—JSON ONLY. Keep "why" under 200 characters. Provide 10-15 AI tools in order of importance.
Include newest AI tools like nanobanana, Claude, GPT models, Midjourney, RunwayML, etc.
Focus on providing accurate tool information - courses will be fetched separately.`

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
Task: Recommend 10-15 current AI tools (including ChatGPT, Claude, Gemini, Midjourney, RunwayML, Nanobanana, etc.) in order of importance for this persona and role. Focus ONLY on AI tools, not general software.
Include both established AI tools and newest releases from 2024-2025.

Focus on AI tools only - no general software. Courses will be fetched separately based on user requests.

Return JSON ONLY per the schema.`

    let completion
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError)
      throw new Error('Failed to get recommendations from AI')
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
      
      try {
        const retryCompletion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt + '\n\nIMPORTANT: Return ONLY valid JSON, no other text.' },
            { role: 'user', content: userContent + '\n\nJSON ONLY - no markdown, no explanations.' }
          ],
          temperature: 0.1,
          max_tokens: 2000
        })
        
        const retryText = retryCompletion.choices[0]?.message?.content?.trim()
        if (retryText) {
          parsedResponse = JSON.parse(retryText)
        } else {
          throw new Error('Retry failed')
        }
      } catch (retryError) {
        throw new Error('Failed to parse AI response as JSON')
      }
    }

    const validatedResponse = ToolsResponseSchema.parse(parsedResponse)
    return NextResponse.json(validatedResponse)

  } catch (error) {
    console.error('API error:', error)
    
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
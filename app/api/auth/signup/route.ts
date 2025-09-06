import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  persona: z.string().min(1),
  role: z.string().min(1)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, persona, role } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const result = await sql`
      INSERT INTO users (name, email, password, persona, role, created_at) 
      VALUES (${name}, ${email}, ${hashedPassword}, ${persona}, ${role}, NOW()) 
      RETURNING id, name, email, persona, role
    `

    const user = result.rows[0]

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        persona: user.persona,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
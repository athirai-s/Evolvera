import { NextResponse } from 'next/server'
import { initDB } from '@/lib/db'

export async function GET() {
  try {
    await initDB()
    return NextResponse.json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Database initialization failed:', error)
    return NextResponse.json(
      { error: 'Database initialization failed' },
      { status: 500 }
    )
  }
}
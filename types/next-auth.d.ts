import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      persona: string
      role: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    persona: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    persona: string
    role: string
  }
}
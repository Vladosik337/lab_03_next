import { auth } from '@/providers/auth/auth'
import { unauthorized } from 'next/navigation'

export async function GET() {
  const session = await auth()
  if (!session) {
    // return Response.json({ message: 'unauthenticated' }, { status: 401 })
    return unauthorized()
  }
  return Response.json({ name: session?.user.name })
}

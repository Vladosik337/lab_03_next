import { auth } from '@/providers/auth/auth'
import SessionProvider from '@/providers/auth/SessionProvider'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  )
}

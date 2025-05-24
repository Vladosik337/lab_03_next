import { db } from '@/db/'
import { accounts, sessions, users, verificationTokens } from '@/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),
  providers: [Google, GitHub],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id
        session.user.image = user.image
      }
      return session
    }
  }
})

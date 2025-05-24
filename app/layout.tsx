import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/navbar'
import { SessionProvider } from '@/components/providers/session-provider'
import { auth } from '@/providers/auth/auth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Next.js Authentication Example',
  description:
    'A modern authentication example with Next.js, NextAuth, and shadcn/ui components'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang='en' suppressHydrationWarning className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <Navbar />
          <div className='pt-20'>{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}

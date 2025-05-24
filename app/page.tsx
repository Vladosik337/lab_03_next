import { auth } from '@/providers/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Shield, LogIn } from 'lucide-react'
import Link from 'next/link'
import SigninBtnCustom from '@/components/auth/SignInButtonCustom'
import SignOutBtnCustom from '@/components/auth/SignOutButtonCustom'

export default async function Home() {
  const session = await auth()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-background/80'>
      <div className='w-full max-w-4xl mx-auto flex flex-col items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
          {/* Authentication Card */}
          <Card className='w-full shadow-md hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-2'>
              <div className='flex items-center gap-2'>
                <LogIn className='h-5 w-5 text-primary' />
                <CardTitle>Authentication</CardTitle>
              </div>
              <CardDescription>
                {session
                  ? 'You are currently signed in'
                  : 'Sign in to your account'}
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-4'>
              {session && session.user ? (
                <>
                  <div className='flex items-center gap-2 mb-6'>
                    <Badge variant='secondary' className='px-3 py-1'>
                      <User className='h-4 w-4 mr-1' />
                      {session.user.name || 'User'}
                    </Badge>
                  </div>
                  <SignOutBtnCustom />
                </>
              ) : (
                <>
                  <p className='mb-4 text-sm text-muted-foreground'>
                    Choose your preferred authentication method:
                  </p>
                  <SigninBtnCustom
                    provider={{ id: 'github', name: 'GitHub' }}
                  />
                  <SigninBtnCustom
                    provider={{ id: 'google', name: 'Google' }}
                  />
                </>
              )}
            </CardContent>
          </Card>

          {/* Protected Content Card */}
          <Card className='w-full shadow-md hover:shadow-lg transition-shadow'>
            <CardHeader className='pb-2'>
              <div className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-primary' />
                <CardTitle>Protected Content</CardTitle>
              </div>
              <CardDescription>
                Access protected areas of the application
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-4'>
              <p className='mb-6 text-sm text-muted-foreground'>
                This area demonstrates how to protect routes in Next.js using
                authentication. Only authenticated users can access this
                content.
              </p>
              <Button
                asChild
                variant={session ? 'default' : 'outline'}
                className='w-full'
              >
                <Link href='/protected'>
                  {session ? 'Access Protected Area' : 'Sign in to Access'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

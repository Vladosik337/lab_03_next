import SigninBtnCustom from '@/components/auth/SignInButtonCustom'
import SignOutBtnCustom from '@/components/auth/SignOutButtonCustom'
import { auth } from '@/providers/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  if (session && session.user) {
    return (
      <div className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-background/80'>
        <Card className='w-full max-w-md shadow-md'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-2xl'>Welcome Back</CardTitle>
            <CardDescription>You are currently signed in</CardDescription>
          </CardHeader>
          <CardContent className='pt-4'>
            <div className='p-4 mb-6 bg-primary/5 rounded-lg border border-primary/10'>
              <p className='mb-4 text-sm'>
                You have successfully authenticated with your account. You now
                have access to protected areas of the application.
              </p>
              <Badge variant='secondary' className='px-3 py-1'>
                <User className='h-4 w-4 mr-1' />
                {session.user.name || 'User'}
              </Badge>
            </div>
            <div className='space-y-3'>
              <SignOutBtnCustom />
              <Button asChild variant='outline' className='w-full'>
                <Link href='/' className='flex items-center justify-center'>
                  <Home className='mr-2 h-4 w-4' />
                  Return to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-background/80'>
      <Card className='w-full max-w-md shadow-md'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
          <CardDescription>
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-4'>
          <div className='p-4 mb-6 bg-primary/5 rounded-lg border border-primary/10'>
            <p className='text-sm text-muted-foreground'>
              Sign in to access protected areas of the application. Your session
              will be securely managed.
            </p>
          </div>
          <SigninBtnCustom provider={{ id: 'github', name: 'GitHub' }} />
          <SigninBtnCustom provider={{ id: 'google', name: 'Google' }} />
          <div className='mt-4'>
            <Button asChild variant='ghost' className='w-full'>
              <Link href='/' className='flex items-center justify-center'>
                <Home className='mr-2 h-4 w-4' />
                Return to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

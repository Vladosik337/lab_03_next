import { auth } from '@/providers/auth/auth'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Shield, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect('/signin-custom')
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-background/80'>
      <Card className='w-full max-w-md shadow-md'>
        <CardHeader className='pb-2'>
          <div className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-primary' />
            <CardTitle className='text-2xl'>Protected Page</CardTitle>
          </div>
          <CardDescription>
            This content is only visible to authenticated users
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-4'>
          <div className='p-4 mb-6 bg-primary/5 rounded-lg border border-primary/10'>
            <p className='mb-4 text-sm'>
              Welcome to the protected area of the application. This page
              demonstrates how authentication can be used to restrict access to
              certain parts of your application.
            </p>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='px-3 py-1'>
                <User className='h-4 w-4 mr-1' />
                {session.user.name || 'User'}
              </Badge>
            </div>
          </div>
          <div className='flex justify-center'>
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

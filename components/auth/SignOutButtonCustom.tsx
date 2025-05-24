'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function SignOutBtnCustom() {
  return (
    <Button onClick={() => signOut()} variant='destructive' className='mt-4'>
      <LogOut className='mr-2 h-4 w-4' />
      Sign Out
    </Button>
  )
}

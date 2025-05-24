'use client'

import { OAuthProviderType } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Github, Mail } from 'lucide-react'

export default function SigninBtnCustom({
  provider
}: {
  provider: { id: OAuthProviderType; name: string }
}) {
  const getIcon = () => {
    switch (provider.id) {
      case 'github':
        return <Github className='mr-2 h-5 w-5' />
      case 'google':
        return <Mail className='mr-2 h-5 w-5' />
      default:
        return null
    }
  }

  const getButtonStyle = () => {
    switch (provider.id) {
      case 'github':
        return 'bg-[#24292F] hover:bg-[#24292F]/90 text-white'
      case 'google':
        return 'bg-[#4285F4] hover:bg-[#4285F4]/90 text-white'
      default:
        return ''
    }
  }

  return (
    <Button
      onClick={() => signIn(provider.id)}
      className={`w-full mb-2 ${getButtonStyle()}`}
      variant='outline'
    >
      {getIcon()}
      Sign in with {provider.name}
    </Button>
  )
}

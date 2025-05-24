'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { LogIn, Shield, Home, User, LogOut, Menu } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { Badge } from './badge'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className='h-4 w-4 mr-2' />
    },
    {
      name: 'Protected',
      href: '/protected',
      icon: <Shield className='h-4 w-4 mr-2' />
    }
  ]

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b'>
      <div className='flex h-16 items-center justify-between px-4 md:px-8'>
        <div className='flex items-center'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <span className='font-bold text-lg'>Next.js Auth</span>
          </Link>
          <nav className='hidden md:flex items-center space-x-4'>
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant='ghost'
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground/80',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Link href={item.href} className='flex items-center'>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* User info on the right */}
        <div className='flex items-center'>
          {session && session.user ? (
            <div className='hidden md:flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8 border border-border'>
                  {session.user.image ? (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                    />
                  ) : (
                    <AvatarFallback>
                      <User className='h-4 w-4' />
                    </AvatarFallback>
                  )}
                </Avatar>
                <Badge variant='secondary' className='items-center px-3 py-1'>
                  <span className='max-w-[120px] truncate'>
                    {session.user.name || 'User'}
                  </span>
                </Badge>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => signOut()}
                className='hover:bg-destructive/10'
              >
                <LogOut className='h-4 w-4 mr-2' />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              asChild
              variant='default'
              size='sm'
              className='h-9 rounded-full px-4'
            >
              <Link href='/signin-custom' className='flex items-center'>
                <LogIn className='h-4 w-4 mr-2' />
                Sign In
              </Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden ml-4'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className='h-5 w-5' />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='md:hidden py-2 px-4 border-t border-border/40 animate-in fade-in slide-in-from-top-5 duration-300'>
          <nav className='flex flex-col space-y-2 py-2'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-2 py-1.5 text-sm rounded-md',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {session && session.user ? (
              <div className='mt-2 pt-2 border-t border-border/40'>
                <div className='px-2 py-1.5 mb-2 flex items-center gap-2'>
                  <Avatar className='h-8 w-8 border border-border'>
                    {session.user.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                      />
                    ) : (
                      <AvatarFallback>
                        <User className='h-4 w-4' />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Badge
                    variant='secondary'
                    className='w-full justify-start px-3 py-1'
                  >
                    <span className='truncate'>
                      {session.user.name || 'User'}
                    </span>
                  </Badge>
                </div>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className='w-full justify-start'
                >
                  <LogOut className='h-4 w-4 mr-2' />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className='mt-2 pt-2 border-t border-border/40'>
                <Button
                  asChild
                  variant='default'
                  size='sm'
                  className='w-full justify-start'
                >
                  <Link
                    href='/signin-custom'
                    className='flex items-center'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className='h-4 w-4 mr-2' />
                    Sign In
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

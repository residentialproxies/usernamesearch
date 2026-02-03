'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Menu, X, Sun, Moon, Search, Ticket, BookOpen, ChevronDown, Code, Sparkles, LogOut } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { 
      name: 'Pricing', 
      href: '/pricing',
      icon: Ticket
    },
    { 
      name: 'Resources', 
      dropdown: true,
      icon: BookOpen,
      items: [
        { name: 'Supported Sites', href: '/supported-sites' },
        { name: 'Guides', href: '/guides' },
        { name: 'Tools', href: '/tools' }
      ]
    },
    { 
      name: 'API', 
      href: '/api',
      icon: Code
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
          <svg className="w-8 h-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span className="font-bold text-xl text-slate-800 dark:text-white">Username Search</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="relative group">
                <button className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition">
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="absolute top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border dark:border-slate-700 hidden group-hover:block py-2">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.href ? (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition"
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.name}</span>
              </Link>
            ) : null
          ))}
          
          {/* Username AI Button */}
          <Link
            href="/tools/username-generator"
            className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition"
          >
            <span className="mr-2 text-lg">✨</span>
            <span>Username AI</span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 px-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Auth - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {session ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={session.user?.image || ''} alt={session.user?.name || session.user?.email || ''} />
                  <AvatarFallback>
                    {(session.user?.name || session.user?.email || 'U').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => signIn('google')}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => signIn('google')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="border-t bg-background px-4 py-6 space-y-4">
            {navigation.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300">
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.name}</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.href ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
              ) : null
            ))}
            
            {/* Username AI - Mobile */}
            <Link
              href="/tools/username-generator"
              className="flex items-center text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2 text-lg">✨</span>
              <span>Username AI</span>
            </Link>
            
            {/* Mobile Auth */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {session ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false)
                      signOut({ callbackUrl: '/' })
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => { setIsMenuOpen(false); signIn('google') }}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => { setIsMenuOpen(false); signIn('google') }}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ModeToggle = () => {
  const [loaded, setLoaded] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return ''
  }

  return (
    <div className="cursor-pointer">
      {theme === 'dark' ? <Sun onClick={() => setTheme('light')} /> : <Moon onClick={() => setTheme('dark')} />}
    </div>
  )
}

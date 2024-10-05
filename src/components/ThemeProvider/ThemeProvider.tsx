'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <NiceModalProvider>{children}</NiceModalProvider>
    </NextThemesProvider>
  )
}

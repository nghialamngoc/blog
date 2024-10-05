import { useEffect, useState } from 'react'

export function useLockedBody(initialLocked = false) {
  const [locked, setLocked] = useState<boolean | undefined>(initialLocked)

  // Do the side effect before render
  useEffect(() => {
    if (!locked) {
      return
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const shouldLock = originalOverflow !== 'hidden'

    // Get the scrollBar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    // Lock body scroll
    if (shouldLock) {
      document.body.style.overflow = 'hidden'

      // Avoid width reflow
      if (scrollBarWidth) {
        document.body.style.paddingRight = scrollBarWidth + 'px'
      }
    }

    return () => {
      if (shouldLock) {
        document.body.style.overflow = originalOverflow

        if (scrollBarWidth) {
          document.body.style.paddingRight = originalPaddingRight
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  return { locked, setLocked }
}

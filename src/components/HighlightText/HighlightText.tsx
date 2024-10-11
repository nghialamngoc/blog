'use client'

import { FC } from 'react'

interface HighlightTextProps {
  text: string
  highlightText: string
  className?: string
}

export const HighlightText: FC<HighlightTextProps> = ({ text, highlightText, className }) => {
  if (!highlightText.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlightText})`, 'gi')
  const parts = text.split(regex)

  return (
    <div className={className}>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} style={{ backgroundColor: 'yellow', padding: 0 }}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </div>
  )
}

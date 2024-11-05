'use client'

import { FC } from 'react'

interface CodeSandBoxProps {
  url: string
}

export const CodeSandBox: FC<CodeSandBoxProps> = ({ url }) => {
  return (
    <iframe
      className="w-full h-[200px] lg:h-[500px] rounded-sm overflow-hidden mt-16"
      src={url}
      title="example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}

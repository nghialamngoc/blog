import { FC } from 'react'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Refractor } from 'react-refractor'
import { urlFor } from '@/sanity/lib/image'

export interface PortableTextCustomProps {
  className?: string
  content: any
}

export const PortableTextCustom: FC<PortableTextCustomProps> = ({ className, content }) => {
  return (
    <div className={className}>
      <PortableText
        value={content}
        components={{
          block: {
            blockquote: ({ children }) => {
              return <blockquote className="border-l-4 border-gray pl-8">{children}</blockquote>
            },
            h3: ({ children }) => {
              return <h3 className="text-[28px] font-bold my-16">{children}</h3>
            },
          },
          types: {
            image: ({ value }) => {
              const imageUrl = urlFor(value)?.width(500).height(500).url()
              return imageUrl ? <img src={imageUrl} /> : ''
            },

            code: ({ value: { code, language, filename } }: any) => {
              return (
                <div className="my-16">
                  {filename && <p className="font-medium mb-4">{filename}</p>}
                  <Refractor
                    className="rounded-[10px] max-w-[700px] max-h-[600px] text-[14px]"
                    language={language}
                    value={code}
                  />
                </div>
              )
            },
          },
          marks: {
            internalLink: ({ value, children }) => {
              const slug: string = value?.slug?.current
              const fullUrl = (slug.startsWith('/') ? '' : '/') + slug

              return (
                <Link className="underline" href={fullUrl}>
                  {children}
                </Link>
              )
            },
          },
        }}
      />
    </div>
  )
}

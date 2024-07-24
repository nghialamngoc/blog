import { FC } from 'react'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Refractor } from 'react-refractor'
import { urlFor } from '@/sanity/lib/image'
import clsx from 'clsx'
import Copy from '../Copy'

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
              return (
                <blockquote className="border-l-4 border-gray pl-8 my-24">{children}</blockquote>
              )
            },
            h3: ({ children }) => {
              return <h3 className="text-[28px] font-bold my-24">{children}</h3>
            },
          },
          types: {
            image: ({ value }) => {
              const imageUrl = urlFor(value)?.width(500).height(500).url()
              return imageUrl ? <img src={imageUrl} /> : ''
            },

            code: ({ value: { code, language, filename } }: any) => {
              return (
                <div className="my-24 max-w-[700px]">
                  {filename && (
                    <div className="flex items-center justify-between bg-[#f5f2f0] rounded-t-[10px] text-black py-8 px-16 border-b border-gray">
                      {filename}

                      <Copy data={code} />
                    </div>
                  )}
                  <Refractor
                    className={clsx(
                      'max-h-[600px] text-[14px]',
                      filename ? 'rounded-b-[10px]' : 'rounded-[10px]',
                    )}
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
                <Link className="underline my-24" href={fullUrl}>
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

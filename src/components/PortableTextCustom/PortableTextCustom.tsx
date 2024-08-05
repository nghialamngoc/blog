import { FC } from 'react'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Refractor } from 'react-refractor'
import { urlFor } from '@/sanity/lib/image'
import clsx from 'clsx'
import Copy from '../Copy'
import { Table } from './Table'

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
            table: ({ value }) => {
              const header = value?.rows?.[0]
              return (
                <div className="my-24">
                  <table className="w-full max-w-[700px]">
                    <thead className="border border-gray">
                      <tr>
                        {header?.cells.map((x: string, i: number) => {
                          return (
                            <th
                              className="border-l border-gray py-6 px-16 bg-[#f5f2f0] text-left"
                              key={i}
                            >
                              {x}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody className="border border-gray">
                      {value?.rows?.slice(1)?.map((x: any, i: number) => {
                        return (
                          <tr key={i}>
                            {x?.cells.map((y: string, z: number) => {
                              return (
                                <td
                                  className="border-l border-b border-gray py-6 px-16 text-left"
                                  key={i + '_' + z}
                                >
                                  {y}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
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

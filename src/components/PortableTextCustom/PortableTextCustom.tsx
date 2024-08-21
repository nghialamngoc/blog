import { FC } from 'react'
import { PortableText, PortableTextBlock, toPlainText } from 'next-sanity'
import Link from '@/components/Link'
import { Refractor } from 'react-refractor'
import { urlFor } from '@/sanity/lib/image'
import clsx from 'clsx'
import Copy from '../Copy'
import styles from './PortableTextCustom.module.css'
import { idTransform } from '@/utils/string'
import { LinkIcon } from 'lucide-react'

export interface PortableTextCustomProps {
  className?: string
  content: PortableTextBlock
}

export const PortableTextCustom: FC<PortableTextCustomProps> = ({ className, content }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <PortableText
        value={content}
        listNestingMode="html"
        components={{
          block: {
            blockquote: ({ children }) => {
              return <blockquote className="border-l-4 border-gray pl-8 my-24">{children}</blockquote>
            },
            h1: ({ children }) => {
              return <h3 className="text-24 lg:text-[28px] font-bold my-24">{children}</h3>
            },
            h2: ({ value, children }) => {
              const text = value.children[0].text
              const id = text && typeof text === 'string' ? idTransform(text) : ''

              return (
                <h3 id={id} className="text-20 lg:text-[24px] font-bold mt-16 mb-8">
                  {id ? (
                    <Link className={clsx(styles.link, 'w-fit flex items-center gap-8')} href={`#${id}`}>
                      {children}
                      <LinkIcon width={20} />
                    </Link>
                  ) : (
                    children
                  )}
                </h3>
              )
            },
            h3: ({ value, children }) => {
              const text = value.children[0].text
              const id = text && typeof text === 'string' ? idTransform(text) : ''

              return (
                <h3 id={id} className="text-[20px] font-bold mt-16 mb-8">
                  {id ? (
                    <Link className={clsx(styles.link, 'w-fit flex items-center gap-8')} href={`#${id}`}>
                      {children}
                      <LinkIcon width={20} />
                    </Link>
                  ) : (
                    children
                  )}
                </h3>
              )
            },
          },
          types: {
            image: ({ value }) => {
              const imageUrl = urlFor(value)?.width(500).url()
              return imageUrl ? <img className="mx-auto my-16" src={imageUrl} /> : ''
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
                            <th className="border-l border-gray py-6 px-16 bg-[#f5f2f0] text-left" key={i}>
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
                                <td className="border-l border-b border-gray py-6 px-16 text-left" key={i + '_' + z}>
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
            code: ({ value: { code, language = 'javascript', filename } }: any) => {
              return (
                <div className="my-24 max-w-[700px]">
                  {filename && (
                    <div className="flex items-center justify-between bg-[#f5f2f0] rounded-t-[10px] text-black py-8 px-16 border-b border-gray">
                      {filename}
                      <Copy data={code} />
                    </div>
                  )}
                  <Refractor
                    className={clsx('max-h-[600px] text-[14px]', filename ? 'rounded-b-[10px]' : 'rounded-[10px]')}
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
          list: {
            bullet: ({ children }) => {
              return <ul className="mb-16">{children}</ul>
            },
            numbered: ({ children }) => {
              return <ol className="mb-16">{children}</ol>
            },
          },
        }}
      />
    </div>
  )
}

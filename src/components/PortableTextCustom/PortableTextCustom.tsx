import Link from '@/ui/Link'
import { urlFor } from '@/sanity/lib/image'
import { idTransform } from '@/utils/string'
import clsx from 'clsx'
import { PortableText, PortableTextBlock } from 'next-sanity'
import { FC } from 'react'
import { Refractor } from 'react-refractor'
import Copy from '../Copy'
import { LanguageIcon } from '../LanguageIcon/LanguageIcon'
import styles from './PortableTextCustom.module.css'
import { SANDBOX_PREFIX } from '@/config/constants'
import { CodeSandBox } from '../IFrame/CodeSandBox/CodeSandBox'

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
            code: () => {
              return '123'
            },
            blockquote: ({ children }) => {
              return <blockquote className="border-l-4 border-gray pl-8 my-24">{children}</blockquote>
            },
            h1: ({ children }) => {
              return <h3 className="text-24 lg:text-28 font-bold my-24">{children}</h3>
            },
            h2: ({ value, children }) => {
              const text = value.children[0].text
              const id = text && typeof text === 'string' ? idTransform(text) : ''

              return (
                <h2 id={id} className="text-20 lg:text-24 font-semibold mt-16 mb-8">
                  {children}
                </h2>
              )
            },
            h3: ({ value, children }) => {
              const text = value.children[0].text
              const id = text && typeof text === 'string' ? idTransform(text) : ''

              return (
                <h3 id={id} className="text-18 lg:text-24 font-semibold mt-16 mb-8">
                  {children}
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
                                <td className="border-l border-b-1 border-gray py-6 px-16 text-left" key={i + '_' + z}>
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
                <div className="my-24">
                  {filename && (
                    <div className="flex items-center justify-between bg-[#f1f3f4] rounded-t-[10px] text-black py-8 px-16 border-b-1 border-[#e6e6e6]">
                      <div className="flex items-center gap-4">
                        <LanguageIcon language={language} width={20} height={20} />
                        {filename}
                      </div>

                      <Copy data={code} />
                    </div>
                  )}
                  <Refractor
                    className={clsx(styles.code, filename ? 'rounded-b-[10px]' : 'rounded-[10px]')}
                    language={language}
                    value={code}
                  />
                </div>
              )
            },
          },
          marks: {
            code: ({ value, children }) => {
              if (Array.isArray(children) && children[0] && children[0].startsWith(SANDBOX_PREFIX)) {
                const url = children[0].split(SANDBOX_PREFIX)?.filter((x: string) => x)?.[0]
                if (url) {
                  return <CodeSandBox url={url} />
                }
              }

              return children
            },
            internalLink: ({ value, children }) => {
              const slug: string = value?.slug?.current
              const fullUrl = (slug.startsWith('/') ? '' : '/') + slug

              return (
                <Link className="underline my-24" href={fullUrl}>
                  {children}
                </Link>
              )
            },
            link: ({ value, children }) => {
              return (
                <Link className="underline my-24" href={value.href} target={value.blank ? '_blank' : '_self'}>
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

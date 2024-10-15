import { FC, SVGProps } from 'react'
import TypescriptIcon from '@/ui/Icons/TypescriptIcon'
import JavascriptIcon from '@/ui/Icons/JavascriptIcon'
import ReactJsIcon from '@/ui/Icons/ReactJsIcon'

const icons = {
  typescript: TypescriptIcon,
  javascript: JavascriptIcon,
  jsx: ReactJsIcon,
}

export const LanguageIcon: FC<SVGProps<SVGSVGElement> & { language: keyof typeof icons }> = ({ language, ...rest }) => {
  const El = icons[language]

  if (El) return <El {...rest} />
  return null
}

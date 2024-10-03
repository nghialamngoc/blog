import { POST_PATH } from '@/constant/path'
import Link from '../Link'

export const HeaderLogo = () => {
  return (
    <Link className="text-24 lg:text-28 font-bold cursor-pointer" href={POST_PATH}>
      <span className="text-black">Nghia.Lam</span>
      <span className="text-[#15acfb]">Blog</span>
    </Link>
  )
}

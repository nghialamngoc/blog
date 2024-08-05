import Link from '@/components/Link'
import Container from '../Container'
import ModeToggle from '../ModeToggle'

export const Header = () => {
  return (
    <Container className="flex justify-between items-center">
      <Link className="text-[18px] lg:text-[30px] font-bold cursor-pointer" href={'/'}>
        <span>Nghia.Lam</span>
        <span className="text-[#15acfb]">Blog</span>
      </Link>
      <ModeToggle />
    </Container>
  )
}

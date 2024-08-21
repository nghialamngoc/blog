import Link from '@/components/Link'
import Container from '../Container'
import ModeToggle from '../ModeToggle'

export const Header = () => {
  return (
    <div className="shadow-sm sticky top-0 z-10">
      <Container className="flex justify-between items-center bg-white py-16">
        <Link className="text-[18px] lg:text-[30px] font-bold cursor-pointer" href={'/'}>
          <span>Nghia.Lam</span>
          <span className="text-[#15acfb]">Blog</span>
        </Link>
        <ModeToggle />
      </Container>
    </div>
  )
}

import Container from '../Container'
import ModeToggle from '../ModeToggle'

export const Header = () => {
  return (
    <Container className="flex justify-between items-center">
      <div className="text-[18px] lg:text-[30px] font-bold">
        <span>Nghia.Lam</span>
        <span className="text-[#15acfb]">Blog</span>
      </div>
      <ModeToggle />
    </Container>
  )
}

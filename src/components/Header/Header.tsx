import Link from '@/components/Link'
import Container from '@/components/Container'
import ModeToggle from '@/components/ModeToggle'
import { categoryService } from '@/sanity/services'
import { HeaderMenuDrawer } from './HeaderMenu'

export const Header = async () => {
  const categories = await categoryService.getTopNavigationCategories()

  return (
    <div className="shadow-sm w-full">
      <div className="flex justify-between items-center bg-white py-16 px-16 lg:px-32 gap-32">
        <HeaderMenuDrawer />
        <Link className="text-24 lg:text-28 font-bold cursor-pointer" href={'/'}>
          <span className="text-black">Nghia.Lam</span>
          <span className="text-[#15acfb]">Blog</span>
        </Link>
        <Container className="hidden md:flex items-start w-full py-0">
          {categories && (
            <div className="flex gap-32">
              {categories.map((category, index) => {
                return (
                  <Link href={category.href} key={index}>
                    {category.label}
                  </Link>
                )
              })}
            </div>
          )}
        </Container>
        <ModeToggle />
      </div>
    </div>
  )
}

import Link from '@/components/Link'
import Container from '@/components/Container'
import ModeToggle from '@/components/ModeToggle'
import { categoryService } from '@/sanity/services'
import { HeaderMenuDrawer } from './HeaderMenu'
import { HeaderLogo } from './HeaderLogo'
import Search from '../Search'
import { HeaderUser } from './HeaderUser'

export const Header = async () => {
  const categories = await categoryService.getTopNavigationCategories()

  return (
    <div className="shadow-sm w-full">
      <div className="flex justify-between items-center bg-white py-16 px-16 lg:px-32 gap-32">
        <div className="flex items-center gap-8">
          <HeaderMenuDrawer categories={categories} />
          <HeaderLogo />
        </div>

        <Container className="hidden md:flex items-start w-full py-0">
          {categories && (
            <div className="flex gap-32">
              {categories.map(({ label, href }, index) => {
                return (
                  <div key={index}>
                    <Link href={href}>{label}</Link>
                  </div>
                )
              })}
            </div>
          )}
        </Container>

        <div className="flex items-center gap-16">
          <Search />
          <ModeToggle />

          <HeaderUser />
        </div>
      </div>
    </div>
  )
}

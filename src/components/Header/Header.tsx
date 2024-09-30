import Link from '@/components/Link'
import Container from '../Container'
import ModeToggle from '../ModeToggle'
import { categoryService } from '@/sanity/services'

export const Header = async () => {
  const categories = await categoryService.getTopNavigationCategories()

  return (
    <div className="shadow-sm">
      <div className="flex justify-between items-center bg-white py-16 px-32 gap-32">
        <Link className="text-20 lg:text-28 font-bold cursor-pointer" href={'/'}>
          <span className="text-black">Nghia.Lam</span>
          <span className="text-[#15acfb]">Blog</span>
        </Link>
        <Container className="flex items-start w-full py-0">
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

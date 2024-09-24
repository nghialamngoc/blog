import Link from '@/components/Link'
import Container from '../Container'
import ModeToggle from '../ModeToggle'
import { categoryService } from '@/sanity/services'

export const Header = async () => {
  const categories = await categoryService.getTopNavigationCategories()

  return (
    <div className="shadow-sm">
      <div className="flex justify-between items-center bg-white p-16 gap-32">
        <Link className="text-[18px] lg:text-[30px] font-bold cursor-pointer" href={'/'}>
          <span className="text-text">Nghia.Lam</span>
          <span className="text-[#15acfb]">Blog</span>
        </Link>
        <Container className="flex items-start w-full py-0">
          {categories && (
            <div className="flex gap-32">
              {categories.map((category, index) => {
                return (
                  <Link href={`/${category.value}`} key={index}>
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

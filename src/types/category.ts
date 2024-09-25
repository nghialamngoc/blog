export interface Category {
  _id: string
  label: string
  value: string
  href: string
  order: number
  parent?: string
}

export interface TopNavigationCategory extends Category {
  children?: Category[]
}

export interface Category {
  _id: string
  label: string
  value: string
  order: number
  parent?: string
}

export interface TopNavigationCategory extends Category {
  children?: Category[]
}

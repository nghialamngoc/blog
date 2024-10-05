'use client'

import NiceModal from '@ebay/nice-modal-react'
import { SearchIcon } from 'lucide-react'
import SearchModal from '../Modal/SearchModal'

export const Search = () => {
  const onClick = () => {
    NiceModal.show(SearchModal)
  }
  return (
    <div>
      <SearchIcon className="w-20 h-20 cursor-pointer" onClick={onClick} />
    </div>
  )
}

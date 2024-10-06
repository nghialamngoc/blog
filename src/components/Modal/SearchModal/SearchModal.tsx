'use client'

import { DebouncedInput } from '@/components/DebouncedInput/DebouncedInput'
import { Dialog } from '@/components/Dialog/Dialog'
import { DialogBody } from '@/components/Dialog/DialogBody'
import { DialogContent } from '@/components/Dialog/DialogContent'
import { DialogHeader } from '@/components/Dialog/DialogHeader'
import { DialogOverlay } from '@/components/Dialog/DialogOverlay'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { SearchIcon } from 'lucide-react'

export interface SearchModalProps {
  onClose?: () => void
}

export const SearchModal = NiceModal.create<SearchModalProps>(({ onClose }) => {
  const modal = useModal()

  const onHide = () => {
    onClose?.()
    modal.hide()
  }

  const onSearchChange = (value: string) => {
    console.log(value)
  }

  return (
    <Dialog isOpen={modal.visible} onOpen={modal.show} onHide={onHide}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader className="flex items-center gap-12">
          <SearchIcon />
          <DebouncedInput
            className="w-full inline-block h-28 outline-none"
            placeholder="Tìm kiếm bài viết"
            onDebounce={onSearchChange}
          ></DebouncedInput>
        </DialogHeader>
        <DialogBody>123</DialogBody>
      </DialogContent>
    </Dialog>
  )
})

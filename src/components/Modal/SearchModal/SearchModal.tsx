import { Dialog } from '@/components/Dialog/Dialog'
import { DialogBody } from '@/components/Dialog/DialogBody'
import { DialogContent } from '@/components/Dialog/DialogContent'
import { DialogOverlay } from '@/components/Dialog/DialogOverlay'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

export interface SearchModalProps {
  onClose?: () => void
}

export const SearchModal = NiceModal.create<SearchModalProps>(({ onClose }) => {
  const modal = useModal()

  const onHide = () => {
    onClose?.()
    modal.hide()
  }

  return (
    <Dialog isOpen={modal.visible} onOpen={modal.show} onHide={onHide}>
      <DialogOverlay />
      <DialogContent>
        <DialogBody>123</DialogBody>
      </DialogContent>
    </Dialog>
  )
})

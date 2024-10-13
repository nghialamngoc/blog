import { Dialog } from '@/components/Dialog/Dialog'
import { DialogBody } from '@/components/Dialog/DialogBody'
import { DialogContent } from '@/components/Dialog/DialogContent'
import { DialogHeader } from '@/components/Dialog/DialogHeader'
import { DialogOverlay } from '@/components/Dialog/DialogOverlay'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import LoginForm from './LoginForm'

export interface LoginModalProps {}

export const LoginModal = NiceModal.create<LoginModalProps>((props) => {
  const modal = useModal()

  const onHide = () => {
    modal.remove()
  }

  return (
    <Dialog size="sm" isOpen={modal.visible} onOpen={modal.show} onHide={onHide}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader className="text-center gap-12 h-[40px] text-24 font-semibold">Đăng nhập</DialogHeader>
        <DialogBody className="mt-8">
          <LoginForm />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
})

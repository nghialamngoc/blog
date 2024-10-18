import { Dialog } from '@/components/Dialog/Dialog'
import { DialogBody } from '@/components/Dialog/DialogBody'
import { DialogContent } from '@/components/Dialog/DialogContent'
import { DialogHeader } from '@/components/Dialog/DialogHeader'
import { DialogOverlay } from '@/components/Dialog/DialogOverlay'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export interface LoginModalProps {}

export const LoginModal = NiceModal.create<LoginModalProps>((props) => {
  const [mode, setMode] = useState(1)

  const modal = useModal()

  const onHide = () => {
    modal.remove()
  }

  return (
    <Dialog size="sm" isOpen={modal.visible} onOpen={modal.show} onHide={onHide}>
      <DialogOverlay />
      <DialogContent className="max-w-[530px]">
        <DialogHeader className="text-center gap-12 h-[40px] text-24 font-semibold">
          {mode === 1 ? 'Đăng nhập' : 'Đăng kí'}
        </DialogHeader>
        <DialogBody className="mt-8">
          {mode === 1 ? (
            <>
              <LoginForm onHide={onHide} />
              <div className="mt-10 text-14 text-center">
                Chưa có tài khoản?
                <span className="pl-4 underline cursor-pointer text-orange-400" onClick={() => setMode(2)}>
                  Đăng kí mới
                </span>
              </div>
            </>
          ) : (
            <>
              <RegisterForm />
              <div className="mt-10 text-14 text-center">
                Đã có tài khoản?
                <span className="pl-4 underline cursor-pointer text-orange-400" onClick={() => setMode(1)}>
                  Đăng nhập
                </span>
              </div>
            </>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
})

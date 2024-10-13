'use client'

import Button from '@/ui/Button'
import NiceModal from '@ebay/nice-modal-react'
import { LoginModal } from '../Modal/LoginModal/LoginModal'

export const HeaderUser = () => {
  const handleClick = () => {
    NiceModal.show(LoginModal)
  }

  return (
    <Button design="v1" className="shrink-0" onClick={handleClick}>
      Sign in
    </Button>
  )
}

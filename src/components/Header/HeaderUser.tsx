'use client'

import Button from '@/ui/Button'
import NiceModal from '@ebay/nice-modal-react'
import { LoginModal } from '../Modal/LoginModal/LoginModal'
import { useAuthContext } from '@/auth/AuthContext'
import Popover from '@/ui/Popover/Popover'
import PopoverTrigger from '@/ui/Popover/PopoverTrigger'
import PopoverContent from '@/ui/Popover/PopoverContent'
import { ChevronDown } from 'lucide-react'

export const HeaderUser = () => {
  const { user, isLoading, logout } = useAuthContext()

  const handleClick = () => {
    NiceModal.show(LoginModal)
  }

  if (isLoading) {
    return <Button design="v1" isLoading={true} className="w-[80px]"></Button>
  }

  if (user) {
    return (
      <Popover placement="bottom-end" arrow={false} offset={8}>
        <PopoverTrigger asChild={true}>
          <div className="flex items-center gap-4 text-14 border-1 px-10 py-4 rounded-[16px] cursor-pointer shadow-sm">
            {user.userName} <ChevronDown className="w-12 h-12" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="flex flex-col items-center bg-[#1C2D38] text-white w-[200px] pt-24 rounded-[10px] text-14">
            <div className="font-medium text-16">{user.userName}</div>
            <div className="text-12">{user.email}</div>
            <div className="bg-[#011E2B] w-full mt-16 p-16 rounded-b-[10px] border-t-1 border-gray">
              <div className="cursor-pointer w-fit" onClick={logout}>
                Logout
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Button design="v1" className="shrink-0" onClick={handleClick}>
      Sign in
    </Button>
  )
}

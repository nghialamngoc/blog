'use client'

import { DebouncedInput } from '@/components/DebouncedInput/DebouncedInput'
import { Dialog } from '@/components/Dialog/Dialog'
import { DialogBody } from '@/components/Dialog/DialogBody'
import { DialogContent } from '@/components/Dialog/DialogContent'
import { DialogHeader } from '@/components/Dialog/DialogHeader'
import { DialogOverlay } from '@/components/Dialog/DialogOverlay'
import HighlightText from '@/components/HighlightText'
import { Post } from '@/types/post'
import { error } from '@/utils/safety-log'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import axios, { isCancel } from 'axios'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Spiner from '../../../../public/spiner.gif'

let controller: AbortController

export interface SearchModalProps {
  onClose?: () => void
}

export const SearchModal = NiceModal.create<SearchModalProps>(({ onClose }) => {
  const [data, setData] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  const modal = useModal()
  const observer = useRef<IntersectionObserver | null>(null)

  const onHide = () => {
    onClose?.()
    modal.remove()
  }

  const onSearchChange = (value: string) => {
    setSearchValue(value)
    setPage(1)
  }

  const fetchMoreItems = async (page: number, search: string) => {
    try {
      setLoading(true)
      setErrorMsg(null)
      controller?.abort()
      controller = new AbortController()

      const response = await axios.get(`/api/test/?search=${search}&page=${page}`, {
        signal: controller.signal,
      })
      const result = response?.data?.data ?? []

      page === 1 ? setData(result) : setData((prev) => [...prev, ...result])
      setHasMore(result.length > 0)
      setLoading(false)
    } catch (err) {
      if (!isCancel(err)) {
        error('fetchMoreItems error: ', err)
        setErrorMsg(err instanceof Error ? err : new Error('Có lỗi xảy ra vui lòng thử lại sau!'))
        setLoading(false)
        return
      }
    }
  }

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  useEffect(() => {
    if (!searchValue) return
    fetchMoreItems(page, searchValue)
  }, [page, searchValue])

  return (
    <Dialog size="sm" isOpen={modal.visible} onOpen={modal.show} onHide={onHide}>
      <DialogOverlay />
      <DialogContent className="relative">
        <DialogHeader className="flex items-center gap-12 h-[40px]">
          <SearchIcon />
          <DebouncedInput
            className="w-full inline-block h-28 outline-none"
            placeholder="Tìm kiếm bài viết"
            onDebounce={onSearchChange}
          ></DebouncedInput>

          {loading && <Image src={Spiner} alt="spiner" width={36} height={36} />}
        </DialogHeader>
        <DialogBody className="max-h-[400px] overflow-y-auto">
          {!data.length && !loading && !hasMore && 'Không có dữ liệu'}
          <div className="flex flex-col gap-16">
            {data.map((post, index) => {
              return (
                <div
                  key={post._id}
                  ref={index === data.length - 1 ? lastPostElementRef : null}
                  className="border-1 rounded-lg px-8 py-8"
                >
                  <HighlightText text={post.title} highlightText={searchValue} />
                  {post.shortDescription && (
                    <HighlightText className="text-[12px]" text={post.shortDescription} highlightText={searchValue} />
                  )}
                </div>
              )
            })}
            {errorMsg && <div>{errorMsg.message}</div>}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
})

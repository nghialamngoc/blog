import { ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { clearTimeout, setTimeout } from 'timers'

export interface DebouncedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onDebounce: (value: string) => void
  debounceTime?: number
}

export const DebouncedInput: FC<DebouncedInputProps> = ({ onDebounce, debounceTime = 300, ...rest }) => {
  const [value, setValue] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const debounce = useCallback(
    (func: (...args: any[]) => void) => {
      return (...args: any[]) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
          func(...args)
          timerRef.current = null
        }, debounceTime)
      }
    },
    [debounceTime],
  )

  const debouncedCallback = useCallback(
    debounce((val: string) => {
      onDebounce(val)
    }),
    [onDebounce, debounce],
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedCallback(newValue)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return <input value={value} {...rest} onChange={onChange}></input>
}

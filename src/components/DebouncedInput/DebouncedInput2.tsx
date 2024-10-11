import useDebounce from '@/hooks/use-debounce'
import { ChangeEvent, FC, HTMLAttributes, useEffect, useState } from 'react'

interface DebouncedInput2Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  debounceTime?: number
  className?: string
}

export const DebouncedInput2: FC<DebouncedInput2Props> = ({
  value: initialValue,
  onChange,
  debounceTime = 200,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value, debounceTime)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (debouncedValue !== initialValue) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, initialValue])

  return <input {...rest} value={value} onChange={handleChange} />
}

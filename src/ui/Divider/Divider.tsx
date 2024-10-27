import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  classNames?: {
    root?: string
    divider?: string
  }
}

export const Divider: FC<DividerProps> = ({ children, className, orientation = 'horizontal', classNames, ...rest }) => {
  const render = () => {
    const clsName = {
      'w-full h-[1px]': orientation === 'horizontal',
      'h-full w-[1px]': orientation === 'vertical',
    }

    if (children) {
      return (
        <>
          <div className={clsx(clsName, 'bg-grayLight', classNames?.divider)} />
          {children}
          <div className={clsx(clsName, 'bg-grayLight', classNames?.divider)} />
        </>
      )
    }

    return <div className={clsx(clsName, 'bg-grayLight', classNames?.divider)} />
  }

  return (
    <div
      data-testid="Divider"
      className={clsx(
        'flex items-center gap-16 text-center text-14 weight-bold lh-18',
        {
          'my-16': orientation === 'horizontal',
          'mx-16 flex-column': orientation === 'vertical',
        },
        className,
        classNames?.root,
      )}
      {...rest}
    >
      {render()}
    </div>
  )
}

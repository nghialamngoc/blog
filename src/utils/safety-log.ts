import { AxiosError } from 'axios'
import { isLocal } from '@/config/env'

const isClient = typeof window !== 'undefined'

type LogType = 'log' | 'info' | 'warn' | 'error'

const PREFIX = '[nghiaBlog v1]'

const PREFIX_STYLE = 'font-weight: bold; color: blue;'

interface GenerateLogOptions {
  showOnLocalTerminal?: boolean
  raw?: boolean
}

const generateLog = (type: LogType, args: any[], options?: GenerateLogOptions) => {
  const { showOnLocalTerminal, raw } = options ?? {}

  // Only show log if has query ?log=true on URL
  if (!isLocal && isClient && new URLSearchParams(window.location.search).get('log') !== 'true') return

  // Don't show log on local server terminal, we don't want to make it too long
  if (isLocal && !isClient && !showOnLocalTerminal) return

  // Raw log without any format
  if (raw) return console[type](...args)

  if (isClient) {
    const [firstArg, ...restArgs] = args ?? []

    const styledFirstArg =
      typeof firstArg === 'string' && restArgs.length
        ? ['%c' + PREFIX + ' %c' + firstArg, PREFIX_STYLE, 'font-weight: bold; color: red; font-size: 12px;']
        : ['%c' + PREFIX, PREFIX_STYLE, firstArg]

    return console[type](...styledFirstArg, ...restArgs)
  }

  // If it's server log then we parse it to string then it can display better on datadogs
  const stringifiedArgs =
    args?.map((arg) => {
      if (arg && typeof arg === 'object') {
        // Axios instance
        if (arg instanceof AxiosError) {
          return JSON.stringify({
            code: arg.code,
            message: arg.message,
            status: arg.response?.status,
            statusText: arg.response?.statusText,
            data: arg.response?.data,
            stack: arg.stack,
          })
        }

        // Error instance
        if (arg instanceof Error) {
          return JSON.stringify({
            message: arg.message,
            stack: arg.stack,
          })
        }

        return JSON.stringify(arg)
      }
      return arg
    }) ?? []

  return console[type](PREFIX, ...stringifiedArgs)
}

export const log: Console['log'] = (...args) => generateLog('log', args)

export const info: Console['info'] = (...args) => generateLog('info', args)

export const warn: Console['warn'] = (...args) => generateLog('warn', args)

export const error: Console['error'] = (...args) => generateLog('error', args, { showOnLocalTerminal: true })

export const raw: Console['log'] = (...args) => generateLog('log', args, { raw: true })

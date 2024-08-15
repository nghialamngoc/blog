export const i18n = {
  defaultLocale: 'vn',
  locales: ['en', 'vn'],
} as const

export type Locale = (typeof i18n)['locales'][number]

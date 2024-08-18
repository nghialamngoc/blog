export const trimAllSpace = (str?: string) => str?.replace(/\s/g, '') ?? ''

export const stripHtmlTags = (html?: string) => {
  return html?.replace(/<[^>]*>/g, '') ?? ''
}

export const containsHtmlTag = (html: string, tagName: string) => {
  const pattern = new RegExp('<(' + tagName + ')(?:\\s+[^>]*)?\\s*\\/?>', 'i')
  return pattern.test(html)
}

export const idTransform = (str?: string) =>
  str
    ?.replace(/(\(|\))/g, '')
    .split(' ')
    .filter((x) => x)
    .join('-')
    .toLocaleLowerCase() ?? ''

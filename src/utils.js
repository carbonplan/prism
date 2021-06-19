export const stripTrailingNewline = (str) => {
  str = str.trim()
  if (typeof str === 'string' && str[str.length - 1] === '\n') {
    return str.slice(0, -1)
  }
  return str
}

export const parseLanguage = (className) => {
  return className ? className.replace(/language-/, '') : undefined
}

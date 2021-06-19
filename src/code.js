import React from 'react'
import { stripTrailingNewline, parseLanguage } from './utils'
import Highlighted from './highlighted'

const Code = ({ children, className, language, theme = 'monochrome' }) => {
  const code = stripTrailingNewline(children)
  language = language ? language : parseLanguage(className)

  return <Highlighted code={code} language={language} theme={theme} />
}

export default Code

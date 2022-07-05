import bitformDefaultTheme from './bitformDefault/1_bitformDefault'
import atlassianTheme from './atlassianTheme/3_atlassianTheme'

export default function themeProvider(themeSlug, fieldsArr) {
  const theme = {
    styles: {},
    themeVars: {},
    themeColors: {},
  }

  if (themeSlug === 'bitformDefault') {
    theme.styles = bitformDefaultTheme({ fieldsArr })
    theme.themeColors = bitformDefaultTheme({ type: 'themeColors' })
    theme.themeVars = bitformDefaultTheme({ type: 'themeVars' })
    return theme
  }

  // if (themeSlug === 'material') {
  //   const thm = materialTheme(null, 'theme')
  //   thm.form = materialTheme(null, 'form')

  //   fieldsArr?.map(([fieldKey, fieldData]) => {
  //     thm.fields[fieldKey] = materialTheme(fieldKey, fieldData.typ)
  //   })
  //   return thm
  // }

  if (themeSlug === 'atlassian') {
    theme.styles = atlassianTheme({ fieldsArr })
    theme.themeColors = atlassianTheme({ type: 'themeColors' })
    theme.themeVars = atlassianTheme({ type: 'themeVars' })
    return theme
  }
}

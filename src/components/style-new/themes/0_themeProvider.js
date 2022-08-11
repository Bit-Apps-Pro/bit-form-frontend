import bitformDefaultTheme from './bitformDefault/1_bitformDefault'
import atlassianTheme from './atlassianTheme/3_atlassianTheme'

export default function themeProvider(themeSlug, fieldsArr, formId) {
  const theme = {
    themeColors: {
      lightThemeColors: {},
      darkThemeColors: {},
    },
    themeVars: {
      lgLightThemeVars: {},
      lgDarkThemeVars: {},
      mdLightThemeVars: {},
      mdDarkThemeVars: {},
      smLightThemeVars: {},
      smDarkThemeVars: {},
    },
    styles: {
      lgLightStyles: {},
      lgDarkStyles: {},
      mdLightStyles: {},
      mdDarkStyles: {},
      smLightStyles: {},
      smDarkStyles: {},
    },
  }

  if (themeSlug === 'bitformDefault') {
    theme.themeColors = bitformDefaultTheme({ type: 'themeColors' })
    theme.themeVars = bitformDefaultTheme({ type: 'themeVars' })
    theme.styles = bitformDefaultTheme({ fieldsArr, formId })
    return theme
  }

  if (themeSlug === 'atlassian') {
    theme.styles = atlassianTheme({ fieldsArr })
    theme.themeColors = atlassianTheme({ type: 'themeColors' })
    theme.themeVars = atlassianTheme({ type: 'themeVars' })
    return theme
  }
}

import noStyleTheme from './0_noStyle'
import bitformDefaultTheme from './1_bitformDefault'
import atlassianTheme from './2_atlassian'

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

  if (themeSlug === 'noStyle') {
    theme.themeColors = noStyleTheme({ type: 'themeColors' })
    theme.themeVars = noStyleTheme({ type: 'themeVars' })
    theme.styles = noStyleTheme({ fieldsArr, formId })
    return theme
  }

  if (themeSlug === 'bitformDefault') {
    theme.themeColors = bitformDefaultTheme({ type: 'themeColors' })
    theme.themeVars = bitformDefaultTheme({ type: 'themeVars' })
    theme.styles = bitformDefaultTheme({ fieldsArr, formId })
    return theme
  }

  if (themeSlug === 'atlassian') {
    theme.themeColors = atlassianTheme({ type: 'themeColors' })
    theme.themeVars = atlassianTheme({ type: 'themeVars' })
    theme.styles = atlassianTheme({ fieldsArr, formId })
    return theme
  }
}

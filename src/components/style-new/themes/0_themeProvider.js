import bitformDefaultTheme from './1_bitformDefault'
import materialTheme from './2_material'

export default function themeProvider(themeSlug, fieldsArr) {
  if (themeSlug === 'bitformDefault') {
    const thm = bitformDefaultTheme(null, 'theme')
    thm.form = bitformDefaultTheme(null, 'form')

    fieldsArr?.map(([fieldKey, fieldData]) => {
      thm.fields[fieldKey] = bitformDefaultTheme(fieldKey, fieldData.typ)
    })
    return thm
  }

  if (themeSlug === 'material') {
    const thm = materialTheme(null, 'theme')
    thm.form = materialTheme(null, 'form')

    fieldsArr?.map(([fieldKey, fieldData]) => {
      thm.fields[fieldKey] = materialTheme(fieldKey, fieldData.typ)
    })
    return thm
  }
}

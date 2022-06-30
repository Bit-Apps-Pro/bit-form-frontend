import bitformDefaultTheme from './1_bitformDefault'
import redColorTheme from './3_redColorTheme'
import materialTheme from './2_material'

export default function themeProvider(themeSlug, fieldsArr) {
  if (themeSlug === 'bitformDefault') {
    const thm = bitformDefaultTheme(null, 'theme')
    thm.form = bitformDefaultTheme(null, 'form')
    thm.font = bitformDefaultTheme(null, 'font')

    fieldsArr?.map(([fieldKey, fieldData]) => {
      thm.fields[fieldKey] = bitformDefaultTheme(fieldKey, fieldData.typ)
    })
    return thm
  }

  // if (themeSlug === 'material') {
  //   const thm = materialTheme(null, 'theme')
  //   thm.form = materialTheme(null, 'form')

  //   fieldsArr?.map(([fieldKey, fieldData]) => {
  //     thm.fields[fieldKey] = materialTheme(fieldKey, fieldData.typ)
  //   })
  //   return thm
  // }

  if (themeSlug === 'redColorTheme') {
    const thm = redColorTheme(null, 'theme')
    thm.form = redColorTheme(null, 'form')
    thm.font = redColorTheme(null, 'font')

    fieldsArr?.map(([fieldKey, fieldData]) => {
      thm.fields[fieldKey] = redColorTheme(fieldKey, fieldData.typ)
    })
    return thm
  }
}

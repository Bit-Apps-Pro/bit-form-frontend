/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { json2CssStr } from './styleHelpers'

export default function RenderThemeVarsAndFormCSS() {
  const { formID } = useParams()
  const styles = useAtomValue($styles)
  const themeVars = useAtomValue($themeVars)
  const themeColors = useAtomValue($themeColors)

  return (
    <>
      <link rel="stylesheet" href={styles?.font?.fontURL} />
      <style>{json2CssStr('.layout-wrapper', themeVars)}</style>
      <style>{json2CssStr('.layout-wrapper', themeColors)}</style>
      <style>{json2CssStr(`._frm-bg-b${formID}`, styles.form?.[`._frm-bg-b${formID}`])}</style>
      <style>{json2CssStr(`._frm-b${formID}`, styles.form?.[`._frm-b${formID}`])}</style>
    </>
  )
}

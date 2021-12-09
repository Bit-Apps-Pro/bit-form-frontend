import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $colorScheme, $darkThemeColors, $lightThemeColors, $styles, $themeVars } from '../../GlobalStates'
import { json2CssStr } from './styleHelpers'

export default function RenderThemeVarsAndFormCSS() {
  const { formID } = useParams()
  const styles = useRecoilValue($styles)
  const themeVars = useRecoilValue($themeVars)
  const lightThemeColors = useRecoilValue($lightThemeColors)
  const darkThemeColors = useRecoilValue($darkThemeColors)
  const colorScheme = useRecoilValue($colorScheme)

  return (
    <>
      <style>{json2CssStr('.layout-wrapper', themeVars)}</style>
      {colorScheme === 'light' && <style>{json2CssStr('.layout-wrapper', lightThemeColors)}</style>}
      {colorScheme === 'dark' && <style>{json2CssStr('.layout-wrapper', darkThemeColors)}</style>}
      <style>{json2CssStr(`._frm-${formID}`, styles.form._frm)}</style>
    </>
  )
}

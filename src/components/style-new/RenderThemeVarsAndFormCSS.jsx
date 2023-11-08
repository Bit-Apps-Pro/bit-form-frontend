/* eslint-disable no-underscore-dangle */
import { useAtomValue } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { json2CssStr } from './styleHelpers'

export default function RenderThemeVarsAndFormCSS() {
  const styles = useAtomValue($styles)
  const themeVars = useAtomValue($themeVars)
  const themeColors = useAtomValue($themeColors)
  return (
    <>
      <link rel="stylesheet" href={styles?.font?.fontURL} />
      <style>{json2CssStr('.layout-wrapper', themeVars)}</style>
      <style>{json2CssStr('.layout-wrapper', themeColors)}</style>
      {
        Object.entries(styles?.form || {}).map(([key, value]) => (
          <style key={key}>{json2CssStr(key, value)}</style>
        ))
      }
      {/* <style>{json2CssStr(`._frm-bg-b${formID}`, styles.form?.[`._frm-bg-b${formID}`])}</style>
      <style>{json2CssStr(`._frm-b${formID}`, styles.form?.[`._frm-b${formID}`])}</style>
      {formInfo?.isMultiStepForm && (
        <style>{json2CssStr(`._frm-b${formID}-step-container`, styles.form?.[`._frm-b${formID}-step-container`])}</style>
      )} */}
    </>
  )
}

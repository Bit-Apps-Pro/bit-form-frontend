import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $styles, $themeVars } from '../../GlobalStates'
import { json2CssStr } from './styleHelpers'

export default function RenderThemeVarsAndFormCSS() {
  const { formID } = useParams()
  const styles = useRecoilValue($styles)
  const themeVars = useRecoilValue($themeVars)
  let globalvars = '.layout-wrapper'
  globalvars += json2CssStr(themeVars)

  let fromStyle = `._frm-${formID}`
  // eslint-disable-next-line no-underscore-dangle
  fromStyle += json2CssStr(styles.form._frm)

  return (
    <>
      <style>{globalvars}</style>
      <style>{fromStyle}</style>
    </>
  )
}

import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates'
import RenderStyle from './RenderStyle'
import { json2CssStr } from './styleHelpers'

export default function RenderThemeVarsAndFormCSS() {
  const { formID } = useParams()
  const styles = useRecoilValue($styles)
  let globalvars = '.layout-wrapper'
  globalvars += json2CssStr(styles.themeVars)

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

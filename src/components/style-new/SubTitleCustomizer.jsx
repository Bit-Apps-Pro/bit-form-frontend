import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import FontWeightAndStyleControl from './FontWeightAndStyleControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function SubTitleCustomizer() {
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const themeColors = useRecoilValue($themeColors)

  const { '--sub-titl-bdr': stBdr } = themeVars

  const { '--sub-titl-sh': stSh,
    '--sub-titl-c': stC,
    '--sub-titl-bg': stBg } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Subtitle Background Color"
        value={stBg}
        stateObjName="themeColors"
        propertyPath="--sub-titl-bg"
        modalId="sub-titl-bg"
      />
      <SimpleColorPicker
        title="Text Color"
        subtitle="Text Color"
        value={stC}
        stateObjName="themeColors"
        propertyPath="--sub-titl-c"
        modalId="sub-titl-c"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={stSpacingObj}
          id="subtitle-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={subTitlShObj.paths.shadow}
            stateObjName={subTitlShObj.object}
          />
          <ShadowControl
            subtitle="Subtitle Shadow"
            value={stSh}
            objectPaths={subTitlShObj}
            id="sub-titl-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--sub-titl-bdr', '--sub-titl-bdr-width', '--sub-titl-bdr-rad']}
            propertyPath={['--sub-titl-bdr-width', '--sub-titl-bdr-rad']}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Subtitle Border"
            value={stBdr}
            objectPaths={stStylePathObj}
            id="sub-title-width-bdr-control"
          />
        </div>
      </ThemeStylePropertyBlock>
      <FontWeightAndStyleControl
        fontWeightVar="--sub-titl-font-w"
        fontStyleVar="--sub-titl-font-style"
      />
    </div>
  )
}
const stSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--sub-titl-m', padding: '--sub-titl-p' },
}
const subTitlShObj = {
  object: 'themeColors',
  paths: { shadow: '--sub-titl-sh' },
}
const stStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--sub-titl-bdr', borderWidth: '--sub-titl-bdr-width', borderRadius: '--sub-titl-bdr-rad' },
}

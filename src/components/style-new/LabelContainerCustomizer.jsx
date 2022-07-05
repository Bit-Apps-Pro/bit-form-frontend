import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function LabelContainerCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--lbl-wrp-bg': lwBg,
    '--lbl-wrp-sh': lwSh } = themeColors
  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Label & Subtitle Container Background"
        value={lwBg}
        stateObjName="themeColors"
        propertyPath="--lbl-wrp-bg"
        modalId="lbl-wrp-bg"
      />

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Label & Subtitle Container Spacing"
          objectPaths={lWrapperObj}
          id="lbl-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={labwrpShObj.paths.shadow}
            stateObjName={labwrpShObj.object}
            id="lbl-wrp-sh"
          />
          <ShadowControl
            subtitle="Label & Subtitle Container Shadow"
            value={lwSh}
            objectPaths={labwrpShObj}
            id="lbl-wrp-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--lbl-wrp-bdr', '--lbl-wrp-bdr-width', '--lbl-wrp-bdr-rad']}
            propertyPath={['--lbl-wrp-bdr-width', '--lbl-wrp-bdr-rad']}
            stateObjName="themeVars"
            id="lbl-wrp-bdr-reset"
          />
          <BorderControl
            subtitle="Label & Subtitle Container Border"
            objectPaths={borderPathsObj}
            id="lbl-wrp-bdr"
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}

const lWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--lbl-wrp-m', padding: '--lbl-wrp-p' },
}
const labwrpShObj = {
  object: 'themeColors',
  paths: { shadow: '--lbl-wrp-sh' },
}

const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-style': '--lbl-wrp-bdr',
      'border-width': '--lbl-wrp-bdr-width',
      'border-radius': '--lbl-wrp-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { 'border-color': '--lbl-wrp-bdr-clr' },
  },
]

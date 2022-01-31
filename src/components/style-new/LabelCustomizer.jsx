import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import FontWeightAndStyleControl from './FontWeightAndStyleControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function LabelCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--fld-lbl-c': flc,
    '--fld-lbl-sh': flSh,
    '--fld-lbl-bg': flBg,
    '--fld-lbl-bdr': flBdr } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Subtitle Background Color"
        value={flBg}
        stateObjName="themeColors"
        propertyPath="--fld-lbl-bg"
        modalId="fld-lbl-bg"
      />
      <SimpleColorPicker
        title="Text Colors"
        subtitle="Text Color"
        value={flc}
        stateObjName="themeColors"
        propertyPath="--fld-lbl-c"
        modalId="fld-lbl-c"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={flSpacingObj}
          id="lbl-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fldLblShObj.paths.shadow}
            stateObjName={fldLblShObj.object}
          />
          <ShadowControl
            subtitle="Label Shadow"
            value={flSh}
            objectPaths={fldLblShObj}
            id="fld-lbl-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--fld-lbl-bdr', '--fld-lbl-bdr-width', '--fld-lbl-bdr-rad']}
            propertyPath={['--fld-lbl-bdr-width', '--fld-lbl-bdr-rad']}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Label Border"
            value={flBdr}
            objectPaths={flStylePathObj}
            id="fld-lbl-bdr-width"
          />
        </div>
      </ThemeStylePropertyBlock>
      <FontWeightAndStyleControl
        fontWeightVar="--fld-font-w"
        fontStyleVar="--fld-font-style"
      />
    </div>
  )
}

const flSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--fld-lbl-m', padding: '--fld-lbl-p' },
}
const fldLblShObj = {
  object: 'themeColors',
  paths: { shadow: '--fld-lbl-sh' },
}
const flStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--fld-lbl-bdr', borderWidth: '--fld-lbl-bdr-width', borderRadius: '--fld-lbl-bdr-rad' },
}

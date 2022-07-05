import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import FontSizeControl from './FontSizeControl'
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
    '--fld-lbl-bg': flBg } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Label Background Color"
        value={flBg}
        stateObjName="themeColors"
        propertyPath="--fld-lbl-bg"
        modalId="fld-lbl-bg"
      />
      <SimpleColorPicker
        title="Text Color"
        subtitle="Label Text Color"
        value={flc}
        stateObjName="themeColors"
        propertyPath="--fld-lbl-c"
        modalId="fld-lbl-c"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Label Spacing"
          objectPaths={flSpacingObj}
          id="lbl-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fldLblShObj.paths.shadow}
            stateObjName={fldLblShObj.object}
            id="fld-lbl-sh"
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
            id="fld-lbl-bdr"
          />
          <BorderControl
            subtitle="Label Border"
            objectPaths={borderPathsObj}
            id="fld-lbl-bdr"
          />
        </div>
      </ThemeStylePropertyBlock>
      <FontSizeControl
        stateObjName="themeVars"
        propertyPath="--fld-lbl-fs"
        id="fld-lbl-fs"
      />
      <FontWeightAndStyleControl
        fontWeightVar="--lbl-font-w"
        fontStyleVar="--lbl-font-style"
        id="fld-lbl-font"
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

const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-style': '--fld-lbl-bdr',
      'border-width': '--fld-lbl-bdr-width',
      'border-radius': '--fld-lbl-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { 'border-color': '--fld-lbl-bdr-clr' },
  },
]

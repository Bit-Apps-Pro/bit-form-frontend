import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function InputCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const { '--global-fld-bg-color': fldBg } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Input Background Color"
        value={fldBg}
        stateObjName="themeColors"
        propertyPath="--global-fld-bg-color"
        modalId="global-fld-bg-color"
      />

      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={['--g-bdr-width', '--global-fld-bdr', '--g-bdr-rad']}
            stateObjName="themeVars"
            id="inp-titl-bdr"
          />
          <BorderControl
            subtitle="Input Border"
            objectPaths={borderPathsObj}
            id="inp-titl-bdr-ctrl"
          />
        </div>
      </ThemeStylePropertyBlock>

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Input Spacing"
          objectPaths={inpSpacingObj}
          id="input-spacing-ctrl"
        />
      </div>
    </div>
  )
}
const inpSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--fld-m', padding: '--fld-p' },
}

const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-style': '--global-fld-bdr',
      'border-width': '--g-bdr-width',
      'border-radius': '--g-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { 'border-color': '--global-fld-bdr-clr' },
  },
]

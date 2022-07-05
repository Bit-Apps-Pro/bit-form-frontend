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

export default function HelperTextCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--hlp-txt-bg': htBg,
    '--hlp-txt-c': htC,
    '--hlp-txt-sh': htSh } = themeColors
  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Helper Text Background Color Control"
        value={htBg}
        stateObjName="themeColors"
        propertyPath="--hlp-txt-bg"
        modalId="hlp-txt-bg"
      />

      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--hlp-txt-bdr', '--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
            propertyPath={['--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
            stateObjName="themeVars"
            id="hlp-txt-bdr"
          />
          <BorderControl
            subtitle="Helper Text Border Control"
            objectPaths={borderPathsObj}
            id="hlp-txt-bdr"
          />
        </div>
      </ThemeStylePropertyBlock>

      <FontSizeControl
        stateObjName="themeVars"
        propertyPath="--hlp-txt-fs"
        id="hlp-txt-fs"
      />

      <FontWeightAndStyleControl
        fontWeightVar="--hlp-txt-font-w"
        fontStyleVar="--hlp-txt-font-style"
        id="hlp-txt-font"
      />

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Helper Text Spacing control"
          objectPaths={htSpacingObj}
          id="hlp-spacing-ctrl"
        />
      </div>

      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={hlpTxtShObj.paths.shadow}
            stateObjName={hlpTxtShObj.object}
            id="hlp-txt-sh"
          />
          <ShadowControl
            subtitle="Helper Text Shadow Control"
            value={htSh}
            objectPaths={hlpTxtShObj}
            id="hlp-txt-sh"
          />
        </div>
      </ThemeStylePropertyBlock>

      <SimpleColorPicker
        title="Text Color"
        subtitle="Helper Text Color Control"
        value={htC}
        stateObjName="themeColors"
        propertyPath="--hlp-txt-c"
        modalId="hlp-txt-c"
      />
    </div>
  )
}
const htSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--hlp-txt-m', padding: '--hlp-txt-p' },
}

const hlpTxtShObj = {
  object: 'themeColors',
  paths: { shadow: '--hlp-txt-sh' },
}

const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-width': '--hlp-txt-bdr-width',
      'border-radius': '--hlp-txt-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { border: '--hlp-txt-bdr' },
  },
]

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

export default function HelperTextCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--hlp-txt-bg': htBg,
    '--hlp-txt-c': htC,
    '--hlp-txt-sh': htSh,
    '--hlp-txt-bdr': htBdr } = themeColors
  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Background Color"
        value={htBg}
        stateObjName="themeColors"
        propertyPath="--hlp-txt-bg"
        modalId="hlp-txt-bg"
      />
      <SimpleColorPicker
        title="Text Color"
        subtitle="Text Color"
        value={htC}
        stateObjName="themeColors"
        propertyPath="--hlp-txt-c"
        modalId="hlp-txt-c"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={htSpacingObj}
          id="hlp-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={hlpTxtShObj.paths.shadow}
            stateObjName={hlpTxtShObj.object}
          />
          <ShadowControl
            subtitle="Helper Text Shadow"
            value={htSh}
            objectPaths={hlpTxtShObj}
            id="hlp-txt-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            // propertyPath={['--hlp-txt-bdr', '--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
            propertyPath={['--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Helper Text Border"
            value={htBdr}
            objectPaths={htStylePathObj}
            id="hlp-txt-control"
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}
const htSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--hlp-txt-m', padding: '--hlp-txt-p' },
}
const htStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--hlp-txt-bdr', borderWidth: '--hlp-txt-bdr-width', borderRadius: '--hlp-txt-bdr-rad' },
}
const hlpTxtShObj = {
  object: 'themeColors',
  paths: { shadow: '--hlp-txt-sh' },
}

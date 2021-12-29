import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function ErrorMessagesCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--err-bg': errBg,
    '--err-c': errC,
    '--err-sh': errSh,
    '--err-bdr': errB } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Background Color"
        value={errBg}
        stateObjName="themeColors"
        propertyPath="--err-bg"
        modalId="err-bg"
      />
      <SimpleColorPicker
        title="Text Color"
        subtitle="Text Color"
        value={errC}
        stateObjName="themeColors"
        propertyPath="--err-c"
        modalId="err-c"
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={errMsgSpacingObj}
          id="err-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={errShObj.paths.shadow}
            stateObjName={errShObj.object}
          />
          <ShadowControl
            subtitle="Error Message Shadow"
            value={errSh}
            objectPaths={errShObj}
            id="err-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          {/* <ResetStyle propertyPath={['--err-bdr', '--err-bdr-width', '--err-bdr-rad']} stateObjName="themeVars" /> */}
          <ResetStyle
            propertyPath={['--err-bdr-width', '--err-bdr-rad']}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Error Message Border"
            value={errB}
            objectPaths={errStylePathObj}
            id="err-control"
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}
const errMsgSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--err-m', padding: '--err-p', shadow: '--err-sh' },
}
const errShObj = {
  object: 'themeColors',
  paths: { shadow: '--err-sh' },
}
const errStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--err-bdr', borderWidth: '--err-bdr-width', borderRadius: '--err-bdr-rad' },
}

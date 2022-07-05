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

export default function ErrorMessagesCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const { '--err-bg': errBg,
    '--err-c': errC,
    '--err-sh': errSh } = themeColors

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Background Color"
        subtitle="Error Messages Background Color"
        value={errBg}
        stateObjName="themeColors"
        propertyPath="--err-bg"
        modalId="err-msg-bg"
      />

      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          {/* <ResetStyle propertyPath={['--err-bdr', '--err-bdr-width', '--err-bdr-rad']} stateObjName="themeVars" /> */}
          <ResetStyle
            propertyPath={['--err-bdr-width', '--err-bdr-rad']}
            stateObjName="themeVars"
            id="err-msg-bdr"
          />
          <BorderControl
            subtitle="Error Message Border"
            objectPaths={borderPathsObj}
            id="err-msg-bdr"
          />
        </div>
      </ThemeStylePropertyBlock>

      <FontSizeControl
        stateObjName="themeVars"
        propertyPath="--err-txt-fs"
        id="err-msg-txt-fs"
      />

      <FontWeightAndStyleControl
        fontWeightVar="--err-txt-font-w"
        fontStyleVar="--err-txt-font-style"
        id="err-msg-txt-font"
      />

      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={errShObj.paths.shadow}
            stateObjName={errShObj.object}
            id="err-msg-sh"
          />
          <ShadowControl
            subtitle="Error Messages Shadow Control"
            value={errSh}
            objectPaths={errShObj}
            id="err-msg-sh"
          />
        </div>
      </ThemeStylePropertyBlock>

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Error Messages Spacing Control"
          objectPaths={errMsgSpacingObj}
          id="err-msg-spacing-ctrl"
        />
      </div>

      <SimpleColorPicker
        title="Text Color"
        subtitle="Error Messages Text Color"
        value={errC}
        stateObjName="themeColors"
        propertyPath="--err-c"
        modalId="err-msg-c"
      />

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

const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-width': '--err-bdr-width',
      'border-radius': '--err-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { border: '--err-bdr' },
  },
]

import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SpacingControl from './SpacingControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function IcnCustomizer({ elementKey }) {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)

  const preIconSpacingObj = {
    object: 'themeVars',
    paths: { margin: `--${elementKey}-m`, padding: `--${elementKey}-p` },
  }
  const preIcnShObj = {
    object: 'themeColors',
    paths: { shadow: `--${elementKey}-sh` },
  }
  const preIcnBdrObj = {
    object: 'themeVars',
    borderObjName: 'themeColors',
    paths: { border: `--${elementKey}-bdr`, borderWidth: `--${elementKey}-bdr-width`, borderRadius: `--${elementKey}-bdr-rad` },
  }

  return (
    <div className={css(ut.m10)}>
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Spacing control"
          objectPaths={preIconSpacingObj}
          id="pre-i-spacing-control"
        />
      </div>
      <ThemeStylePropertyBlock label="Shadow">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={preIcnShObj.paths.shadow}
            stateObjName={preIcnShObj.object}
          />
          <ShadowControl
            subtitle="Prefix Icon Shadow"
            value={themeColors[`--${elementKey}-sh`]}
            objectPaths={preIcnShObj}
            id="pre-i-sh"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={[`--${elementKey}-bdr-width`, `--${elementKey}-bdr-rad`]}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle="Prefix Icon Border"
            value={themeColors[`--${elementKey}-bdr`]}
            objectPaths={preIcnBdrObj}
            id="pre-i-control"
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}

/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import FontSizeControl from './FontSizeControl'
import FontWeightAndStyleControl from './FontWeightAndStyleControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function AsteriskCustomizer() {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)

  const lhVar = '--req-smbl-lh'
  const { '--req-smbl-c': flc } = themeColors

  const updateState = (varName, value = '') => {
    setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle[varName] = value
    }))
  }

  const unitHandler = (unit, value, name) => {
    const preUnit = getStrFromStr(themeVars[name])
    const convetVal = unitConverter(unit, value, preUnit)
    const val = `${convetVal}${unit}`
    updateState(name, val)
  }

  const icnSizeHandler = ({ v, u }, prop) => {
    const val = `${v}${u}`
    updateState(prop, val)
  }

  return (
    <div className={css(ut.m10)}>
      <SimpleColorPicker
        title="Color"
        subtitle="Asterisk Color Control"
        value={flc}
        stateObjName="themeColors"
        propertyPath="--req-smbl-c"
        modalId="req-smbl-c"
      />

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle="Label Spacing Control"
          objectPaths={flSpacingObj}
          id="lbl-spacing-control"
        />
      </div>

      <FontWeightAndStyleControl
        fontWeightVar="--req-smbl-fw"
        fontStyleVar="--lbl-font-style"
      />

      <FontSizeControl
        stateObjName="themeVars"
        propertyPath="--req-smbl-fs"
      />

      <ThemeStylePropertyBlock label="Line Height">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={lhVar}
            stateObjName="themeVars"
          />
          <SizeControl
            width="128px"
            value={Number(getNumFromStr(themeVars[lhVar]))}
            unit={getStrFromStr(themeVars[lhVar])}
            inputHandler={({ value, unit }) => icnSizeHandler({ v: value, u: unit }, lhVar)}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, lhVar)}
            options={['px', 'em', 'rem', '%']}
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}

const flSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--req-smbl-m', padding: '--req-smbl-p' },
}

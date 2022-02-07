/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import BorderControl from './BorderControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SpacingControl from './SpacingControl'
import { getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function IcnCustomizer({ elementKey }) {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const weightVar = `--${elementKey}-w`
  const heightVar = `--${elementKey}-h`

  const icnValue = (varName) => getNumFromStr(themeVars[varName])
  const icnUnit = (varName) => getStrFromStr(themeVars[varName])

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

  const preIconSpacingObj = {
    object: 'themeVars',
    paths: {
      margin: `--${elementKey}-m`,
      padding: `--${elementKey}-p`,
    },
  }
  const preIcnShObj = {
    object: 'themeColors',
    paths: { shadow: `--${elementKey}-sh` },
  }
  const preIcnBdrObj = {
    object: 'themeVars',
    borderObjName: 'themeColors',
    paths: {
      border: `--${elementKey}-bdr`,
      borderWidth: `--${elementKey}-bdr-width`,
      borderRadius: `--${elementKey}-bdr-rad`,
    },
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
      <ThemeStylePropertyBlock label="Width">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={weightVar}
            stateObjName="themeVars"
          />
          <SizeControl
            width="128px"
            value={Number(icnValue(weightVar))}
            unit={icnUnit(weightVar)}
            inputHandler={({ value, unit }) => icnSizeHandler({ v: value, u: unit }, weightVar)}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, weightVar)}
            options={['px', 'em', 'rem', '%']}
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Height">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={heightVar}
            stateObjName="themeVars"
          />
          <SizeControl
            width="128px"
            value={Number(icnValue(heightVar))}
            unit={icnUnit(heightVar)}
            inputHandler={({ value, unit }) => icnSizeHandler({ v: value, u: unit }, heightVar)}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, heightVar)}
            options={['px', 'em', 'rem', '%']}
          />
        </div>
      </ThemeStylePropertyBlock>
    </div>
  )
}

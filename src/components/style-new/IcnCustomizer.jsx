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
import FilterColorPicker from './FilterColorPicker'
import FilterController from './FilterController'
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

  const title = () => {
    const value = elementKey.match(/(pre|suf)/gi)?.[0]
    if (value === 'pre') return 'Prefix'
    if (value === 'suf') return 'Suffix'
  }

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
  const preIcnFltrObj = {
    object: 'themeColors',
    paths: { filter: `--${elementKey}-fltr` },
  }

  const borderPathsObj = [
    {
      object: 'themeVars',
      paths: {
        'border-width': `--${elementKey}-bdr-width`,
        'border-radius': `--${elementKey}-bdr-rad`,
      },
    },
    {
      object: 'themeColors',
      paths: { border: `--${elementKey}-bdr` },
    },
  ]

  const { [`--${elementKey}-clr`]: fltrColorValue } = themeColors
  console.log('filter colorValue=', fltrColorValue)

  return (
    <div className={css(ut.m10)}>
      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={[`--${elementKey}-bdr-width`, `--${elementKey}-bdr-rad`]}
            stateObjName="themeVars"
          />
          <BorderControl
            subtitle={`${title()} Icon Border Control`}
            objectPaths={borderPathsObj}
            id="pre-i-control"
          />
        </div>
      </ThemeStylePropertyBlock>

      <FilterColorPicker
        title="Color"
        subtitle="Label Text Color Control"
        value={fltrColorValue}
        stateObjName="themeColors"
        propertyPath={`--${elementKey}-clr`}
        objectPaths={{
          object: 'themeColors',
          paths: {
            'icon-color': `--${elementKey}-clr`,
            filter: `--${elementKey}-fltr`,
          },
        }}
        modalId={`--${elementKey}-fltr`}
      />
      <ThemeStylePropertyBlock label="Filter">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={`--${elementKey}-fltr`}
            stateObjName="themeColors"
          />
          <FilterController
            action={{ type: 'filter-control' }}
            subtitle={`${title()} Filter control`}
            objectPaths={preIcnFltrObj}
            id="filter-control"
          />
        </div>
      </ThemeStylePropertyBlock>

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
        <SpacingControl
          action={{ type: 'spacing-control' }}
          subtitle={`${title()} Icon Spacing Control`}
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
            subtitle={`${title()} Icon Shadow Control`}
            value={themeColors[`--${elementKey}-sh`]}
            objectPaths={preIcnShObj}
            id="pre-i-sh"
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

    </div>
  )
}

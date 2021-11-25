import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleColorPickerTooltip from './SimpleColorPickerTooltip'
import { getNumFromStr, getStrFromStr, getStyleValueFromObjectPath, splitValueBySpaces, unitConverterHelper } from './styleHelpers'

export default function ShadowControlMenu({ objectPaths }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { object, paths } = objectPaths

  const shadowStyle = getStyleValueFromObjectPath(object, paths.shadow, { themeVars })

  const extractShadowValue = () => {
    const shadowExtracted = splitValueBySpaces(shadowStyle)

    return {
      xOffset: shadowExtracted[0],
      yOffset: shadowExtracted[1],
      blur: shadowExtracted[2],
      spread: shadowExtracted[3],
      color: shadowExtracted[4],
      inset: shadowExtracted[5],
    }
  }

  const shadowValues = extractShadowValue()

  const generateShadowValue = (name, { value, unit }) => {
    const newShadowStyle = Object.entries(shadowValues).map(([shName, shVal]) => {
      if (shName === name) {
        return `${value || ''}${unit || ''}`
      }
      return `${shVal || ''}`
    }).join(' ')

    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[paths.shadow] = newShadowStyle
    }))

    console.log({ newShadowStyle })
  }

  const unitHandler = (name, unit, value, oldVal) => {
    if (value) {
      const preUnit = getStrFromStr(oldVal)
      const convertedVal = unitConverterHelper(unit, value, preUnit)
      generateShadowValue(name, { value: convertedVal, unit })
    }
  }

  console.log(shadowValues)

  return (
    <div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>X</span>
        <SizeControl
          width="105px"
          value={Number(getNumFromStr(shadowValues.xOffset) || 0)}
          unit={getStrFromStr(shadowValues.xOffset)}
          inputHandler={valObj => generateShadowValue('xOffset', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, shadowValues.xOffset)}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Y</span>
        <SizeControl
          width="105px"
          value={Number(getNumFromStr(shadowValues.yOffset) || 0)}
          unit={getStrFromStr(shadowValues.yOffset)}
          inputHandler={valObj => generateShadowValue('yOffset', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('yOffset', unitKey, unitValue, shadowValues.yOffset)}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Blur</span>
        <SizeControl
          width="105px"
          value={Number(getNumFromStr(shadowValues.blur) || 0)}
          unit={getStrFromStr(shadowValues.blur)}
          inputHandler={valObj => generateShadowValue('blur', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('blur', unitKey, unitValue, shadowValues.blur)}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Spread</span>
        <SizeControl
          width="105px"
          value={Number(getNumFromStr(shadowValues.spread) || 0)}
          unit={getStrFromStr(shadowValues.spread)}
          inputHandler={valObj => generateShadowValue('spread', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('spread', unitKey, unitValue, shadowValues.spread)}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip action={{ onChange: val => generateShadowValue('color', { value: val }) }} value={shadowValues.color} />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Inset</span>
        <select name="" id="" value={shadowValues.inset || ''} onChange={e => generateShadowValue('inset', { value: e.target.value })}>
          <option value="">outset</option>
          <option value="inset">inset</option>
        </select>
      </div>
    </div>
  )
}

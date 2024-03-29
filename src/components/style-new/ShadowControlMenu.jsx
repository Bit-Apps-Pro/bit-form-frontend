import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleColorPickerTooltip from './SimpleColorPickerTooltip'
import {
  getNumFromStr, getObjByKey, getStrFromStr, getValueByObjPath, setStyleStateObj, splitValueBySpaces, unitConverter,
} from './styleHelpers'

export default function ShadowControlMenu({ objectPaths, id }) {
  const { css } = useFela()
  const { fieldKey, element } = useParams()
  const [themeColors, setThemeColors] = useAtom($themeColors)
  const [styles, setStyles] = useAtom($styles)
  const { object, paths } = objectPaths

  const currentState = getObjByKey(object, { themeColors, styles })
  const shadowStyleStr = getValueByObjPath(currentState, paths.shadow, { themeColors, styles })

  const shadowValues = extractShadowValue(shadowStyleStr)

  const newShadowVal = (name, val, unit) => {
    if (name === 'color') {
      return val || 'hsla(0, 0%, 0%, 100)'
    }
    if (name === 'inset') {
      return val || ''
    }
    return `${val || '0'}${unit === undefined ? 'px' : unit}`
  }

  const generateShadowValue = (name, { value, unit }) => {
    const newshadowStyleStr = Object.entries(shadowValues).map(([shName, shVal]) => {
      if (shName === name) {
        return newShadowVal(name, value, unit)
      }
      return newShadowVal(shName, shVal, '')
    }).join(' ')

    setStyleStateObj(object, paths.shadow, newshadowStyleStr, { setThemeColors, setStyles })
    addToBuilderHistory(generateHistoryData(element, fieldKey, paths.shadow, newshadowStyleStr, { [object]: getLatestState(object) }))
  }

  const unitHandler = (name, unit, value, oldVal) => {
    if (value) {
      const preUnit = getStrFromStr(oldVal)
      const convertedVal = unitConverter(unit, value, preUnit)
      generateShadowValue(name, { value: convertedVal, unit })
    }
  }

  return (
    <div>
      <div className={css(ut.flxcb, ut.mb2, ut.pt1)}>
        <span className={css(ut.fs12, ut.fw500)}>X</span>
        <SizeControl
          width="128px"
          value={Number(getNumFromStr(shadowValues.xOffset) || 0)}
          unit={getStrFromStr(shadowValues.xOffset) || 'px'}
          inputHandler={valObj => generateShadowValue('xOffset', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, shadowValues.xOffset)}
          options={['px', 'em', 'rem']}
          min="-10"
          max="20"
          dataTestId={`${id}-x-offset`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Y</span>
        <SizeControl
          width="128px"
          value={Number(getNumFromStr(shadowValues.yOffset) || 0)}
          unit={getStrFromStr(shadowValues.yOffset) || 'px'}
          inputHandler={valObj => generateShadowValue('yOffset', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('yOffset', unitKey, unitValue, shadowValues.yOffset)}
          options={['px', 'em', 'rem']}
          min="-10"
          max="20"
          dataTestId={`${id}-y-offset`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Blur</span>
        <SizeControl
          width="128px"
          value={Number(getNumFromStr(shadowValues.blur) || 0)}
          unit={getStrFromStr(shadowValues.blur) || 'px'}
          inputHandler={valObj => generateShadowValue('blur', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('blur', unitKey, unitValue, shadowValues.blur)}
          options={['px', 'em', 'rem']}
          min="0"
          max="10"
          dataTestId={`${id}-blur`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Spread</span>
        <SizeControl
          width="128px"
          value={Number(getNumFromStr(shadowValues.spread) || 0)}
          unit={getStrFromStr(shadowValues.spread) || 'px'}
          inputHandler={valObj => generateShadowValue('spread', valObj)}
          sizeHandler={({ unitKey, unitValue }) => unitHandler('spread', unitKey, unitValue, shadowValues.spread)}
          options={['px', 'em', 'rem']}
          min="-5"
          max="20"
          dataTestId={`${id}-spread`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip action={{ onChange: val => generateShadowValue('color', { value: val }) }} value={shadowValues.color} />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Inset</span>
        <select
          className={css(sc.select)}
          value={shadowValues.inset || ''}
          onChange={e => generateShadowValue('inset', { value: e.target.value })}
          data-testid={`${id}-inset`}
        >
          <option value="">outset</option>
          <option value="inset">inset</option>
        </select>
      </div>
    </div>
  )
}

const extractShadowValue = (shadowStr) => {
  const [xOffset, yOffset, blur, spread, color, inset] = splitValueBySpaces(shadowStr)
  return { xOffset, yOffset, blur, spread, color, inset }
}

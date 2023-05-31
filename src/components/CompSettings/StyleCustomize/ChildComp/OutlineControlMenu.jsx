/* eslint-disable react/forbid-prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeColors } from '../../../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import BoxFullIcon from '../../../../Icons/BoxFullIcon'
import ut from '../../../../styles/2.utilities'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../../Utils/FormBuilderHelper'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import {
  getNumFromStr, getObjByKey, getStrFromStr, getValueByObjPath, getValueFromStateVar, setStyleStateObj, splitValueBySpaces, unitConverter
} from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SizeControl from './SizeControl'

/**
 * @function OutlineControlMenu
 * @param {objectPaths}  Array|Object
 * @param {id} String
 * @when OutlineControlMenu are Array
 */

export default function OutlineControlMenu({ objectPaths, id }) {
  const { css } = useFela()
  const { '*': rightBarUrl } = useParams()
  const [themeVars, setThemeVars] = useAtom($themeVars)
  const [styles, setStyles] = useAtom($styles)
  const [themeColors, setThemeColors] = useAtom($themeColors)
  const [element, fieldKey] = rightBarUrl.split('/')

  const stateObj = (objName) => getObjByKey(objName, { themeVars, styles, themeColors })
  const getValue = (objectProp) => getValueFromStateVar(stateObj(objectProp.object), getValueByObjPath(stateObj(objectProp.object), objectProp.path))

  /**
   * When objectPaths is Array
   * 0 => ThemeVars {borderWidth, borderRadius}
   */

  const propertiesObj = []

  if (Array.isArray(objectPaths)) {
    objectPaths.forEach((obj) => {
      const { paths, object } = obj
      const propKeys = Object.keys(obj.paths)
      propKeys.forEach((key) => {
        propertiesObj[key] = {
          object,
          path: paths[key],
        }
      })
    })
  } else {
    const { paths, object } = objectPaths
    const properties = Object.keys(paths)
    properties.forEach((prop) => {
      propertiesObj[prop] = {
        object,
        path: paths[prop],
      }
    })
  }

  const propertiesValue = {
    'outline-color': '',
    'outline-width': '',
    'outline-offset': '',
    'outline-style': '',
  }
  const propertiesKey = Object.keys(propertiesObj)
  for (let i = 0; i < propertiesKey.length; i += 1) {
    const prop = propertiesKey[i]
    if (propertiesKey.length === 2 && prop === 'outline') {
      const valStr = getValue(propertiesObj[prop])
      const val = valStr?.split(/(?!\(.*)\s(?![^(]*?\))/g)
      propertiesValue['outline-width'] = getValueFromStateVar(propertiesObj[prop], val[0]) || ''
      propertiesValue['outline-style'] = getValueFromStateVar(propertiesObj[prop], val[1]) || ''
      propertiesValue['outline-color'] = getValueFromStateVar(propertiesObj[prop], val[2]) || ''
      break
    }
    if (prop === 'outline-offset') continue
    propertiesValue[prop] = getValue(propertiesObj[prop])
  }
  propertiesValue['outline-offset'] = getValue(propertiesObj['outline-offset'])

  const newOutlineVal = (name, val) => {
    if (name === 'outline-width') {
      return val || '0px'
    }
    if (name === 'outline-style') {
      return val || 'solid'
    }
    if (name === 'outline-color') {
      return val || 'hsla(0, 0%, 0%, 0.5)'
    }
  }

  const onValueChange = (val, prop) => {
    let newVal
    let newProp = prop
    if (propertiesKey.length === 2 && Object.keys(propertiesObj).includes('outline') && prop !== 'outline-offset') {
      newProp = 'outline'
      const extractValue = extractOutlineValue(getValue(propertiesObj.outline))
      newVal = Object.entries(extractValue).map(([propName, propValue]) => {
        if (propName === prop) {
          return newOutlineVal(prop, val)
        }
        return newOutlineVal(propName, propValue)
      }).join(' ')
    }
    if (Object.keys(propertiesObj).includes('outline-offset') && prop === 'outline-offset') {
      newVal = val
    }
    const { object, path } = propertiesObj[newProp]
    const index = getValue(propertiesObj[newProp])?.indexOf('!important')
    newVal = index >= 0 ? `${val} !important` : newVal
    setStyleStateObj(object, path, newVal, { setThemeVars, setThemeColors, setStyles })

    addToBuilderHistory(generateHistoryData(element, fieldKey, newProp, newVal, { [object]: getLatestState(object) }))
  }

  const handleValues = ({ unit, value, prop, oldVal }) => {
    if (value) {
      const preUnit = getStrFromStr(oldVal)
      const convertedVal = unitConverter(unit, value, preUnit)
      const val = `${convertedVal}${unit || 'px'}`
      onValueChange(val, prop)
    }
  }

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2, { w: 200 })}>
        <span className={css(ut.fs12, ut.fw500)}>Type</span>
        <SimpleDropdown
          options={options}
          value={propertiesValue?.['outline-style']}
          onChange={val => onValueChange(val, 'outline-style')}
          w={130}
          h={30}
          id={`${id}-style`}
        />
      </div>

      <div className={css(ut.flxcb, ut.mb2, { w: 200 })}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip
          action={{ onChange: val => onValueChange(val, 'outline-color') }}
          value={propertiesValue?.['outline-color']}
        />
      </div>

      <div className={css(ut.mb2, { w: 200 })}>
        <div className={css(s.titleContainer)}>
          <span className={css(s.title)}>Width</span>
          <span className={css(ut.flxc)}>
            {/* <ResetStyle stateObjName={stateObjName} propertyPath={propertyPath} /> */}
          </span>
          <div className={css({ p: 2 })}>
            <SizeControl
              min="0"
              inputHandler={({ unit, value }) => handleValues({ unit, value, prop: 'outline-width' })}
              sizeHandler={({ unitKey, unitValue }) => handleValues({ value: unitValue, unit: unitKey, prop: 'outline-width', oldVal: propertiesValue?.['outline-width'] })}
              id="0"
              label={<BoxFullIcon size={14} />}
              value={propertiesValue?.['outline-width'] && getNumFromStr(propertiesValue?.['outline-width'])}
              unit={propertiesValue?.['outline-width'] && getStrFromStr(propertiesValue?.['outline-width'])}
              options={['px', 'em', 'rem', '%']}
              width="128px"
              dataTestId="outline-width-control"
            />
          </div>
        </div>
      </div>
      <div className={css(ut.mb2, { w: 200 })}>
        <div className={css(s.titleContainer)}>
          <span className={css(s.title)}>Offset</span>
          <span className={css(ut.flxc)}>
            {/* <ResetStyle stateObjName={stateObjName} propertyPath={propertyPath} /> */}
          </span>
          <div className={css({ p: 2 })}>
            <SizeControl
              min="0"
              inputHandler={({ value, unit }) => handleValues({ value, unit, prop: 'outline-offset' })}
              sizeHandler={({ unitKey, unitValue }) => handleValues({ value: unitValue, unit: unitKey, prop: 'outline-offset', oldVal: propertiesValue?.['outline-offset'] })}
              id="0"
              label={<BoxFullIcon size={14} />}
              value={propertiesValue?.['outline-offset'] && getNumFromStr(propertiesValue?.['outline-offset'])}
              unit={propertiesValue?.['outline-offset'] && getStrFromStr(propertiesValue?.['outline-offset'])}
              options={['px', 'em', 'rem', '%']}
              width="128px"
              dataTestId="outline-width-control"
            />
          </div>
        </div>
      </div>
    </>
  )
}

const s = {
  titleContainer: { flx: 'center-between' },
  title: { fs: 12, fw: 500 },
}
const options = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Double', value: 'double' },
  { label: 'Groove', value: 'groove' },
  { label: 'Ridge', value: 'ridge' },
  { label: 'Inset', value: 'inset' },
  { label: 'Outset', value: 'outset' },
  { label: 'None', value: 'none' },
]

const extractOutlineValue = (shadowStr) => {
  const [width, style, color] = splitValueBySpaces(shadowStr)
  return { 'outline-width': width, 'outline-style': style, 'outline-color': color }
}

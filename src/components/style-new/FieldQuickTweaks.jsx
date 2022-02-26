/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SimpleColorPicker from './SimpleColorPicker'
import { commonStyle, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function FieldQuickTweaks({ fieldKey }) {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const themeVars = useRecoilValue($themeVars)
  const { '--global-accent-color': accentColor } = themeColors
  const [styles, setStyles] = useRecoilState($styles)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const getValueByPath = propPath => getValueFromStateVar(themeVars, getValueByObjPath(styles, propPath))

  const btnBrdrRadiusValue = getValueByPath(propertyPath('btn', 'border-radius'))

  const setSizes = ({ target: { value } }) => {
    const commonStyleClasses = commonStyle(fieldKey, value)
    const cmnStlClasses = Object.keys(commonStyleClasses)
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const stylesClasses = drftStyle.fields[fieldKey].classes
      const cmnStlClsLen = cmnStlClasses.length

      for (let i = 0; i < cmnStlClsLen; i += 1) {
        if (Object.prototype.hasOwnProperty.call(stylesClasses, cmnStlClasses[i])) {
          const cmnClsProperty = commonStyleClasses[cmnStlClasses[i]]
          const cmnClsPropertyKey = Object.keys(cmnClsProperty)
          const cmnClsPropertyKeyLan = cmnClsPropertyKey.length

          for (let popIndx = 0; popIndx < cmnClsPropertyKeyLan; popIndx += 1) {
            const cmnClsPropertyValue = cmnClsProperty[cmnClsPropertyKey[popIndx]]
            // eslint-disable-next-line no-param-reassign
            drftStyle.fields[fieldKey].classes[cmnStlClasses[i]][cmnClsPropertyKey[popIndx]] = cmnClsPropertyValue
          }
        }
      }
    }))
  }

  const setMuptipleProperty = (propertyPaths, values) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      propertyPaths.map((path, index) => {
        assignNestedObj(drftStyle, path, values[index])
      })
    }))
  }

  const setBtnSize = (elementKey, value) => {
    switch (value) {
      case 'small-2':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['12px', '7px 10px'],
        )
        break
      case 'small-1':
        setMuptipleProperty(
          [propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding')],
          ['14px', '9px 15px'],
        )
        break
      case 'medium':
        setMuptipleProperty(
          [propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['16px', '11px 20px'],
        )
        break
      case 'large':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding')],
          ['18px', '12px 22px'],
        )
        break
      case 'large-1':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['21px', '14px 24px'],
        )
        break
      default:
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['16px', '11px 20px'],
        )
        break
    }
  }

  const setElementBrdrRadius = (elementKey, value) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, propertyPath(elementKey, 'border-radius'), value)
    }))
  }

  const borderRadHandler = ({ value, unit }) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const fld = prvStyle.fields[fieldKey]
      if (fld.theme === 'bitformDefault' && fld.fieldType === 'text') {
        assignNestedObj(drftStyle, propertyPath('fld', 'border-radius'), `${value}${unit}`)
      } else if (fld.theme === 'bitformDefault' && fld.fieldType === 'check') {
        assignNestedObj(drftStyle, propertyPath('ck', 'border-radius'), `${value}${unit}`)
      }
    }))
  }

  const getBorderRadius = () => {
    const elementKey = styles.fields[fieldKey].fieldType === 'text' ? 'fld' : 'ck'
    let brsValue = getValueByObjPath(styles, propertyPath(elementKey, 'border-radius'))
    if (brsValue?.match(/var/gi)?.[0]) {
      brsValue = brsValue?.replaceAll(/\(|var|,.*|\)/gi, '')
      brsValue = themeVars[brsValue] !== '' ? themeVars[brsValue] : '0px'
    }
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }
  const [borderRadVal, borderRadUnit] = getBorderRadius()
  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'

    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
      drftStyle.fields[fieldKey].classes[wrpCLass]['justify-content'] = justifyContent
    }))
  }

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
    }))
  }

  const fldTypWiseAccentColorObjName = () => {
    let objName = ''
    let objPath = ''
    switch (fieldType) {
      case 'text':
        objName = 'field-accent-color'
        objPath = '--global-accent-color'
        break
      case 'check':
        objName = 'styles'
        objPath = [
          `fields->${fieldKey}->classes->.${fieldKey}-ci:checked ~ .${fieldKey}-cl .${fieldKey}-bx->border-color`,
          `fields->${fieldKey}->classes->.${fieldKey}-ci:checked ~ .${fieldKey}-cl .${fieldKey}-bx->background`,
        ]
        break
      default:
        break
    }
    return [objName, objPath]
  }
  console.log(styles.fields[fieldKey])
  const [objName, objPath] = fldTypWiseAccentColorObjName()
  console.log(fldTypWiseAccentColorObjName(), objPath)
  return (
    <>
      {fieldType !== 'title' && fieldType.match(/^((?!button).)*$/gi) && (
        <>
          <SimpleColorPicker
            title="Accent Color"
            subtitle="Accent Color"
            value={accentColor}
            stateObjName={objName}
            propertyPath={objPath}
            modalId="global-primary-clr"
            fldKey={fieldKey}
          // hslaPaths={{ h: '--gah', s: '--gas', l: '--gal', a: '--gaa' }}
          />
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Size</span>
            <select onChange={setSizes} className={css(sc.select)}>
              {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
            </select>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Theme</span>
            <ThemeControl fldKey={fieldKey} />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Border Radius</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                min={0}
                max={20}
                inputHandler={borderRadHandler}
                sizeHandler={({ unitKey, unitValue }) => borderRadHandler({ unit: unitKey, value: unitValue })}
                value={borderRadVal}
                unit={borderRadUnit}
                width="128px"
                options={['px', 'em', 'rem']}
              />
            </div>
          </div>
        </>
      )}
      {fieldType.match(/^(button)/gi) && (
        <>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Size</span>
            <select onChange={e => setBtnSize('btn', e.target.value)} className={css(sc.select)}>
              {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
            </select>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Border Radius</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                min={0}
                max={100}
                inputHandler={valueObj => setElementBrdrRadius('btn', `${valueObj.value}${valueObj.unit}`)}
                sizeHandler={({ unitKey, unitValue }) => setElementBrdrRadius('btn', `${unitValue}${unitKey}`)}
                value={getNumFromStr(btnBrdrRadiusValue)}
                unit={getStrFromStr(btnBrdrRadiusValue)}
                width="128px"
                options={['px', '%', 'em', 'rem']}
              />
            </div>
          </div>
        </>
      )}
      {fieldType === 'title' && (
        <>
          <div className={css(style.main)}>
            <span className={css(style.label)}>Label Alignment</span>
            <StyleSegmentControl
              show={['icn']}
              tipPlace="bottom"
              className={css(style.segment)}
              options={[
                { icn: <TxtAlignLeftIcn size="17" />, label: 'flex-start', tip: 'Left' },
                { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'flex-end', tip: 'Right' },
              ]}
              onChange={val => positionHandle(val, 'align-items')}
              activeValue={position}
            />
          </div>
          <div className={css(style.main)}>
            <span className={css(style.label)}>Flex Direction</span>
            <StyleSegmentControl
              show={['icn']}
              tipPlace="bottom"
              className={css(style.segment)}
              options={[
                { icn: <TxtAlignLeftIcn size="17" />, label: 'column', tip: 'Vertical' },
                { icn: <TxtAlignCntrIcn size="17" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'row', tip: 'Horizontal' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
              ]}
              onChange={val => flexDirectionHandle(val, 'flex-direction')}
              activeValue={flex}
            />
          </div>
        </>
      )}
    </>
  )
}

const style = {
  main: { flx: 'center-between' },
  label: {
    fw: 500,
    ml: 10,
    mt: 5,
  },
  segment: {
    mr: 7,
    mt: 4,
  },
}
const sizes = {
  'small-2': 'Small-2',
  'small-1': 'Small-1',
  medium: 'Medium',
  large: 'Large',
  'large-1': 'Large-1',
}

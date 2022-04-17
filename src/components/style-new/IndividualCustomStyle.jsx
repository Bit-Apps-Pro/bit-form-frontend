/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignJustifyIcn from '../../Icons/TxtAlignJustifyIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import sizeControlStyle from '../../styles/sizeControl.style'
import { assignNestedObj, deleteNestedObj } from '../../Utils/FormBuilderHelper'
import { ucFirst } from '../../Utils/Helpers'
import { staticFontStyleVariants, staticFontweightVariants, staticWhiteSpaceVariants, staticWordWrapVariants } from '../../Utils/StaticData/fontvariant'
import CustomInputControl from '../CompSettings/StyleCustomize/ChildComp/CustomInputControl'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import BackgroundControl from './BackgroundControl'
import BorderControl from './BorderControl'
import BorderImageControl from './BorderImageControl'
import CssPropertyList from './CssPropertyList'
import FilterColorPicker from './FilterColorPicker'
import FilterController from './FilterController'
import Important from './Important'
import IndividualShadowControl from './IndividualShadowControl'
import editorConfig from './NewStyleEditorConfig'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SizeControler from './SizeControler'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField, arrayToObject, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from './styleHelpers'
import StylePropertyBlock from './StylePropertyBlock'
import TextDecorationControl from './TextDecorationControl'
import TransformControl from './TransformControl'
import TransitionControl from './TransitionControl'

export default function IndividualCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const { css } = useFela()
  const [stateController, setStateController] = useState('')

  const getPseudoPath = (state = '') => {
    state = state.toLowerCase()
    switch (elementKey) {
      case 'currency-fld-wrp':
      case 'phone-fld-wrp':
        if (state === 'hover') {
          state = `hover:not(.${fldKey}-menu-open,.${fldKey}-disabled)`
        } else if (state === 'focus') {
          state = `focus-within:not(.${fldKey}-menu-open,.${fldKey}-disabled)`
        }
        break
      case 'search-clear-btn':
        if (state === 'focus') {
          state = 'focus-visible'
        }
        break
      case 'option':
        if (state === 'hover') {
          state = 'hover:not(.selected-opt)'
        }
        if (state === 'focus') {
          state = 'focus-visible'
        }
        break
      case 'input-clear-btn':
        if (state === 'hover') {
          state = 'hover'
        }
        if (state === 'focus') {
          state = 'focus-visible'
        }
        break
      case 'razorpay-btn':
        if (state === 'before') {
          state = ':before'
        }
        break

      default:
        return state
    }
    return state
  }

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('😅 no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj

  const existCssProps = Object.keys(classes?.[`.${fldKey}-${elementKey}${stateController && `:${getPseudoPath(stateController).toLowerCase()}`}`] || {})
  const existCssPropsObj = classes?.[`.${fldKey}-${elementKey}${stateController && `:${getPseudoPath(stateController).toLowerCase()}`}`] || {}
  const availableCssProp = addableCssPropsByField(fieldType, elementKey)?.filter(x => !existCssProps?.includes(x))
  const fontweightVariants = styles.font.fontWeightVariants.length !== 0 ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font.fontStyle.length !== 0 ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants

  const txtAlignValue = classes?.[`.${fldKey}-${elementKey}`]?.['text-align']
  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state && `:${state}`}->${cssProperty}`

  const existImportant = (path) => getValueByObjPath(styles, path).match(/(!important)/gi)?.[0]

  const getTitle = () => {
    switch (elementKey) {
      case 'fld-wrp': return 'Field Container'
      case 'lbl-wrp': return 'Label & Subtitle Container'
      case 'lbl': return 'Label Container'
      case 'lbl-pre-i': return 'Label Prefix Icon'
      case 'lbl-suf-i': return 'Label Suffix Icon'
      case 'sub-titl': return 'Subtitle Container'
      case 'sub-titl-pre-i': return 'Subtitle Prefix Icon'
      case 'sub-titl-suf-i': return 'Subtitle Suffix Icon'
      case 'fld': return 'Field Container'
      case 'pre-i': return 'Field Prefix Icon'
      case 'suf-i': return 'Field Suffix Icon'
      case 'hlp-txt': return 'Helper Text Container'
      case 'hlp-txt-pre-i': return 'Helper Text Prefix Icon'
      case 'hlp-txt-suf-i': return 'Helper Text Suffix Icon'
      case 'err-msg': return 'Error Messages Container'
      case 'currency-fld-wrp': return 'Currency Field Wrapper'
      default:
        break
    }
  }

  const fldTitle = getTitle()
  const getStyleValueAndUnit = (prop) => {
    const getVlu = classes[`.${fldKey}-${elementKey}`]?.[prop]
    const themeVal = getValueFromStateVar(themeVars, getVlu?.replace('!important', ''))
    const value = getNumFromStr(themeVal) || 0
    const unit = getStrFromStr(themeVal)
    return [value, unit]
  }

  const updateHandler = (value, unit, styleUnit, property) => {
    if (styleUnit?.match(/(undefined)/gi)?.[0]) styleUnit = styleUnit?.replaceAll(/(undefined)/gi, '')
    const convertvalue = unitConverter(unit, value, styleUnit)
    const propertyPath = getPropertyPath(property)

    setStyles(prvStyle => produce(prvStyle, drft => {
      const preValue = getValueByObjPath(drft, propertyPath)
      const isAlreadyImportant = preValue?.match(/(!important)/gi)?.[0]
      let v = `${convertvalue}${unit}`
      if (isAlreadyImportant) v = `${v} !important`
      assignNestedObj(drft, propertyPath, v)
    }))
  }

  const [fldOpctyValue, fldOpctyUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.opacity)), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.opacity))]
  const [widthValue, widthUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.width)), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.width))]
  const [maxWidthValue, maxWidthUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['max-width'])), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['max-width']))]
  const [minWidthValue, minWidthUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['min-width'])), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['min-width']))]
  const [heightValue, heightUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.height)), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.height))]
  const [maxHeightValue, maxHeightUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['max-height'])), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['max-height']))]
  const [minHeightValue, minHeightUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['min-height'])), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['min-height']))]
  const [fldZIndex] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['z-index']))]
  const [fldFSValue, fldFSUnit] = [getNumFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['font-size'])), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['font-size']))]
  const fldZIndexHandler = (value) => updateHandler(value, '', '', 'z-index')

  const addDynamicCssProps = (property, state = '') => {
    const configProperty = editorConfig[fieldType][elementKey].properties[property]
    if (typeof configProperty === 'object') {
      Object.keys(configProperty).map(prop => {
        if (configProperty[prop]) {
          const propPath = getPropertyPath(prop, state)
          setStyles(prvStyle => produce(prvStyle, drft => {
            assignNestedObj(drft, propPath, getValueByObjPath(styles, propPath))
          }))
        }
      })
    } else {
      const propPath = getPropertyPath(property, state)
      setStyles(prvStyle => produce(prvStyle, drft => {
        assignNestedObj(drft, propPath, getValueByObjPath(styles, propPath))
      }))
    }
  }

  const setNewCssProp = (property, state = '') => {
    state = getPseudoPath(state)
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath(property, state), '')
    }))
    addDynamicCssProps(property, state)
  }

  const setAlign = (alignValue) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['text-align'] = alignValue
    }))
  }

  const delPropertyHandler = (property, state = '') => {
    state = getPseudoPath(state)
    setStyles(prvStyle => produce(prvStyle, drft => {
      deleteNestedObj(drft, getPropertyPath(property, state))
    }))
    Object.keys(editorConfig[fieldType][elementKey].properties[property] || {})?.map(propName => {
      setStyles(prvStyle => produce(prvStyle, drft => {
        deleteNestedObj(drft, getPropertyPath(propName, state))
      }))
    })
  }
  const delMultiPropertyHandler = (propertyPaths, state = '') => {
    state = getPseudoPath(state)
    setStyles(prvStyle => produce(prvStyle, drft => {
      propertyPaths.map(propertyPath => {
        deleteNestedObj(drft, propertyPath, state)
      })
    }))
  }
  const clearHandler = (property, state = '') => {
    state = getPseudoPath(state)
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, deleteNestedObj(property, state), '')
    }))
  }

  const [fldLineHeightVal, fldLineHeightUnit] = getStyleValueAndUnit('line-height')
  const [wordSpacingVal, wordSpacingUnit] = getStyleValueAndUnit('word-spacing')
  const [letterSpacingVal, letterSpacingUnit] = getStyleValueAndUnit('letter-spacing')

  const spacingHandler = ({ value, unit }, prop, prvUnit, state = '') => {
    state = getPseudoPath(state)
    const convertvalue = unitConverter(unit, value, prvUnit)
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      let v = `${convertvalue}${unit}`
      const checkExistImportant = existImportant(getPropertyPath(prop, state))
      if (checkExistImportant) v += ' !important'
      assignNestedObj(drftStyle, getPropertyPath(prop, state), v)
    }))
  }

  const fontPropertyUpdateHandler = (property, val, state = '') => {
    state = getPseudoPath(state)
    setStyles(prvStyle => produce(prvStyle, drft => {
      let v = val
      const checkExistImportant = existImportant(getPropertyPath(property, state))
      if (checkExistImportant) v += ' !important'
      assignNestedObj(drft, getPropertyPath(property, state), v)
    }))
  }

  const options = [
    { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default Style' },
  ]
  const { states } = editorConfig[fieldType][elementKey]
  states?.map(state => {
    const stateLabel = state ? ucFirst(state) : 'Default'
    options.push({ label: stateLabel, icn: stateLabel, show: ['icn'], tip: `${stateLabel} Style` })
  })

  const setController = lblName => {
    if (lblName === 'Default') setStateController('')
    else setStateController(lblName)
  }

  const getCssPropertyMenu = (propName, state = '') => {
    state = getPseudoPath(state)
    const objPaths = {
      object: 'styles',
      paths: {},
    }

    const configProperty = editorConfig[fieldType][elementKey].properties[propName]
    let propertyKeys = [propName]
    if (typeof configProperty === 'object') {
      propertyKeys = Object.keys(configProperty)
      propertyKeys.map(prop => {
        objPaths.paths[prop] = getPropertyPath(prop, state)
      })
    } else {
      objPaths.paths[propName] = getPropertyPath(propName, state)
    }
    switch (propName) {
      case 'background':
        return (
          <BackgroundControl
            title="Background"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.['background-image']}
            modalId="field-container-background"
            stateObjName="styles"
            objectPaths={objPaths}
            deleteable
            delPropertyHandler={() => delPropertyHandler('background', state)}
            clearHandler={() => clearHandler('background', state)}
            allowImportant
          />
        )
      // case 'stroke':
      //   return (
      //     <BackgroundControl
      //       title="Stroke"
      //       subtitle={`${fldTitle}`}
      //       value={existCssPropsObj?.stroke}
      //       modalId="field-container-stroke"
      //       stateObjName="styles"
      //       objectPaths={objPaths}
      //       deleteable
      //       delPropertyHandler={() => delPropertyHandler('stroke', state)}
      //       clearHandler={() => clearHandler('stroke', state)}
      //       allowImportant
      //     />
      //   )
      case 'border-image':
        return (
          <BorderImageControl
            title="Border Image"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj['border-image']}
            modalId="field-border-image"
            stateObjName="styles"
            objectPaths={objPaths}
            deleteable
            delPropertyHandler={() => delPropertyHandler('border-image', state)}
            clearHandler={() => clearHandler('border-image', state)}
            allowImportant
          />
        )
      case 'background-color':
        return (
          <SimpleColorPicker
            title="Background Color"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.['background-color']}
            modalId="field-container-backgroung"
            stateObjName="styles"
            propertyPath={objPaths.paths?.['background-color']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('background-color', state)}
            clearHandler={() => clearHandler('background-color', state)}
            allowImportant
            canSetVariable
          />
        )
      case 'color':
        return (
          <SimpleColorPicker
            title="Text Color"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.color}
            modalId="field-container-color"
            stateObjName="styles"
            propertyPath={objPaths.paths?.color}
            deleteable
            delPropertyHandler={() => delPropertyHandler('color', state)}
            clearHandler={() => clearHandler('color', state)}
            allowImportant
            canSetVariable
          />
        )
      case 'border':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('border', state)}
            title="Border"
          >
            <ResetStyle
              propertyPath={[objPaths.paths?.[propertyKeys[0]], objPaths.paths?.['border-width'], objPaths.paths?.['border-radius']]}
              stateObjName="styles"
            />
            <BorderControl
              allowImportant
              subtitle={`${fldTitle}`}
              objectPaths={objPaths}
              id="fld-wrp-bdr"
            />
          </StylePropertyBlock>
        )
      case 'line-height':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('line-height', state)}
            title="Line Height"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['line-height']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              {fldLineHeightVal !== null
                && <Important className={css({ mr: 5 })} propertyPath={objPaths.paths?.['line-height']} />}
              <SizeControl
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'line-height', fldLineHeightUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'line-height', fldLineHeightUnit, state)}
                value={fldLineHeightVal || 0}
                unit={fldLineHeightUnit || 'px'}
                width="128px"
                options={['px', 'em', 'rem']}
                step={fldLineHeightUnit !== 'px' ? '0.1' : 1}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'word-spacing':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('word-spacing', state)}
            title="Word Spacing"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['word-spacing']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              {wordSpacingVal !== null
                && <Important className={css(ut.mr1)} propertyPath={objPaths.paths?.['word-spacing']} />}
              <SizeControl
                min={0.1}
                max={100}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'word-spacing', wordSpacingUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'word-spacing', wordSpacingUnit, state)}
                value={wordSpacingVal || 0}
                unit={wordSpacingUnit || 'px'}
                width="128px"
                options={['px', 'em', 'rem', '%']}
                step={wordSpacingUnit !== 'px' ? '0.1' : 1}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'letter-spacing':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('letter-spacing', state)}
            title="Letter-spacing"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['letter-spacing']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              {letterSpacingVal !== null
                && <Important className={css(ut.mr1)} propertyPath={objPaths.paths?.['letter-spacing']} />}
              <SizeControl
                min={0.1}
                max={100}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'letter-spacing', letterSpacingUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'letter-spacing', letterSpacingUnit, state)}
                value={letterSpacingVal || 0}
                unit={letterSpacingUnit || 'px'}
                width="128px"
                options={['px', 'em', 'rem', '']}
                step={letterSpacingUnit !== 'px' ? '0.1' : 1}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'margin':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('margin', state)}
            title="Margin"
          >
            <SpacingControl
              mainTitle="Margin Control"
              allowImportant
              action={{ type: 'spacing-control' }}
              subtitle={`${fldTitle}`}
              objectPaths={objPaths}
              id="margin-control"
            />
          </StylePropertyBlock>
        )
      case 'padding':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('padding', state)}
            title="Padding"
          >
            <SpacingControl
              mainTitle="Padding Control"
              allowImportant
              action={{ type: 'spacing-control' }}
              subtitle={`${fldTitle}`}
              objectPaths={objPaths}
              id="padding-control"
            />
          </StylePropertyBlock>
        )
      case 'size':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => {
              delPropertyHandler('width', state)
              delPropertyHandler('height', state)
              delPropertyHandler('size', state)
            }}
            title="Size"
          >
            <SizeControler
              action={{ type: 'size-control' }}
              subtitle={`${fldTitle} Size Control`}
              objectPaths={objPaths}
              id="size-control"
              width="128px"
            />
          </StylePropertyBlock>
        )
      case 'width':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('width', state)}
            title="Width"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.width}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {widthValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.width} />}
              <SizeControl
                width="128px"
                value={Number(widthValue)}
                unit={widthUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'width', widthUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'width', widthUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'max-width':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('max-width', state)}
            title="Max width"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['max-width']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {maxWidthValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.['max-width']} />}
              <SizeControl
                width="128px"
                value={Number(maxWidthValue)}
                unit={maxWidthUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'max-width', maxWidthUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'max-width', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'min-width':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('min-width', state)}
            title="Min width"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['min-width']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {minWidthValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.['min-width']} />}
              <SizeControl
                width="128px"
                value={Number(minWidthValue)}
                unit={minWidthUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'min-width', minWidthUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'min-width', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'height':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('height', state)}
            title="Height"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.height}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {heightValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.height} />}
              <SizeControl
                width="128px"
                value={Number(heightValue)}
                unit={heightUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'height', heightUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'height', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'max-height':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('max-height', state)}
            title="Max Height"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['max-height']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {maxHeightValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.['max-height']} />}
              <SizeControl
                width="128px"
                value={Number(maxHeightValue)}
                unit={maxHeightUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'max-height', maxHeightUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'max-height', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'min-height':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('min-height', state)}
            title="Min Height"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['min-height']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              {minHeightValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.['min-height']} />}
              <SizeControl
                width="128px"
                value={Number(minHeightValue)}
                unit={minHeightUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'min-height', minHeightUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'min-height', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'text-align':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('text-align', state)}
            title="Text Align"
          >
            <ResetStyle propertyPath={objPaths.paths?.['text-align']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <StyleSegmentControl
                className={css({ w: 130 })}
                show={['icn']}
                tipPlace="bottom"
                options={[
                  { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
                  { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
                  { icn: <TxtAlignJustifyIcn size="17" />, label: 'justify', tip: 'Justify' },
                  { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
                ]}
                onChange={e => setAlign(e)}
                activeValue={txtAlignValue}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'text-decoration':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => {
              delPropertyHandler('text-decoration', state)
              delMultiPropertyHandler(Object.values(objPaths.paths))
            }}
            title="Text Decoration"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.['text-decoration-line']}
              stateObjName="styles"
            />
            <TextDecorationControl
              subtitle={`${fldTitle}`}
              value={existCssPropsObj?.['text-decoration-line']}
              objectPaths={objPaths}
              id="fld-txt-dcrtn"
              allowImportant
            />
          </StylePropertyBlock>
        )
      case 'text-shadow':
        return (
          <IndividualShadowControl
            title="Text-shadow"
            subtitle={`${fldTitle} Text Shadow Control`}
            value={existCssPropsObj?.['text-shadow']}
            defaultValue="0px 1px 2px hsla(0, 0%, 0%, 35%)"
            modalId="field-container-text-shadow"
            stateObjName="styles"
            propertyPath={objPaths.paths?.['text-shadow']}
            propertyArray={['xOffset', 'yOffset', 'blur', 'color']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('text-shadow', state)}
            clearHandler={() => clearHandler('text-shadow', state)}
            allowImportant
            fldKey={fldKey}
          />
        )
      case 'box-shadow':
        return (
          <IndividualShadowControl
            title="Box-shadow"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.['box-shadow']}
            modalId="field-container-box-shadow"
            stateObjName="styles"
            propertyPath={objPaths.paths['box-shadow']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('box-shadow', state)}
            clearHandler={() => clearHandler('box-shadow', state)}
            allowImportant
            fldKey={fldKey}
          />
        )
      case 'transition':
        return (
          <TransitionControl
            title="Transition"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.transition}
            modalId="field-container-transition"
            stateObjName="styles"
            propertyPath={objPaths.paths.transition}
            deleteable
            delPropertyHandler={() => delPropertyHandler('transition', state)}
            clearHandler={() => clearHandler('transition', state)}
            allowImportant
          />
        )
      case 'filter':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('filter', state)}
            title="Filter"
          >
            <ResetStyle
              propertyPath={objPaths.paths?.filter}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              <FilterController
                action={{ type: 'filter-control' }}
                subtitle={`${fldTitle}`}
                objectPaths={objPaths}
                id="filter-control"
                allowImportant
              />
            </div>
          </StylePropertyBlock>
        )
      case 'font-size':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('font-size', state)}
            title="Font Size"
          >
            <ResetStyle propertyPath={objPaths.paths['font-size']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {fldFSValue && <Important className={css({ mr: 2 })} propertyPath={objPaths.paths['font-size']} />}
              <SizeControl
                className={css({ w: 130 })}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'font-size', fldFSUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'font-size', fldFSUnit, state)}
                value={fldFSValue || 12}
                unit={fldFSUnit || 'px'}
                width="128px"
                options={['px', 'em', 'rem']}
                step={fldFSUnit !== 'px' ? '0.1' : 1}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'font-weight':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('font-weight', state)}
            title="Font Weight"
          >
            <ResetStyle propertyPath={objPaths.paths['font-weight']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {existCssPropsObj?.['font-weight'] && <Important propertyPath={objPaths.paths['font-weight']} />}
              <SimpleDropdown
                options={fontweightVariants}
                value={String(existCssPropsObj?.['font-weight'])}
                onChange={val => fontPropertyUpdateHandler('font-weight', val)}
                w={130}
                h={30}
                cls={css((styles.font.fontType === 'Google' && existCssPropsObj['font-weight'] && !styles.font.fontWeightVariants.includes(Number(existCssPropsObj?.['font-weight']))) ? cls.warningBorder : '')}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'font-style':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('font-style', state)}
            title="Font Style"
          >
            <ResetStyle propertyPath={objPaths.paths['font-style']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {existCssPropsObj?.['font-style'] && <Important propertyPath={objPaths.paths['font-style']} />}
              <SimpleDropdown
                options={fontStyleVariants}
                value={String(existCssPropsObj?.['font-style'])}
                onChange={val => fontPropertyUpdateHandler('font-style', val)}
                w={130}
                h={30}
                cls={css((styles.font.fontType === 'Google' && existCssPropsObj['font-style'] && !styles.font.fontStyle.includes(existCssPropsObj?.['font-style'])) ? cls.warningBorder : '')}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'white-space':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('white-space', state)}
            title="White Space"
          >
            <ResetStyle propertyPath={objPaths.paths['white-space']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {existCssPropsObj?.['white-space'] && <Important propertyPath={objPaths.paths['white-space']} />}
              <SimpleDropdown
                options={staticWhiteSpaceVariants}
                value={String(existCssPropsObj?.['white-space'])}
                onChange={val => fontPropertyUpdateHandler('white-space', val)}
                w={130}
                h={30}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'word-wrap':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('word-wrap', state)}
            title="Word Wrap"
          >
            <ResetStyle propertyPath={objPaths.paths['word-wrap']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {existCssPropsObj?.['word-wrap'] && <Important propertyPath={objPaths.paths['word-wrap']} />}
              <SimpleDropdown
                options={staticWordWrapVariants}
                value={String(existCssPropsObj?.['word-wrap'])}
                onChange={val => fontPropertyUpdateHandler('word-wrap', val)}
                w={130}
                h={30}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'opacity':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('opacity', state)}
            title="Opacity"
          >
            <ResetStyle propertyPath={objPaths.paths.opacity} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {fldOpctyValue && <Important className={css(cls.mr2)} propertyPath={objPaths.paths.opacity} />}
              <SizeControl
                className={css({ w: 130 })}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'opacity', fldOpctyUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'opacity', fldOpctyUnit, state)}
                value={fldOpctyValue || 1}
                unit={fldOpctyUnit}
                min={0}
                max={fldOpctyUnit === '' ? 1 : 100}
                width="128px"
                options={['', '%']}
                step={fldOpctyUnit === '' ? 0.1 : 1}
              />
            </div>
          </StylePropertyBlock>
        )
      case 'z-index':
        return (
          <StylePropertyBlock
            delPropertyHandler={() => delPropertyHandler('z-index', state)}
            title="Z-Index"
          >
            <ResetStyle propertyPath={objPaths.paths['z-index']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              {fldZIndex && <Important propertyPath={objPaths.paths['z-index']} className={css({ mr: 2 })} />}
              <div className={`${css(sizeControlStyle.container)}`}>
                <CustomInputControl
                  className={css(sizeControlStyle.input)}
                  label=""
                  value={fldZIndex || 0}
                  min={0}
                  max={100}
                  step={1}
                  width="120px"
                  onChange={value => fldZIndexHandler(value)}
                />
              </div>
            </div>
          </StylePropertyBlock>
        )
      case 'transform':
        return (
          <TransformControl
            title="Transform"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.transform}
            modalId="field-container-transform"
            stateObjName="styles"
            propertyPath={objPaths.paths.transform}
            deleteable
            delPropertyHandler={() => delPropertyHandler('transform', state)}
            clearHandler={() => clearHandler('transform', state)}
            allowImportant
          />
        )
      case 'color(filter)':
        return (
          <FilterColorPicker
            title="Color"
            subtitle={`${fldTitle}`}
            value={existCssPropsObj?.['icon-color']}
            modalId="field-container-backgroung"
            stateObjName="styles"
            propertyPath={objPaths.paths?.['icon-color']}
            objectPaths={objPaths}
            deleteable
            delPropertyHandler={() => delMultiPropertyHandler([getPropertyPath('color(filter)', state), objPaths.paths['icon-color']], state)}
            clearHandler={() => clearHandler('icon-color', state)}
            allowImportant
          />
        )
      default:
        break
    }
  }
  return (
    <>
      <StyleSegmentControl
        square
        noShadow
        defaultActive="Default"
        options={options}
        size={60}
        component="button"
        onChange={lbl => setController(lbl)}
        show={['icn']}
        variant="lightgray"
        activeValue={stateController}
        width="100%"
        wideTab
      />
      <Grow open={stateController.toLowerCase() === ''}>
        <div className={css(cls.space)}>
          {
            existCssProps.map((propName, indx) => (
              <div key={`propName-${indx * 20}`}>
                {getCssPropertyMenu(propName)}
              </div>
            ))
          }
          {(availableCssProp.length > 0)
            && <CssPropertyList properties={availableCssProp} setProperty={(prop) => setNewCssProp(prop)} />}
        </div>
      </Grow>
      {
        states.map((state, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grow key={`grow-${i}`} open={stateController.toLowerCase() === state}>
            <div className={css(cls.space)}>
              {
                existCssProps.map((propName, indx) => (
                  <div key={`propName-${indx * 20}`}>
                    {getCssPropertyMenu(propName, state)}
                  </div>
                ))
              }
              {(availableCssProp.length > 0)
                && <CssPropertyList properties={availableCssProp} setProperty={(prop) => setNewCssProp(prop, state)} />}
            </div>
          </Grow>
        ))
      }
    </>
  )
}

const cls = {
  container: { ml: 12, mr: 15, pn: 'relative' },
  delBtn: {
    se: 20,
    flx: 'center',
    b: 'none',
    p: 0,
    mr: 1,
    tn: '.2s all',
    curp: 1,
    brs: '50%',
    tm: 'scale(0)',
    bd: 'none',
    cr: 'var(--red-100-61)',
    pn: 'absolute',
    lt: -15,
    ':hover': { bd: '#ffd0d0', cr: '#460000' },
  },
  containerHover: { '&:hover .delete-btn': { tm: 'scale(1)' } },
  space: { p: 5 },
  warningBorder: { b: '1px solid yellow' },
  mr2: { mr: 2 },
}

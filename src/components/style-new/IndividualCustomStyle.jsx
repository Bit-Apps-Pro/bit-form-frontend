/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TrashIcn from '../../Icons/TrashIcn'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignJustifyIcn from '../../Icons/TxtAlignJustifyIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import sizeControlStyle from '../../styles/sizeControl.style'
import { assignNestedObj, deleteNestedObj } from '../../Utils/FormBuilderHelper'
import { ucFirst } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { staticFontStyleVariants, staticFontweightVariants, staticWhiteSpaceVariants } from '../../Utils/StaticData/fontvariant'
import CustomInputControl from '../CompSettings/StyleCustomize/ChildComp/CustomInputControl'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import BackgroundControl from './BackgroundControl'
import BorderControl from './BorderControl'
import BorderImageControl from './BorderImageControl'
import CssPropertyList from './CssPropertyList'
import FilterControler from './FilterControler'
import Important from './Important'
import IndividualShadowControl from './IndividualShadowControl'
import editorConfig from './NewStyleEditorConfig'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SizeControler from './SizeControler'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField, arrayToObject, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from './styleHelpers'
import TextDecorationControl from './TextDecorationControl'
import TransformControl from './TransformControl'
import TransitionControl from './TransitionControl'

export default function IndividualCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const { css } = useFela()
  const [stateController, setStateController] = useState('')

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj

  console.log('styles=', styles)

  const existCssProps = Object.keys(classes?.[`.${fldKey}-${elementKey}${stateController && `:${stateController.toLowerCase()}`}`] || {})
  const existCssPropsObj = classes?.[`.${fldKey}-${elementKey}${stateController && `:${stateController.toLowerCase()}`}`] || {}
  const availableCssProp = addableCssPropsByField(fieldType, elementKey)?.filter(x => !existCssProps?.includes(x))

  const fontweightVariants = styles.font.fontWeightVariants.length !== 0 ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font.fontStyle.length !== 0 ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants

  const txtAlignValue = classes?.[`.${fldKey}-${elementKey}`]?.['text-align']
  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state && `:${state}`}->${cssProperty}`

  const existImportant = (path) => getValueByObjPath(styles, path).match(/(!important)/gi)?.[0]

  const getStyleValueAndUnit = (prop) => {
    const getVlu = classes[`.${fldKey}-${elementKey}`]?.[prop]
    const themeVal = getValueFromStateVar(themeVars, getVlu?.replace('!important', ''))
    const value = getNumFromStr(themeVal) || 0
    const unit = getStrFromStr(themeVal)
    return [value, unit]
  }

  const updateHandler = (value, unit, styleUnit, property) => {
    if (styleUnit?.match(/(undefined)/gi)?.[0]) styleUnit = styleUnit.replaceAll(/(undefined)/gi, '')
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

  const [fldOpctyValue, fldOpctyUnit] = [getNumFromStr(existCssPropsObj?.opacity), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.opacity))]
  const [widthValue, widthUnit] = [getNumFromStr(existCssPropsObj?.width), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.width))]
  const [heightValue, heightUnit] = [getNumFromStr(existCssPropsObj?.height), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.height))]
  const [fldZIndex] = [getNumFromStr(existCssPropsObj?.['z-index'])]
  const [fldFSValue, fldFSUnit] = [getNumFromStr(existCssPropsObj?.['font-size']), getStrFromStr(getValueFromStateVar(themeVars, existCssPropsObj?.['font-size']))]
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
    propertyPaths.map(propertyPath => {
      setStyles(prvStyle => produce(prvStyle, drft => {
        deleteNestedObj(drft, propertyPath, state)
      }))
    })
  }
  const clearHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, deleteNestedObj(property, state), '')
    }))
  }

  const [fldLineHeightVal, fldLineHeightUnit] = getStyleValueAndUnit('line-height')
  const [wordSpacingVal, wordSpacingUnit] = getStyleValueAndUnit('word-spacing')
  const [letterSpacingVal, letterSpacingUnit] = getStyleValueAndUnit('letter-spacing')

  const spacingHandler = ({ value, unit }, prop, prvUnit, state = '') => {
    console.log(value, unit, prop, prvUnit, state)
    const convertvalue = unitConverter(unit, value, prvUnit)
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      let v = `${convertvalue}${unit}`
      const checkExistImportant = existImportant(getPropertyPath(prop, state))
      if (checkExistImportant) v += ' !important'
      assignNestedObj(drftStyle, getPropertyPath(prop, state), v)
    }))
  }

  const fontPropertyUpdateHandler = (property, val, state = '') => {
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
            subtitle="Background Color/Image"
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
      case 'border-image':
        return (
          <BorderImageControl
            title="Border Image"
            subtitle="Border Gradient Color/Image"
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
            subtitle="Background Color"
            value={existCssPropsObj?.['background-color']}
            modalId="field-container-backgroung"
            stateObjName="styles"
            propertyPath={objPaths.paths?.['background-color']}
            deleteable
            delPropertyHandler={() => delPropertyHandler('background-color', state)}
            clearHandler={() => clearHandler('background-color', state)}
            allowImportant
          />
        )
      case 'color':
        return (
          <SimpleColorPicker
            title="Color"
            subtitle="Color"
            value={existCssPropsObj?.color}
            modalId="field-container-color"
            stateObjName="styles"
            propertyPath={objPaths.paths?.color}
            deleteable
            delPropertyHandler={() => delPropertyHandler('color', state)}
            clearHandler={() => clearHandler('color', state)}
            allowImportant
          />
        )
      case 'border':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('border', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Border', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={[objPaths.paths?.[propertyKeys[0]], objPaths.paths?.['border-color'], objPaths.paths?.['border-width'], objPaths.paths?.['border-radius']]}
              stateObjName="styles"
            />
            <BorderControl
              allowImportant
              subtitle="Field Container Border"
              value={`${existCssPropsObj?.[propertyKeys[0]]} ${existCssPropsObj?.['border-color']} ${existCssPropsObj?.['border-width']} ${existCssPropsObj?.['border-radius']}`}
              objectPaths={objPaths}
              id="fld-wrp-bdr"
            />
          </div>
        )
      case 'line-height':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('line-height', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Line-height', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.['line-height']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.['line-height']} />
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
          </div>
        )
      case 'word-spacing':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('word-spacing', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Word-spacing', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.['word-spacing']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              <Important className={css(ut.mr1)} propertyPath={objPaths.paths?.['word-spacing']} />
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
          </div>
        )
      case 'letter-spacing':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('letter-spacing', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Letter-spacing', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.['letter-spacing']}
              stateObjName="styles"
            />
            <div className={css(ut.flxc)}>
              <Important className={css(ut.mr1)} propertyPath={objPaths.paths?.['letter-spacing']} />
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
          </div>
        )
      case 'margin':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('margin', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Margin', 'bitform')}</span>
            </div>
            <div className={css(ut.flxc, { cg: 3 })}>
              <SpacingControl
                allowImportant
                action={{ type: 'spacing-control' }}
                subtitle="Margin control"
                objectPaths={objPaths}
                id="margin-control"
              />
            </div>
          </div>
        )
      case 'padding':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('padding', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Padding', 'bitform')}</span>
            </div>
            <SpacingControl
              allowImportant
              action={{ type: 'spacing-control' }}
              subtitle="Padding control"
              objectPaths={objPaths}
              id="padding-control"
            />
          </div>
        )
      case 'size':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => {
                  delPropertyHandler('width', state)
                  delPropertyHandler('height', state)
                  delPropertyHandler('size', state)
                }}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Size', 'bitform')}</span>
            </div>
            <div className={css(ut.flxc, { cg: 3 })}>
              <SizeControler
                action={{ type: 'size-control' }}
                subtitle="Size control"
                objectPaths={objPaths}
                id="size-control"
                width="128px"
              />
            </div>
          </div>
        )
      case 'width':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => { delPropertyHandler('width', state) }}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Width', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.width}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.width} />
              <SizeControl
                width="128px"
                value={Number(widthValue)}
                unit={widthUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'width', widthUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'width', widthUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </div>
        )
      case 'height':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => { delPropertyHandler('height', state) }}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Height', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.height}
              stateObjName="styles"
            />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important className={css(cls.mr2)} propertyPath={objPaths.paths?.height} />
              <SizeControl
                width="128px"
                value={Number(heightValue)}
                unit={heightUnit}
                inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'height', heightUnit, state)}
                sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'height', heightUnit, state)}
                options={['px', 'em', 'rem', '%']}
              />
            </div>
          </div>
        )
      case 'text-align':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('text-align', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Text align', 'bitform')}</span>
            </div>
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
          </div>
        )
      case 'text-decoration':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => {
                  delPropertyHandler('text-decoration', state)
                  delMultiPropertyHandler(Object.values(objPaths.paths))
                }}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Text Decoration', 'bitform')}</span>
            </div>
            <ResetStyle
              propertyPath={objPaths.paths?.['text-decoration-line']}
              stateObjName="styles"
            />
            <TextDecorationControl
              subtitle="text-decoration"
              value={existCssPropsObj?.['text-decoration-line']}
              objectPaths={objPaths}
              id="fld-txt-dcrtn"
            />
          </div>
        )
      case 'text-shadow':
        return (
          <IndividualShadowControl
            title="Text-shadow"
            subtitle="text-shadow"
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
            subtitle="Box-shadow"
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
            subtitle="Transition"
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
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('filter', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Filter', 'bitform')}</span>
            </div>
            <div className={css(ut.flxc, { cg: 3 })}>
              <FilterControler
                action={{ type: 'filter-control' }}
                subtitle="Filter control"
                objectPaths={objPaths}
                id="filter-control"
                elementKey={elementKey}
                fldKey={fldKey}
              />
            </div>
          </div>
        )
      case 'font-size':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('font-size', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Font size', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths['font-size']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important className={css({ mr: 2 })} propertyPath={objPaths.paths['font-size']} />
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
          </div>
        )
      case 'font-weight':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('font-weight', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Font weight', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths['font-weight']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important propertyPath={objPaths.paths['font-weight']} />
              <SimpleDropdown
                options={fontweightVariants}
                value={String(existCssPropsObj?.['font-weight'])}
                onChange={val => fontPropertyUpdateHandler('font-weight', val)}
                w={130}
                h={30}
                cls={css((styles.font.fontType === 'Google' && existCssPropsObj['font-weight'] && !styles.font.fontWeightVariants.includes(Number(existCssPropsObj?.['font-weight']))) ? cls.warningBorder : '')}
              />
            </div>
          </div>
        )
      case 'font-style':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('font-style', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Font Style', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths['font-style']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important propertyPath={objPaths.paths['font-style']} />
              <SimpleDropdown
                options={fontStyleVariants}
                value={String(existCssPropsObj?.['font-style'])}
                onChange={val => fontPropertyUpdateHandler('font-style', val)}
                w={130}
                h={30}
                cls={css((styles.font.fontType === 'Google' && existCssPropsObj['font-style'] && !styles.font.fontStyle.includes(existCssPropsObj?.['font-style'])) ? cls.warningBorder : '')}
              />
            </div>
          </div>
        )
      case 'white-space':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('white-space', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('White space', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths['white-space']} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important propertyPath={objPaths.paths['white-space']} />
              <SimpleDropdown
                options={staticWhiteSpaceVariants}
                value={String(existCssPropsObj?.['white-space'])}
                onChange={val => fontPropertyUpdateHandler('white-space', val)}
                w={130}
                h={30}
              />
            </div>
          </div>
        )
      case 'opacity':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('opacity', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Opacity', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths.opacity} stateObjName="styles" />
            <div className={css(ut.flxc, { cg: 3 })}>
              <Important className={css(cls.mr2)} propertyPath={objPaths.paths.opacity} />
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
          </div>
        )
      case 'z-index':
        return (
          <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
            <div className={css(ut.flxc, ut.ml1)}>
              <button
                title="Delete Property"
                onClick={() => delPropertyHandler('z-index', state)}
                className={`${css(cls.delBtn)} delete-btn`}
                type="button"
              >
                <TrashIcn size="14" />
              </button>
              <span className={css(ut.fw500)}>{__('Z-Index', 'bitform')}</span>
            </div>
            <ResetStyle propertyPath={objPaths.paths['z-index']} stateObjName="styles" />
            <Important propertyPath={objPaths.paths['z-index']} />
            <div className={css(ut.flxc, { cg: 3 })}>
              <div className={`${css(sizeControlStyle.container)}`}>
                <CustomInputControl
                  className={css(sizeControlStyle.input)}
                  label=""
                  value={fldZIndex || 0}
                  min={0}
                  max={100}
                  step={1}
                  width="130px"
                  onChange={value => fldZIndexHandler(value)}
                />
              </div>
            </div>
          </div>
        )
      case 'transform':
        return (
          <TransformControl
            title="Transform"
            subtitle="Transform"
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
            existCssProps.map(propName => getCssPropertyMenu(propName))
          }
          {(availableCssProp.length > 0) && <CssPropertyList properties={availableCssProp} setProperty={(prop) => setNewCssProp(prop)} />}
        </div>
      </Grow>
      {
        states.map((state, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grow key={`grow-${i}`} open={stateController.toLowerCase() === state}>
            <div className={css(cls.space)}>
              {
                existCssProps.map(propName => getCssPropertyMenu(propName, state))
              }
              {(availableCssProp.length > 0) && <CssPropertyList properties={availableCssProp} setProperty={(prop) => setNewCssProp(prop, state)} />}
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

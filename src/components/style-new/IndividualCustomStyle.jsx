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
import { __ } from '../../Utils/i18nwrap'
import { staticFontStyleVariants, staticFontweightVariants } from '../../Utils/StaticData/fontvariant'
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
import { addableCssPropsByField, arrayToObject, getNumFromStr, getStrFromStr, getValueByObjPath, unitConverter } from './styleHelpers'
import TextDecorationControl from './TextDecorationControl'
import TransitionControl from './TransitionControl'

export default function IndividualCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const { css } = useFela()
  const [controller, setController] = useState('Default')

  const options = [
    { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default Style' },
    { label: 'Hover', icn: 'Hover', show: ['icn'], tip: 'Hover Style' },
  ]

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj

  const fontweightVariants = styles.font.fontWeightVariants.length !== 0 ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font.fontStyle.length !== 0 ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants

  const txtAlignValue = classes?.[`.${fldKey}-${elementKey}`]?.['text-align']
  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->${cssProperty}`

  const existingProps = (state = '') => {
    const existingCssProperties = classes?.[`.${fldKey}-${elementKey}${state}`]
    const existingProperties = Object.keys(existingCssProperties || {})
    const addableCssProps = addableCssPropsByField(fieldType, elementKey)?.filter(x => !existingProperties?.includes(x))
    return [existingCssProperties, existingProperties, addableCssProps]
  }

  const [existingCssProperties, existingProperties, addableCssProps] = existingProps()
  const [existingCssHoverProperties, existingHoverProperties, addableCssHoverProps] = existingProps(':hover')

  const existImportant = (path) => getValueByObjPath(styles, path).match(/(!important)/gi)?.[0]

  const getValueFromThemeVar = (val) => {
    if (val && val.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }

  const getStyleValueAndUnit = (prop) => {
    const getVlu = classes[`.${fldKey}-${elementKey}`]?.[prop]
    const themeVal = getValueFromThemeVar(getVlu?.replace('!important', ''))
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
      if (isAlreadyImportant) {
        v = `${v} !important`
      }
      assignNestedObj(drft, propertyPath, v)
    }))
  }

  const [fldOpctyValue, fldOpctyUnit] = getStyleValueAndUnit('opacity')
  const [widthValue, widthUnit] = getStyleValueAndUnit('width')
  const [heightValue, heightUnit] = getStyleValueAndUnit('height')
  const [fldZIndex] = getStyleValueAndUnit('z-index')
  const [fldFSValue, fldFSUnit] = getStyleValueAndUnit('font-size')
  const fldZIndexHandler = (value) => updateHandler(value, '', '', 'z-index')

  const setNewCssProp = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath(property, state), '')
    }))

    addDynamicCssProps(property, state)
  }

  // new functio to add dynamic css props
  const addDynamicCssProps = (property, state) => {
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

  const setAlign = (alignValue) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['text-align'] = alignValue
    }))
  }

  const delPropertyHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      deleteNestedObj(drft, getPropertyPath(property, state))
    }))
    Object.keys(editorConfig[fieldType][elementKey].properties[property])?.map(propName => {
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

  const propertyObjPath = (property, state = '') => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: getPropertyPath('margin', state) },
        ...property === 'padding' && { padding: getPropertyPath('padding', state) },
      },
    }
  )

  // -- apply for temp test
  const borderPropObj = editorConfig[fieldType][elementKey].properties.border
  const fldBorderObjPath = {
    object: 'styles',
    borderObjName: 'styles',
    paths: {
      border: getPropertyPath('border'),
      borderWidth: getPropertyPath('border-width'),
      borderRadius: getPropertyPath('border-radius'),
    },
  }
  const borderPropKeys = Object.keys(borderPropObj)
  borderPropKeys.map(prop => {
    fldBorderObjPath.paths[prop] = getPropertyPath(prop)
  })

  const fldBorderHoverObjPath = {
    object: 'styles',
    borderObjName: 'styles',
    paths: {
      border: getPropertyPath('border', ':hover'),
      borderWidth: getPropertyPath('border-width', ':hover'),
      borderRadius: getPropertyPath('border-radius', ':hover'),
    },
  }
  borderPropKeys.map(prop => {
    fldBorderHoverObjPath.paths[prop] = getPropertyPath(prop, ':hover')
  })

  const fldTxtDcrtnObjPath = {
    object: 'styles',
    txtObjName: 'styles',
    paths: {
      textDecorationLine: getPropertyPath('text-decoration-line'),
      textDecorationStyle: getPropertyPath('text-decoration-style'),
      textDecorationColor: getPropertyPath('text-decoration-color'),
      textDecorationThickness: getPropertyPath('text-decoration-thickness'),
    },
  }

  const fldSizeObjPath = {
    object: 'styles',
    sizeObjName: 'styles',
    paths: {
      width: getPropertyPath('width'),
      height: getPropertyPath('height'),
    },
  }

  const filterObjPath = {
    object: 'styles',
    sizeObjName: 'styles',
    paths: { filter: getPropertyPath('filter') },
  }

  const fldBgObjPath = {
    object: 'styles',
    bgObjName: 'styles',
    paths: {
      'background-attachment': getPropertyPath('background-attachment'),
      'background-blend-mode': getPropertyPath('background-blend-mode'),
      'background-clip': getPropertyPath('background-clip'),
      'background-color': getPropertyPath('background-color'),
      'background-image': getPropertyPath('background-image'),
      'background-origin': getPropertyPath('background-origin'),
      'background-position': getPropertyPath('background-position'),
      'background-repeat': getPropertyPath('background-repeat'),
      'background-size': getPropertyPath('background-size'),
      'backdrop-filter': getPropertyPath('backdrop-filter'),
    },
  }

  const fldBrdrImgObjPath = {
    object: 'styles',
    bgObjName: 'styles',
    paths: {
      'border-image': getPropertyPath('border-image'),
      'border-image-slice': getPropertyPath('border-image-slice'),
      'border-image-width': getPropertyPath('border-image-width'),
      'border-image-outset': getPropertyPath('border-image-outset'),
      'border-image-repeat': getPropertyPath('border-image-repeat'),
    },
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
        activeValue={controller}
        width="100%"
        wideTab
      />
      <Grow open={controller === 'Default'}>
        <div className={css(cls.space)}>
          {
            existingProperties.includes('background') && (
              <BackgroundControl
                title="Background"
                subtitle="Background Color/Image"
                value={existingCssProperties?.background}
                modalId="field-container-background"
                stateObjName="styles"
                objectPaths={fldBgObjPath}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background')}
                clearHandler={() => clearHandler('background')}
                allowImportant
              />
            )
          }
          {
            existingProperties.includes('border-image') && (
              <BorderImageControl
                title="Border Image"
                subtitle="Border Gradient Color/Image"
                value={existingCssProperties['border-image']}
                modalId="field-border-image"
                stateObjName="styles"
                objectPaths={fldBrdrImgObjPath}
                deleteable
                delPropertyHandler={() => delPropertyHandler('border-image')}
                clearHandler={() => clearHandler('border-image')}
                allowImportant
              />
            )
          }
          {
            existingProperties.includes('background-color') && (
              <SimpleColorPicker
                title="Background Color"
                subtitle="Background Color"
                value={existingCssProperties?.['background-color']}
                modalId="field-container-backgroung"
                stateObjName="styles"
                propertyPath={getPropertyPath('background-color')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background-color')}
                clearHandler={() => clearHandler('background-color')}
                allowImportant
              />
            )
          }
          {
            existingProperties.includes('color') && (
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                value={existingCssProperties?.color}
                modalId="field-container-color"
                stateObjName="styles"
                propertyPath={getPropertyPath('color')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('color')}
                clearHandler={() => clearHandler('color')}
                allowImportant
              />
            )
          }
          {existingProperties.includes('border') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('border')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Border', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={[getPropertyPath('border'), getPropertyPath('border-width')]}
                stateObjName="styles"
              />
              <BorderControl
                allowImportant
                subtitle="Field Container Border"
                value={existingCssProperties?.border}
                objectPaths={fldBorderObjPath}
                id="fld-wrp-bdr"
              />
            </div>
          )}
          {existingProperties.includes('line-height') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('line-height')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Line-height', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={getPropertyPath('line-height')}
                stateObjName="styles"
              />
              <div className={css(ut.flxc)}>
                <Important className={css(cls.mr2)} propertyPath={getPropertyPath('line-height')} />
                <SizeControl
                  inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'line-height', fldLineHeightUnit)}
                  sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'line-height', fldLineHeightUnit)}
                  value={fldLineHeightVal || 0}
                  unit={fldLineHeightUnit || 'px'}
                  width="128px"
                  options={['px', 'em', 'rem']}
                  step={fldLineHeightUnit !== 'px' ? '0.1' : 1}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('word-spacing') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('word-spacing')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Word-spacing', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={getPropertyPath('word-spacing')}
                stateObjName="styles"
              />
              <div className={css(ut.flxc)}>
                <Important className={css(ut.mr1)} propertyPath={getPropertyPath('word-spacing')} />
                <SizeControl
                  min={0.1}
                  max={100}
                  inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'word-spacing', wordSpacingUnit)}
                  sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'word-spacing', wordSpacingUnit)}
                  value={wordSpacingVal || 0}
                  unit={wordSpacingUnit || 'px'}
                  width="128px"
                  options={['px', 'em', 'rem', '%']}
                  step={wordSpacingUnit !== 'px' ? '0.1' : 1}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('letter-spacing') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('letter-spacing')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Letter-spacing', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={getPropertyPath('letter-spacing')}
                stateObjName="styles"
              />
              <div className={css(ut.flxc)}>
                <Important className={css(ut.mr1)} propertyPath={getPropertyPath('letter-spacing')} />
                <SizeControl
                  min={0.1}
                  max={100}
                  inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'letter-spacing', letterSpacingUnit)}
                  sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'letter-spacing', letterSpacingUnit)}
                  value={letterSpacingVal || 0}
                  unit={letterSpacingUnit || 'px'}
                  width="128px"
                  options={['px', 'em', 'rem', '']}
                  step={letterSpacingUnit !== 'px' ? '0.1' : 1}
                />
              </div>
            </div>
          )}
          {
            existingProperties.includes('margin') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('margin')}
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
                    objectPaths={propertyObjPath('margin')}
                    id="margin-control"
                  />
                </div>
              </div>
            )
          }
          {
            existingProperties.includes('padding') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('padding')}
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
                  objectPaths={propertyObjPath('padding')}
                  id="padding-control"
                />
              </div>
            )
          }
          {
            existingProperties.includes('size') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => {
                      delPropertyHandler('width')
                      delPropertyHandler('height')
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
                    objectPaths={fldSizeObjPath}
                    id="size-control"
                    width="128px"
                  />
                </div>
              </div>
            )
          }
          {
            existingProperties.includes('width') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => { delPropertyHandler('width') }}
                    className={`${css(cls.delBtn)} delete-btn`}
                    type="button"
                  >
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Width', 'bitform')}</span>
                </div>
                <ResetStyle
                  propertyPath={getPropertyPath('width')}
                  stateObjName="styles"
                />
                <div className={css(ut.flxc, { cg: 3 })}>
                  <Important className={css(cls.mr2)} propertyPath={getPropertyPath('width')} />
                  <SizeControl
                    width="128px"
                    value={Number(widthValue)}
                    unit={widthUnit}
                    inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'width', widthUnit)}
                    sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'width', widthUnit)}
                    options={['px', 'em', 'rem', '%']}
                  />
                </div>
              </div>
            )
          }
          {
            existingProperties.includes('height') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => { delPropertyHandler('height') }}
                    className={`${css(cls.delBtn)} delete-btn`}
                    type="button"
                  >
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Height', 'bitform')}</span>
                </div>
                <ResetStyle
                  propertyPath={getPropertyPath('height')}
                  stateObjName="styles"
                />
                <div className={css(ut.flxc, { cg: 3 })}>
                  <Important className={css(cls.mr2)} propertyPath={getPropertyPath('height')} />
                  <SizeControl
                    width="128px"
                    value={Number(heightValue)}
                    unit={heightUnit}
                    inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'height', heightUnit)}
                    sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'height', heightUnit)}
                    options={['px', 'em', 'rem', '%']}
                  />
                </div>
              </div>
            )
          }
          {existingProperties.includes('text-align') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('text-align')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Text align', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('text-align')} stateObjName="styles" />

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
          )}

          {existingProperties.includes('text-decoration') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => {
                    delPropertyHandler('text-decoration')
                    delMultiPropertyHandler(Object.values(fldTxtDcrtnObjPath.paths))
                  }}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Text Decoration', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={getPropertyPath('text-decoration-line')}
                stateObjName="styles"
              />
              <TextDecorationControl
                subtitle="text-decoration"
                value={existingCssProperties?.['text-decoration-line']}
                objectPaths={fldTxtDcrtnObjPath}
                id="fld-txt-dcrtn"
              />
            </div>
          )}

          {existingProperties.includes('text-shadow') && (
            <IndividualShadowControl
              title="Text-shadow"
              subtitle="text-shadow"
              value={existingCssProperties?.['text-shadow']}
              defaultValue="0px 1px 2px hsla(0, 0%, 0%, 35%)"
              modalId="field-container-text-shadow"
              stateObjName="styles"
              propertyPath={getPropertyPath('text-shadow')}
              propertyArray={['xOffset', 'yOffset', 'blur', 'color']}
              deleteable
              delPropertyHandler={() => delPropertyHandler('text-shadow')}
              clearHandler={() => clearHandler('text-shadow')}
              allowImportant
              fldKey={fldKey}
            />
          )}

          {existingProperties.includes('box-shadow') && (
            <IndividualShadowControl
              title="Box-shadow"
              subtitle="Box-shadow"
              value={existingCssProperties?.['box-shadow']}
              modalId="field-container-box-shadow"
              stateObjName="styles"
              propertyPath={getPropertyPath('box-shadow')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('box-shadow')}
              clearHandler={() => clearHandler('box-shadow')}
              allowImportant
              fldKey={fldKey}
            />
          )}
          {existingProperties.includes('transition') && (
            <TransitionControl
              title="Transition"
              subtitle="Transition"
              value={existingCssProperties?.transition}
              modalId="field-container-transition"
              stateObjName="styles"
              propertyPath={getPropertyPath('transition')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('transition')}
              clearHandler={() => clearHandler('transition')}
              allowImportant
            />
          )}
          {
            existingProperties.includes('filter') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('filter')}
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
                    objectPaths={filterObjPath}
                    id="filter-control"
                    elementKey={elementKey}
                    fldKey={fldKey}
                  />
                </div>
              </div>
            )
          }

          {existingProperties.includes('font-size') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-size')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font size', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-size')} stateObjName="styles" />
              <div className={css(ut.flxc, { cg: 3 })}>
                <Important className={css({ mr: 2 })} propertyPath={getPropertyPath('font-size')} />
                <SizeControl
                  className={css({ w: 130 })}
                  inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'font-size', fldFSUnit)}
                  sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'font-size', fldFSUnit)}
                  value={fldFSValue || 12}
                  unit={fldFSUnit || 'px'}
                  width="128px"
                  options={['px', 'em', 'rem']}
                  step={fldFSUnit !== 'px' ? '0.1' : 1}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('font-weight') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-weight')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font weight', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-weight')} stateObjName="styles" />
              <div className={css(ut.flxc, { cg: 3 })}>
                <Important propertyPath={getPropertyPath('font-weight')} />
                <SimpleDropdown
                  options={fontweightVariants}
                  value={String(existingCssProperties?.['font-weight'])}
                  onChange={val => fontPropertyUpdateHandler('font-weight', val)}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingCssProperties['font-weight'] && !styles.font.fontWeightVariants.includes(Number(existingCssProperties?.['font-weight']))) ? cls.warningBorder : '')}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('font-style') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-style')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font Style', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-style')} stateObjName="styles" />
              <div className={css(ut.flxc, { cg: 3 })}>
                <Important propertyPath={getPropertyPath('font-style')} />
                <SimpleDropdown
                  options={fontStyleVariants}
                  value={String(existingCssProperties?.['font-style'])}
                  onChange={val => fontPropertyUpdateHandler('font-style', val)}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingCssProperties['font-style'] && !styles.font.fontStyle.includes(existingCssProperties?.['font-style'])) ? cls.warningBorder : '')}
                />
              </div>
            </div>
          )}
          {
            existingProperties.includes('opacity') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('opacity')}
                    className={`${css(cls.delBtn)} delete-btn`}
                    type="button"
                  >
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Opacity', 'bitform')}</span>
                </div>
                <ResetStyle propertyPath={getPropertyPath('opacity')} stateObjName="styles" />
                <div className={css(ut.flxc, { cg: 3 })}>
                  <Important className={css(cls.mr2)} propertyPath={getPropertyPath('opacity')} />
                  <SizeControl
                    className={css({ w: 130 })}
                    inputHandler={({ unit, value }) => spacingHandler({ unit, value }, 'opacity', fldOpctyUnit)}
                    sizeHandler={({ unitKey, unitValue }) => spacingHandler({ unit: unitKey, value: unitValue }, 'opacity', fldOpctyUnit)}
                    value={fldOpctyValue || 0}
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
          }

          {
            existingProperties.includes('z-index') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('z-index')}
                    className={`${css(cls.delBtn)} delete-btn`}
                    type="button"
                  >
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Z-Index', 'bitform')}</span>
                </div>
                <ResetStyle propertyPath={getPropertyPath('z-index')} stateObjName="styles" />
                <Important propertyPath={getPropertyPath('z-index')} />
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
          }
          <CssPropertyList properties={addableCssProps} setProperty={setNewCssProp} />
        </div>

      </Grow>
      <Grow open={controller === 'Hover'}>
        <div className={css(cls.space)}>
          {
            existingHoverProperties?.includes('background') && (
              <SimpleColorPicker
                title="Background"
                subtitle="Background Color"
                value={existingCssHoverProperties?.background}
                modalId="field-container-backgroung"
                stateObjName="styles"
                propertyPath={getPropertyPath('background', ':hover')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background', ':hover')}
                clearHandler={() => clearHandler('background', ':hover')}
                allowImportant
              />
            )
          }
          {
            existingHoverProperties?.includes('color') && (
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                value={existingCssHoverProperties?.color}
                modalId="field-container-color"
                stateObjName="styles"
                propertyPath={getPropertyPath('color', ':hover')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('color', ':hover')}
                clearHandler={() => clearHandler('color', ':hover')}
                allowImportant
              />
            )
          }
          {existingHoverProperties.includes('border') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('border', ':hover')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Border', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={[getPropertyPath('border', ':hover'), getPropertyPath('border-width', ':hover')]}
                stateObjName="styles"
              />
              <BorderControl
                allowImportant
                subtitle="Field Container Border"
                value={existingCssProperties?.border}
                objectPaths={fldBorderHoverObjPath}
                state=":hover"
                id="fld-wrp-bdr"
              />
            </div>
          )}
          {
            existingHoverProperties.includes('margin') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('margin', ':hover')}
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
                    objectPaths={propertyObjPath('margin', ':hover')}
                    id="margin-control"
                  />
                </div>
              </div>
            )
          }
          {
            existingHoverProperties.includes('padding') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('padding', ':hover')}
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
                  objectPaths={propertyObjPath('padding', ':hover')}
                  id="padding-control"
                />
              </div>
            )
          }
          {existingHoverProperties.includes('box-shadow') && (
            <IndividualShadowControl
              title="Box-shadow"
              subtitle="Box-shadow"
              value={existingCssHoverProperties?.['box-shadow']}
              modalId="field-container-box-shadow"
              stateObjName="styles"
              propertyPath={getPropertyPath('box-shadow')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('box-shadow', ':hover')}
              clearHandler={() => clearHandler('box-shadow', ':hover')}
              allowImportant
              fldKey={fldKey}
            />
          )}
          {existingHoverProperties.includes('font-weight') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-weight', ':hover')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font weight', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-weight')} stateObjName="styles" />
              <div className={css(ut.flxc, { cg: 3 })}>
                <SimpleDropdown
                  options={fontweightVariants}
                  value={String(existingCssHoverProperties?.['font-weight'])}
                  onChange={val => fontPropertyUpdateHandler('font-weight', val, ':hover')}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingCssHoverProperties['font-weight'] && !styles.font.fontWeightVariants.includes(Number(existingCssHoverProperties?.['font-weight']))) || cls.warningBorder)}
                />
              </div>
            </div>
          )}
          {existingHoverProperties.includes('font-style') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-style', ':hover')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font Style', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-style', ':hover')} stateObjName="styles" />

              <div className={css(ut.flxc, { cg: 3 })}>
                <SimpleDropdown
                  options={fontStyleVariants}
                  value={String(existingCssHoverProperties?.['font-style'])}
                  onChange={val => fontPropertyUpdateHandler('font-style', val, ':hover')}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingCssHoverProperties['font-style'] && !styles.font.fontStyle.includes(existingCssHoverProperties?.['font-style'])) || cls.warningBorder)}
                />
              </div>
            </div>
          )}
          <CssPropertyList
            properties={addableCssHoverProps}
            setProperty={(prop) => setNewCssProp(prop, ':hover')}
          />
        </div>
      </Grow>
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

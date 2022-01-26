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
import { assignNestedObj, deleteNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import BackgroundControl from './BackgroundControl'
import BorderControl from './BorderControl'
import CssPropertyList from './CssPropertyList'
import FilterControler from './FilterControler'
import IndividualShadowControl from './IndividualShadowControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SizeControler from './SizeControler'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField, getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
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

  const txtAlignValue = classes?.[`.${fldKey}-${elementKey}`]?.['text-align']
  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->${cssProperty}`

  const existingProps = (state = '') => {
    const existingCssProperties = classes?.[`.${fldKey}-${elementKey}${state}`]
    const existingProperties = Object.keys(existingCssProperties || {})
    const addableCssProps = addableCssPropsByField(fieldType)?.filter(x => !existingProperties?.includes(x))
    return [existingCssProperties, existingProperties, addableCssProps]
  }

  const [existingCssProperties, existingProperties, addableCssProps] = existingProps()
  const [existingCssHoverProperties, existingHoverProperties, addableCssHoverProps] = existingProps(':hover')

  const getValueFromThemeVar = (val) => {
    if (val && val.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }

  const getStyleValueAndUnit = (prop) => {
    const getVlu = classes[`.${fldKey}-${elementKey}`]?.[prop]
    const themeVal = getValueFromThemeVar(getVlu)
    const value = getNumFromStr(themeVal) || 0
    const unit = getStrFromStr(themeVal) || 'px'
    return [value, unit]
  }

  const updateHandler = (value, unit, styleUnit, property) => {
    if (styleUnit?.match(/(undefined)/gi)?.[0]) styleUnit = styleUnit.replaceAll(/(undefined)/gi, '')
    const convertvalue = unitConverter(unit, value, styleUnit)
    setStyles(prvStyle => produce(prvStyle, drft => {
      const v = `${convertvalue}${unit}`
      assignNestedObj(drft, getPropertyPath(property), v)
    }))
  }

  // for font size
  const [fldFSValue, fldFSUnit] = getStyleValueAndUnit('font-size')
  const fldFsSizeHandler = ({ value, unit }) => updateHandler(value, unit, fldFSUnit, 'font-size')
  const setNewCssProp = (property, state = '') => {
    const checkExistingCssProperties = state === '' ? existingCssProperties : existingCssHoverProperties
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (!checkExistingCssProperties) {
        assignNestedObj(drft, getPropertyPath(property, state), {})
      }
      assignNestedObj(drft, getPropertyPath(property, state), '')
    }))
  }

  // const fldLblfs = classes[`.${fldKey}-${elementKey}`]?.['font-size']
  // const fldLblfsvalue = getValueFromThemeVar(fldLblfs)
  // const fldFSValue = getNumFromStr(fldLblfsvalue)
  // const fldFSUnit = getStrFromStr(fldLblfsvalue)

  // const updateFontSize = (unit, value) => {
  //   setStyles(prvStyle => produce(prvStyle, drft => {
  //     drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['font-size'] = `${value}${unit}`
  //   }))
  // }
  const setAlign = (alignValue) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['text-align'] = alignValue
    }))
  }

  const delPropertyHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      deleteNestedObj(drft, getPropertyPath(property, state))
    }))
  }
  const clearHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, deleteNestedObj(property, state), '')
    }))
  }

  // const getValueFromThemeVar = (val) => {
  //   if (val?.match(/var/g)?.[0] === 'var') {
  //     const getVarProperty = val?.replaceAll(/\(|var|!important|,.*|\)/gi, '')
  //     return themeVars[getVarProperty]
  //   }
  //   return val
  // }

  const [fldLineHeightVal, fldLineHeightUnit] = getStyleValueAndUnit('line-height')
  const [wordSpacingVal, wordSpacingUnit] = getStyleValueAndUnit('word-spacing')

  // const lineHeightHandler = ({ value, unit }) => {
  //   const convertvalue = unit ? unitConverter(unit, value, fldLineHeightUnit) : value
  //   setStyles(prvStyle => produce(prvStyle, drftStyle => {
  //     assignNestedObj(drftStyle, getPropertyPath('line-height'), `${convertvalue}${unit}`)
  //   }))
  // }

  const lineHeightHandler = ({ value, unit }) => updateHandler(value, unit, fldLineHeightUnit, 'line-height')
  const wordSpacingHandler = ({ value, unit }) => {
    const convertvalue = unitConverter(unit, value, wordSpacingUnit)
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('word-spacing'), `${convertvalue}${unit}`)
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

  const fldBorderObjPath = {
    object: 'styles',
    borderObjName: 'styles',
    paths: {
      border: getPropertyPath('border'),
      borderWidth: getPropertyPath('border-width'),
      borderRadius: getPropertyPath('border-radius'),
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
              <SizeControl
                inputHandler={lineHeightHandler}
                sizeHandler={({ unitKey, unitValue }) => lineHeightHandler({ unit: unitKey, value: unitValue })}
                value={fldLineHeightVal || 0}
                unit={fldLineHeightUnit || 'px'}
                width="130px"
                options={['px', 'em', 'rem']}
                step={fldLineHeightUnit !== 'px' ? '0.1' : 1}
              />
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
              <SizeControl
                min={0.1}
                max={100}
                inputHandler={wordSpacingHandler}
                sizeHandler={({ unitKey, unitValue }) => wordSpacingHandler({ unit: unitKey, value: unitValue })}
                value={wordSpacingVal || 0}
                unit={wordSpacingUnit || 'px'}
                width="130px"
                options={['px', 'em', 'rem', '%']}
                step={wordSpacingUnit !== 'px' ? '0.1' : 1}
              />
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
                    width="130px"
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
                <SizeControl
                  className={css({ w: 130 })}
                  inputHandler={fldFsSizeHandler}
                  sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
                  value={fldFSValue || 0}
                  unit={fldFSUnit || 'px'}
                  width="130px"
                  options={['px', 'em', 'rem']}
                  step={fldFSUnit !== 'px' ? '0.1' : 1}
                />
              </div>
            </div>
          )}
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
                objectPaths={fldBorderObjPath}
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
          <CssPropertyList
            properties={addableCssHoverProps}
            setProperty={(prop) => setNewCssProp(prop, ':hover')}
          />
        </div>
      </Grow>
    </>
  )
}

const textAlignOptions = [
  { label: 'Center', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Justify', value: 'justify' },
]

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
}
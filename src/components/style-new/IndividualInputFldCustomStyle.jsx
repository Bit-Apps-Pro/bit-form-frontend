/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
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
import { staticFontStyleVariants, staticFontweightVariants } from '../../Utils/StaticData/fontvariant'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import BorderControl from './BorderControl'
import CssPropertyList from './CssPropertyList'
import IndividualShadowControl from './IndividualShadowControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField, arrayToObject, getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'
import TransitionControl from './TransitionControl'

export default function IndividualInputFldCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const [controller, setController] = useState('Default')
  const themeVars = useRecoilValue($themeVars)
  const fields = useRecoilValue($fields)

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj
  const selectedField = fields[fldKey]

  const fontweightVariants = styles.font.fontWeightVariants.length !== 0 ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font.fontStyle.length !== 0 ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants

  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->${cssProperty}`

  const existingProps = (state = '') => {
    const existingCssProperties = classes?.[`.${fldKey}-${elementKey}${state}`]
    const existingProperties = Object.keys(existingCssProperties || [])
    const addableCssProps = addableCssPropsByField(fieldType, elementKey)?.filter(x => !existingProperties?.includes(x))
    return [existingCssProperties, existingProperties, addableCssProps]
  }
  const txtAlignValue = classes?.[`.${fldKey}-${elementKey}`]?.['text-align']
  const [existingCssProperties, existingProperties, addableCssProps] = existingProps()
  const [existingCssHoverProperties, existingHoverProperties, addableCssHoverProps] = existingProps(':hover')
  const [existingCssFocusProperties, existingFocusProperties, addableCssFocusProps] = existingProps(':focus')

  const setNewCssProp = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (!existingCssProperties) {
        assignNestedObj(drft, getPropertyPath(property, state), {})
      }
      assignNestedObj(drft, getPropertyPath(property, state), '')
    }))
  }

  const getValueFromThemeVar = (val) => {
    if (val?.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val?.replaceAll(/\(|var|!important|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }

  const getStyleValueAndUnit = (prop) => {
    const getVlu = classes[`.${fldKey}-${elementKey}`]?.[prop]
    const themeVal = getValueFromThemeVar(getVlu)
    const value = getNumFromStr(themeVal)
    const unit = getStrFromStr(themeVal)
    return [value, unit]
  }

  const updateHandler = (value, unit, styleUnit, property) => {
    const convertvalue = unitConverter(unit, value, styleUnit)
    setStyles(prvStyle => produce(prvStyle, drft => {
      const v = `${convertvalue}${unit}`
      assignNestedObj(drft, getPropertyPath(property), v)
    }))
  }

  // for font size
  const [fldFSValue, fldFSUnit] = getStyleValueAndUnit('font-size')
  const fldFsSizeHandler = ({ value, unit }) => updateHandler(value, unit, fldFSUnit, 'font-size')

  const fontPropertyUpdateHandler = (property, val, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath(property, state), val)
    }))
  }

  // for height
  const [fldHightValue, fldHeightUnit] = getStyleValueAndUnit('height')
  const fldHightHandler = ({ value, unit }) => {
    const convertvalue = unitConverter(unit, value, fldHeightUnit)
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath('height'), `${convertvalue}${unit}`)
      const v = `${convertvalue + 10}${unit}!important`
      if (selectedField.prefixIcn) assignNestedObj(drft, getPropertyPath('padding-left'), v)
      if (selectedField.suffixIcn) assignNestedObj(drft, getPropertyPath('padding-right'), v)
    }))
  }

  const setAlign = (alignValue) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath('text-align'), alignValue)
    }))
  }

  const delPropertyHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      deleteNestedObj(drft, getPropertyPath(property, state))
    }))
  }

  const clearHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, getPropertyPath(property, state), '')
    }))
  }

  const propertyObjPath = (property, state = '') => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: getPropertyPath(property, state) },
        ...property === 'padding' && { padding: getPropertyPath(property, state) },
      },
    }
  )

  const borderStyleObj = (state = '') => ({
    object: 'styles',
    borderObjName: 'styles',
    paths: {
      border: getPropertyPath('border', state),
      borderWidth: getPropertyPath('border-width', state),
    },
  })

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
              <SimpleColorPicker
                title="Background"
                subtitle="Background Color"
                value={existingCssProperties?.background}
                modalId="field-container-backgroung"
                stateObjName="styles"
                propertyPath={getPropertyPath('background')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background')}
                clearHandler={() => clearHandler('background')}
                allowImportant
              />
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
                  inputHandler={fldFsSizeHandler}
                  sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
                  value={fldFSValue || 0}
                  unit={fldFSUnit || 'px'}
                  width="130px"
                  options={['px', 'em', 'rem']}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('height') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('height')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Height', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('height')} stateObjName="styles" />

              <div className={css(ut.flxc, { cg: 3 })}>
                <SizeControl
                  inputHandler={fldHightHandler}
                  sizeHandler={({ unitKey, unitValue }) => fldHightHandler({ unit: unitKey, value: unitValue })}
                  value={fldHightValue || 0}
                  unit={fldHeightUnit || 'px'}
                  width="130px"
                  options={['px', 'em', 'rem']}
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
                  onClick={() => delPropertyHandler('font-weight')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font Style', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-style')} stateObjName="styles" />

              <div className={css(ut.flxc, { cg: 3 })}>
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
                <span className={css(ut.fw500)}>{__('border', 'bitform')}</span>
              </div>
              <ResetStyle
                propertyPath={[getPropertyPath('border'), getPropertyPath('border-width')]}
                stateObjName="styles"
              />
              <div className={css(ut.flxc, { cg: 3 })}>
                <BorderControl
                  subtitle="Field Container Border"
                  value={existingCssProperties?.border}
                  objectPaths={borderStyleObj()}
                  id="fld-wrp-bdr"
                />
              </div>
            </div>
          )}
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
              propertyPath={getPropertyPath('box-shadow', ':hover')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('box-shadow', ':hover')}
              clearHandler={() => clearHandler('box-shadow', ':hover')}
              allowImportant
              fldKey={fldKey}
            />
          )}
          {existingHoverProperties.includes('border') && (
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={[getPropertyPath('border', ':hover'), getPropertyPath('border-width', ':hover')]}
                  stateObjName="styles"
                />
                <BorderControl
                  subtitle="Field Container Border"
                  value={existingCssHoverProperties?.border}
                  objectPaths={borderStyleObj(':hover')}
                  id="fld-wrp-bdr"
                />
              </div>
            </ThemeStylePropertyBlock>
          )}
          {existingHoverProperties.includes('transition') && (
            <TransitionControl
              title="Transition"
              subtitle="Transition"
              value={existingCssHoverProperties?.transition}
              modalId="field-container-transition"
              stateObjName="styles"
              propertyPath={getPropertyPath('transition', ':hover')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('transition', ':hover')}
              clearHandler={() => clearHandler('transition', ':hover')}
              allowImportant
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
      <Grow open={controller === 'Focus'}>
        <div className={css(cls.space)}>
          {
            existingFocusProperties?.includes('background') && (
              <SimpleColorPicker
                title="Background"
                subtitle="Background Color"
                value={existingCssFocusProperties?.background}
                modalId="field-container-backgroung"
                stateObjName="styles"
                propertyPath={getPropertyPath('background', ':focus')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background', ':focus')}
                clearHandler={() => clearHandler('background', ':focus')}
                allowImportant
              />
            )
          }
          {
            existingFocusProperties?.includes('background-color') && (
              <SimpleColorPicker
                title="Background"
                subtitle="Background Color"
                value={existingCssFocusProperties?.['background-color']}
                modalId="field-container-backgroung"
                stateObjName="styles"
                propertyPath={getPropertyPath('background-color', ':focus')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('background-color', ':focus')}
                clearHandler={() => clearHandler('background-color', ':focus')}
                allowImportant
              />
            )
          }

          {existingFocusProperties.includes('border') && (
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={[getPropertyPath('border', ':focus'), getPropertyPath('border-width', ':focus')]}
                  stateObjName="styles"
                />
                <BorderControl
                  subtitle="Field Container Border"
                  value={existingCssFocusProperties?.border}
                  objectPaths={borderStyleObj(':focus')}
                  id="fld-wrp-bdr"
                />
              </div>
            </ThemeStylePropertyBlock>
          )}
          {
            existingFocusProperties?.includes('color') && (
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                value={existingCssFocusProperties?.color}
                modalId="field-container-color"
                stateObjName="styles"
                propertyPath={getPropertyPath('color', ':focus')}
                deleteable
                delPropertyHandler={() => delPropertyHandler('color', ':focus')}
                clearHandler={() => clearHandler('color', ':focus')}
                allowImportant
              />
            )
          }
          {
            existingFocusProperties.includes('margin') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('margin', ':focus')}
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
                    objectPaths={propertyObjPath('margin', ':focus')}
                    id="margin-control"
                  />
                </div>
              </div>
            )
          }
          {
            existingFocusProperties.includes('padding') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button
                    title="Delete Property"
                    onClick={() => delPropertyHandler('padding', ':focus')}
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
                  objectPaths={propertyObjPath('padding', ':focus')}
                  id="padding-control"
                  width="130px"
                />
              </div>
            )
          }
          {existingFocusProperties.includes('box-shadow') && (
            <IndividualShadowControl
              title="Box-shadow"
              subtitle="Box-shadow"
              value={existingCssFocusProperties?.['box-shadow']}
              modalId="field-container-box-shadow"
              stateObjName="styles"
              propertyPath={getPropertyPath('box-shadow', ':focus')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('box-shadow', ':focus')}
              clearHandler={() => clearHandler('box-shadow', ':focus')}
              allowImportant
              fldKey={fldKey}
            />
          )}
          {existingFocusProperties.includes('transition') && (
            <TransitionControl
              title="Transition"
              subtitle="Transition"
              value={existingCssFocusProperties?.transition}
              modalId="field-container-transition"
              stateObjName="styles"
              propertyPath={getPropertyPath('transition', ':focus')}
              deleteable
              delPropertyHandler={() => delPropertyHandler('transition', ':focus')}
              clearHandler={() => clearHandler('transition', ':focus')}
              allowImportant
            />
          )}
          {existingFocusProperties.includes('font-weight') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-weight', ':focus')}
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
                  value={String(existingFocusProperties?.['font-weight'])}
                  onChange={val => fontPropertyUpdateHandler('font-weight', val, ':focus')}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingFocusProperties['font-weight'] && !styles.font.fontWeightVariants.includes(Number(existingFocusProperties?.['font-weight']))) || cls.warningBorder)}
                />
              </div>
            </div>
          )}
          {existingFocusProperties.includes('font-style') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button
                  title="Delete Property"
                  onClick={() => delPropertyHandler('font-style', ':focus')}
                  className={`${css(cls.delBtn)} delete-btn`}
                  type="button"
                >
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font Style', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-style', ':focus')} stateObjName="styles" />

              <div className={css(ut.flxc, { cg: 3 })}>
                <SimpleDropdown
                  options={fontStyleVariants}
                  value={String(existingFocusProperties?.['font-style'])}
                  onChange={val => fontPropertyUpdateHandler('font-style', val, ':focus')}
                  w={130}
                  h={30}
                  cls={css((styles.font.fontType === 'Google' && existingFocusProperties['font-style'] && !styles.font.fontStyle.includes(existingFocusProperties?.['font-style'])) || cls.warningBorder)}
                />
              </div>
            </div>
          )}
          <CssPropertyList
            properties={addableCssFocusProps}
            setProperty={(prop) => setNewCssProp(prop, ':focus')}
          />
        </div>
      </Grow>
    </>
  )
}

// const ucFirst = (val) => val.charAt(0).toUpperCase() + val.slice(1).replace(/-/gi, ' ')

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
}
const options = [
  { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default Style' },
  { label: 'Hover', icn: 'Hover', show: ['icn'], tip: 'Hover Style' },
  { label: 'Focus', icn: 'Focus', show: ['icn'], tip: 'focus Style' },
]

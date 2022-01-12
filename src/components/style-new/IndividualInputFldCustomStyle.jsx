/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import BorderControl from './BorderControl'
import CssPropertyList from './CssPropertyList'
import FontPicker from './FontPicker'
import IndividualShadowControl from './IndividualShadowControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField, getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'
import TransitionControl from './TransitionControl'

export default function IndividualInputFldCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const [controller, setController] = useState('Default')
  const themeVars = useRecoilValue($themeVars)

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj
  console.log(classes)

  const existingProps = (state = '') => {
    const existingCssProperties = classes?.[`.${fldKey}-${elementKey}${state}`]
    const existingProperties = Object.keys(existingCssProperties)
    const addableCssProps = addableCssPropsByField(fieldType)?.filter(x => !existingProperties?.includes(x))
    return [existingCssProperties, existingProperties, addableCssProps]
  }

  // const existingCssProperties = classes[`.${fldKey}-${elementKey}`]
  // const existingProperties = Object.keys(existingCssProperties)
  // const addableCssProps = addableCssPropsByField(fieldType)?.filter(x => !existingProperties?.includes(x))

  // const existingCssHoverProperties = classes?.[`.${fldKey}-${elementKey}:hover`]
  // const existingHoverProperties = Object.keys(existingCssHoverProperties || {})
  // const addableCssHoverProps = addableCssPropsByField(fieldType)?.filter(x => !existingHoverProperties?.includes(x))

  // const existingCssFocusProperties = classes?.[`.${fldKey}-${elementKey}:focus`]
  // const existingFocusProperties = Object.keys(existingCssFocusProperties || {})
  // const addableCssFocusProps = addableCssPropsByField(fieldType)?.filter(x => !existingFocusProperties?.includes(x))

  const [existingCssProperties, existingProperties, addableCssProps] = existingProps()
  const [existingCssHoverProperties, existingHoverProperties, addableCssHoverProps] = existingProps(':hover')
  const [existingCssFocusProperties, existingFocusProperties, addableCssFocusProps] = existingProps(':focus')

  const setNewCssProp = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (!existingCssProperties) {
        drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`] = {}
      }
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][property] = ''
    }))
  }
  const setNewCssHoverProp = (prop) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      if (!existingCssHoverProperties) {
        drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:hover`] = {}
      }
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:hover`][prop] = ''
    }))
  }
  const setNewCssFocusProp = (prop) => {
    setStyles(prvStyles => produce(prvStyles, drft => {
      if (!existingCssFocusProperties) {
        drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:focus`] = {}
      }
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:focus`][prop] = ''
    }))
  }

  const getValueFromThemeVar = (val) => {
    if (val?.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val?.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }

  // for font size
  const fldLblfs = classes[`.${fldKey}-${elementKey}`]?.['font-size']
  const fldLblfsvalue = getValueFromThemeVar(fldLblfs)
  const fldFSValue = getNumFromStr(fldLblfsvalue)
  const fldFSUnit = getStrFromStr(fldLblfsvalue)

  const updateHandler = (value, unit, styleUnit, proparty) => {
    const convertvalue = unitConverter(unit, value, styleUnit)
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][proparty] = `${convertvalue}${unit}`
    }))
  }

  const fldFsSizeHandler = ({ value, unit }) => updateHandler(value, unit, fldFSUnit, 'font-size')

  const fontWeigthHandler = (val) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['font-weight'] = val
    }))
  }

  // for height
  const fldHight = classes[`.${fldKey}-${elementKey}`]?.height
  const fldHightvalue = getValueFromThemeVar(fldHight)
  const fldHightValue = getNumFromStr(fldHightvalue)
  const fldHeightUnit = getStrFromStr(fldHightvalue)

  const fldHightHandler = ({ value, unit }) => updateHandler(value, unit, fldHeightUnit, 'height')

  const delPropertyHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      delete drft.fields[fldKey].classes[`.${fldKey}-${elementKey}${state}`][property]
    }))
  }

  const clearHandler = (property, state = '') => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}${state}`][property] = ''
    }))
  }

  const propertyObjPath = (property, state = '') => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->margin` },
        ...property === 'padding' && { padding: `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->padding` },
      },
    }
  )

  const getPropertyPath = (cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state}->${cssProperty}`

  const borderStyleObj = (state = '') => ({
    object: 'styles',
    borderObjName: 'styles',
    paths: { border: getPropertyPath('border', state), borderWidth: getPropertyPath('border-width', state) },
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
                <button title="Delete Property" onClick={() => delPropertyHandler('font-size')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  width="110px"
                  options={['px', 'em', 'rem']}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('height') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button title="Delete Property" onClick={() => delPropertyHandler('height')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  width="110px"
                  options={['px', 'em', 'rem']}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('font-weight') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button title="Delete Property" onClick={() => delPropertyHandler('font-weight')} className={`${css(cls.delBtn)} delete-btn`} type="button">
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font weight', 'bitform')}</span>
              </div>
              <ResetStyle propertyPath={getPropertyPath('font-weight')} stateObjName="styles" />

              <div className={css(ut.flxc, { cg: 3 })}>
                <SimpleDropdown
                  options={fontweightoptions}
                  value={existingCssProperties?.['font-weight']}
                  onChange={val => fontWeigthHandler(val)}
                  w={130}
                  h={30}
                />
              </div>
            </div>
          )}
          {existingProperties.includes('font-family') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button title="Delete Property" onClick={() => delPropertyHandler('font-family')} className={`${css(cls.delBtn)} delete-btn`} type="button">
                  <TrashIcn size="14" />
                </button>
                <span className={css(ut.fw500)}>{__('Font Family', 'bitform')}</span>
              </div>
              <div className={css(ut.flxc, { cg: 3 })}>
                <FontPicker id="global-font-fam" />
              </div>
            </div>
          )}
          {existingProperties.includes('border') && (
            <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
              <div className={css(ut.flxc, ut.ml1)}>
                <button title="Delete Property" onClick={() => delPropertyHandler('border')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('margin')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('padding')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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

          {/* {
        existingCssProperties.includes('font-size') && (
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Field Font Size</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={updateFontSize}
                sizeHandler={({ unitKey, unitValue }) => updateFontSize({ unit: unitKey, value: unitValue })}
                value={fldFSValue}
                unit={fldFSUnit}
                width="110px"
                options={['px', 'em', 'rem']}
                id="font-size-control"
              />
            </div>
          </div>
        )
      } */}
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('margin', ':hover')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('padding', ':hover')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
          <CssPropertyList properties={addableCssHoverProps} setProperty={setNewCssHoverProp} />
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('margin', ':focus')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
                  <button title="Delete Property" onClick={() => delPropertyHandler('padding', ':focus')} className={`${css(cls.delBtn)} delete-btn`} type="button">
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
          <CssPropertyList properties={addableCssFocusProps} setProperty={setNewCssFocusProp} />
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
}
const options = [
  { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default Style' },
  { label: 'Hover', icn: 'Hover', show: ['icn'], tip: 'Hover Style' },
  { label: 'Focus', icn: 'Focus', show: ['icn'], tip: 'Foucs Style' },
]

const fontweightoptions = [
  { label: 100, value: 100 },
  { label: 200, value: 200 },
  { label: 300, value: 300 },
  { label: 400, value: 400 },
  { label: 500, value: 500 },
  { label: 600, value: 600 },
  { label: 700, value: 700 },
  { label: 800, value: 800 },
  { label: 900, value: 900 },
  { label: 'Bold', value: 'bold' },
  { label: 'Normal', value: 'normal' },
  { label: 'Initial', value: 'initial' },
  { label: 'Inherit', value: 'inherit' },
]

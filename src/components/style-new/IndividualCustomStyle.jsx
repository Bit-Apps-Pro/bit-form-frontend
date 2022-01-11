/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import CssPropertyList from './CssPropertyList'
import IndividualShadowControl from './IndividualShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { addableCssPropsByField } from './styleHelpers'
import TransitionControl from './TransitionControl'

export default function IndividualCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const [controller, setController] = useState('Default')
  console.log(styles)

  const options = [
    { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default Style' },
    { label: 'Hover', icn: 'Hover', show: ['icn'], tip: 'Hover Style' },
  ]

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes, fieldType } = fldStyleObj

  const existingCssProperties = classes[`.${fldKey}-${elementKey}`]
  const existingProperties = Object.keys(existingCssProperties)
  const addableCssProps = addableCssPropsByField(fieldType)?.filter(x => !existingProperties?.includes(x))

  const existingCssHoverProperties = classes?.[`.${fldKey}-${elementKey}:hover`]
  const existingHoverProperties = Object.keys(existingCssHoverProperties || {})
  const addableCssHoverProps = addableCssPropsByField(fieldType)?.filter(x => !existingHoverProperties?.includes(x))

  const setNewCssProp = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
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

  // const getValueFromThemeVar = (val) => {
  //   if (val.match(/var/g)?.[0] === 'var') {
  //     const getVarProperty = val.replaceAll(/\(|var|,.*|\)/gi, '')
  //     return themeVars[getVarProperty]
  //   }
  //   return val
  // }

  // const fldLblfs = classes[`.${fldKey}-${elementKey}`]?.['font-size']
  // const fldLblfsvalue = getValueFromThemeVar(fldLblfs)
  // const fldFSValue = getNumFromStr(fldLblfsvalue)
  // const fldFSUnit = getStrFromStr(fldLblfsvalue)

  // const updateFontSize = (unit, value) => {
  //   setStyles(prvStyle => produce(prvStyle, drft => {
  //     drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`]['font-size'] = `${value}${unit}`
  //   }))
  // }

  const delPropertyHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      delete drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][property]
    }))
  }
  const clearHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][property] = ''
    }))
  }

  const delHoverPropertyHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      delete drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:hover`][property]
    }))
  }
  const clearHoverHandler = (property) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}:hover`][property] = ''
    }))
  }

  const propertyObjPath = (property) => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: `fields->${fldKey}->classes->.${fldKey}-${elementKey}->margin` },
        ...property === 'padding' && { padding: `fields->${fldKey}->classes->.${fldKey}-${elementKey}->padding` },
      },
    }
  )
  const hoverPropertyObjPath = (property) => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: `fields->${fldKey}->classes->.${fldKey}-${elementKey}:hover->margin` },
        ...property === 'padding' && { padding: `fields->${fldKey}->classes->.${fldKey}-${elementKey}:hover->padding` },
      },
    }
  )

  const getPropertyPath = (cssProperty) => `fields->${fldKey}->classes->.${fldKey}-${elementKey}->${cssProperty}`
  const getHoverPropertyPath = (cssProperty) => `fields->${fldKey}->classes->.${fldKey}-${elementKey}:hover->${cssProperty}`

  // const margin = spacingObj({ margin: existingProperties.includes('margin') })
  // const padding = spacingObj({ padding: existingProperties.includes('padding') })
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
                propertyPath={getHoverPropertyPath('background')}
                deleteable
                delPropertyHandler={() => delHoverPropertyHandler('background')}
                clearHandler={() => clearHoverHandler('background')}
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
                propertyPath={getHoverPropertyPath('color')}
                deleteable
                delPropertyHandler={() => delHoverPropertyHandler('color')}
                clearHandler={() => clearHoverHandler('color')}
                allowImportant
              />
            )
          }
          {
            existingHoverProperties.includes('margin') && (
              <div className={css(ut.flxcb, ut.mt2, cls.containerHover)}>
                <div className={css(ut.flxc, ut.ml1)}>
                  <button title="Delete Property" onClick={() => delHoverPropertyHandler('margin')} className={`${css(cls.delBtn)} delete-btn`} type="button">
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Margin', 'bitform')}</span>
                </div>
                <div className={css(ut.flxc, { cg: 3 })}>
                  <SpacingControl
                    allowImportant
                    action={{ type: 'spacing-control' }}
                    subtitle="Margin control"
                    objectPaths={hoverPropertyObjPath('margin')}
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
                  <button title="Delete Property" onClick={() => delHoverPropertyHandler('padding')} className={`${css(cls.delBtn)} delete-btn`} type="button">
                    <TrashIcn size="14" />
                  </button>
                  <span className={css(ut.fw500)}>{__('Padding', 'bitform')}</span>
                </div>
                <SpacingControl
                  allowImportant
                  action={{ type: 'spacing-control' }}
                  subtitle="Padding control"
                  objectPaths={hoverPropertyObjPath('padding')}
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
              delPropertyHandler={() => delHoverPropertyHandler('box-shadow')}
              clearHandler={() => clearHoverHandler('box-shadow')}
              allowImportant
              fldKey={fldKey}
            />
          )}
          <CssPropertyList properties={addableCssHoverProps} setProperty={setNewCssHoverProp} />
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

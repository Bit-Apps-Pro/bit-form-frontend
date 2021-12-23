/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'

export default function IndividualCustomStyle({ elementKey, fldKey }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()

  const fldStyleObj = styles?.fields?.[fldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { classes } = fldStyleObj

  const existingCssProperties = classes[`.${fldKey}-${elementKey}`]
  const existingProperties = Object.keys(existingCssProperties)

  const addPropertyHandler = ({ target: { value: property } }) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][property] = ''
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

  const propertyObjPath = (property) => (
    {
      object: 'styles',
      paths: {
        ...property === 'margin' && { margin: `fields->${fldKey}->classes->.${fldKey}-${elementKey}->margin` },
        ...property === 'padding' && { padding: `fields->${fldKey}->classes->.${fldKey}-${elementKey}->padding` },
      },
    }
  )

  const getPropertyPath = (cssProperty) => `fields->${fldKey}->classes->.${fldKey}-${elementKey}->${cssProperty}`

  // const margin = spacingObj({ margin: existingProperties.includes('margin') })
  // const padding = spacingObj({ padding: existingProperties.includes('padding') })
  return (
    <>
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
      <div className={css(cls.container)}>
        <select name="property" id="" onChange={addPropertyHandler}>
          <option>Select One</option>
          {
            allowCustomProperty.map((item, indx) => {
              if (existingProperties.includes(item)) return
              return <option key={`css-property-${indx * 1}`} value={item}>{ucFirst(item)}</option>
            })
          }
        </select>
      </div>
    </>
  )
}

const ucFirst = (val) => val.charAt(0).toUpperCase() + val.slice(1).replace(/-/gi, ' ')

const allowCustomProperty = [
  'background',
  'color',
  'font-size',
  'border',
  'margin',
  'padding',
  'shadow',
  'border-radius',
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
}

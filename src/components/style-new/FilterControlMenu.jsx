/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import CssPropertyList from './CssPropertyList'
import { getNumFromStr, getStrFromStr, getValueByObjPath } from './styleHelpers'

export default function FilterControlMenu({ title = 'Filters', elementKey, fldKey, objectPaths }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const { object, paths } = objectPaths

  const getDfltFilterObject = (filterName) => {
    let filterObject = {}
    switch (filterName) {
      case 'brightness':
      case 'grayscale':
      case 'contrast':
      case 'invert':
      case 'sepia':
        filterObject = {
          value: `${filterName}(100%)`,
          units: ['', '%'],
          minValue: 0,
          maxValue: 100,
        }
        break
      case 'blur':
        filterObject = {
          value: `${filterName}(2px)`,
          units: ['', 'px', 'em', 'rem'],
          minValue: 0,
          maxValue: 100,
        }
        break
      case 'drop-shadow':
        filterObject = {
          value: `${filterName}(8px 8px 10px #878787)`,
          units: ['px'],
          minValue: -200,
          maxValue: 200,
        }
        break
      case 'hue-rotate':
        filterObject = {
          value: `${filterName}(90deg)`,
          units: ['deg'],
          minValue: -360,
          maxValue: 360,
        }
        break
      case 'saturate':
      case 'opacity':
        filterObject = {
          value: `${filterName}(30%)`,
          units: ['', '%'],
          minValue: 0,
          maxValue: 100,
        }
        break
      default:
        filterObject = {
          value: 'none',
          units: [''],
          minValue: 0,
          maxValue: 0,
        }
    }
    return filterObject
  }

  let filterValues = getValueByObjPath(styles, paths?.filter)
  filterValues = filterValues?.replace('none', '')
  const filterNames = filterValues?.trim() ? filterValues?.trim()?.split(/\B\s+(?![^(]*\))/gi) : []
  const filtersObjects = filterNames?.map(filter => {
    const name = filter?.slice(0, filter?.indexOf('('))
    let value = filter?.slice(filter.indexOf('(') + 1, filter.indexOf(')'))?.trim()
    const unit = getStrFromStr(value) || ''
    if (value.indexOf(' ') < 0) value = getNumFromStr(value)
    const filterObject = getDfltFilterObject(name)
    let title = name.replace('-', ' ')
    title = title.replace(title.slice(0, 1), title.slice(0, 1).toUpperCase())
    return { title, name, value, unit, options: filterObject.units, min: filterObject.minValue, max: filterObject.maxValue }
  })

  const existFilterNames = filtersObjects.map(filter => filter.name)

  const setFilterValue = (filterName, { value, unit }, indexNo) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      let filterValue = getValueByObjPath(prvStyle, paths.filter)
      const startPos = filterValue.indexOf(filterName)
      const endPos = filterValue.indexOf(')', startPos) + 1
      if (!unit) unit = ''

      if (filterName === 'drop-shadow') {
        const values = filterValue.slice(filterValue.indexOf('(', startPos) + 1, endPos - 1).split(/\s(?![^(]*\))/gi)
        values[indexNo] = `${value}${unit}`
        filterValue = filterValue.replace(filterValue.slice(startPos, endPos), `${filterName}(${values.join(' ')})`)
      } else filterValue = filterValue.replace(filterValue.slice(startPos, endPos), `${filterName}(${value}${unit})`)
      assignNestedObj(drft, paths.filter, filterValue.trim())
    }))
  }

  const unitHandler = (filterName, unit, value, indexNo) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      let filterValue = getValueByObjPath(prvStyle, paths.filter)
      const startPos = filterValue.indexOf(filterName)
      const endPos = filterValue.indexOf(')', startPos) + 1
      if (!unit) unit = ''

      if (filterName === 'drop-shadow') {
        const values = filterValue.slice(filterValue.indexOf('(', startPos) + 1, endPos - 1).split(/\s(?![^(]*\))/gi)
        values[indexNo] = `${value}${unit}`
        filterValue = filterValue.replace(filterValue.slice(startPos, endPos), `${filterName}(${values.join(' ')})`)
      } else filterValue = filterValue.replace(filterValue.slice(startPos, endPos), `${filterName}(${value}${unit})`)
      assignNestedObj(drft, paths.filter, filterValue.trim())
    }))
  }
  const handleClearProperties = filterName => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      let value = getValueByObjPath(prvStyle, paths.filter)
      const startPos = value.indexOf(filterName)
      const endPos = value.indexOf(')', startPos) + 1
      value = value.replace(value.slice(startPos, endPos), '').trim()
      assignNestedObj(drftStyles, paths.filter, value)
    }))
  }

  const addFilterToCss = (filterName) => {
    // setStyles(prvStyle => produce(prvStyle, drft => {
    //   drft.fields[fldKey].classes[`.${fldKey}-${elementKey}`][property] = ''
    // }))
    const filterValue = getDfltFilterObject(filterName).value
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const prevValue = getValueByObjPath(prvStyle, paths.filter)
      if (filterValue === 'none') assignNestedObj(drftStyles, paths.filter, `${filterValue}`)
      else assignNestedObj(drftStyles, paths.filter, `${prevValue.replace('none', '')} ${filterValue}`.trim())
    }))
  }

  const filterProperties = {
    blur: {},
    brightness: {},
    contrast: {},
    'drop-shadow': {},
    grayscale: {},
    'hue-rotate': {},
    invert: {},
    opacity: {},
    saturate: {},
    sepia: {},
    none: {},
  }

  const availableFilterProps = Object.keys(filterProperties).filter(filterName => !existFilterNames?.includes(filterName))

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>{title}</span>
        <CssPropertyList properties={availableFilterProps} setProperty={addFilterToCss} classNames={css({ mt: '0px !important' })} />
      </div>
      {filtersObjects.map(filter => {
        if (filter.name === 'drop-shadow') {
          const valueArr = filter.value.split(/\s(?![^(]*\))/gi)
          return (
            <>
              <SimpleAccordion
                className={css(c.accordionHead)}
                open
                titleCls={css({ fw: 500 })}
                icnStrok={1}
                title="Drop Shadow"
                actionComponent={(
                  <button title="Clear Value" onClick={() => handleClearProperties(filter.name)} className={css(c.clearBtn)} type="button" aria-label="Clear Filter">
                    <CloseIcn size="12" />
                  </button>
                )}
              >
                <div className={css(ut.p1)}>
                  <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                    <span className={css(ut.fs12, ut.fw500)}>X</span>
                    <SizeControl
                      width="105px"
                      value={Number(getNumFromStr(valueArr[0]) || 0)}
                      unit={getStrFromStr(valueArr[0]) || 'px'}
                      inputHandler={valObj => setFilterValue('drop-shadow', valObj, 0)}
                      sizeHandler={({ unitKey, unitValue }) => unitHandler('drop-shadow', unitKey, unitValue, 0, valueArr[0])}
                      options={['px', 'mm', 'em', 'rem']}
                      min="-100"
                      max="100"
                    />
                  </div>
                  <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                    <span className={css(ut.fs12, ut.fw500)}>Y</span>
                    <SizeControl
                      width="105px"
                      value={Number(getNumFromStr(valueArr[1]) || 0)}
                      unit={getStrFromStr(valueArr[1]) || 'px'}
                      inputHandler={valObj => setFilterValue('drop-shadow', valObj, 1)}
                      sizeHandler={({ unitKey, unitValue }) => unitHandler('drop-shadow', unitKey, unitValue, 1, valueArr[1])}
                      options={['px', 'mm', 'em', 'rem']}
                      min="-100"
                      max="100"
                    />
                  </div>
                  <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                    <span className={css(ut.fs12, ut.fw500)}>Blur</span>
                    <SizeControl
                      width="105px"
                      value={Number(getNumFromStr(valueArr[2]) || 0)}
                      unit={getStrFromStr(valueArr[2]) || 'px'}
                      inputHandler={valObj => setFilterValue('drop-shadow', valObj, 2)}
                      sizeHandler={({ unitKey, unitValue }) => unitHandler('drop-shadow', unitKey, unitValue, 2, valueArr[2])}
                      options={['px', 'mm', 'em', 'rem']}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className={css(ut.flxcb, ut.mb2)}>
                    <span className={css(ut.fs12, ut.fw500)}>Color</span>
                    <input aria-label="Filter image" width="105px" type="color" className={css(c.input, c.colorInput)} onChange={e => setFilterValue('drop-shadow', { value: e.target.value }, 3)} value={valueArr[3]} />
                    {/* <SimpleColorPickerTooltip action={{ onChange: val => setFilterValue('drop-shadow', { value: val }, 3) }} value={valueArr[3]} /> */}
                  </div>
                </div>
              </SimpleAccordion>
              <div className={css(c.divider)} />
            </>
          )
        }

        return (
          <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
            <span className={css(ut.fs12, ut.fw500, { w: 85 })}>{filter.title}</span>
            <div className={css(ut.flxcb)}>
              <SizeControl
                width="80px"
                value={Number(filter.value)}
                unit={filter.unit}
                inputHandler={valObj => setFilterValue(filter.name, valObj)}
                sizeHandler={({ unitKey, unitValue }) => unitHandler(filter.name, unitKey, unitValue)}
                options={filter.options}
                min={filter.min}
                max={filter.max}
              />
              <button title="Clear Value" onClick={() => handleClearProperties(filter.name)} className={css(c.clearBtn)} type="button" aria-label="Clear Filter">
                <CloseIcn size="12" />
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

const c = {
  accordionHead: {
    w: 220,
    p: 3,
    fw: 500,
    brs: 8,
    fs: 12,
  },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 3 },
  clearBtn: {
    brs: '50%',
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  input: {
    h: '30px !important',
    fs: '12px !important',
    fw: 600,
    bd: '#f0f0f1 !important',
    brs: '10px !important',
    b: 'none !important',
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },
  colorInput: {
    w: 105,
    p: 0,
    brs: '8px !important',
    '-webkit-appearance': 'none',
    '::-webkit-color-swatch-wrapper': { p: 0 },
    '::-webkit-color-swatch': {
      b: '1px solid #afafaf',
      brs: '10px !important',
    },
    '::-moz-color-swatch': {
      b: '1px solid #afafaf',
      brs: '10px !important',
    },
    '::-moz-focus-inner': {
      b: '1px solid #afafaf',
      brs: '10px !important',
    },
  },
}

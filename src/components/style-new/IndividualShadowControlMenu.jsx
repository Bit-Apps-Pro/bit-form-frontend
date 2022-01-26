/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import CloseIcn from '../../Icons/CloseIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleColorPickerTooltip from './SimpleColorPickerTooltip'
import { getNumFromStr, getStrFromStr, getValueByObjPath, splitValueBySpaces, unitConverter } from './styleHelpers'

// TODO fix shadow value changing ,
// TODO check empty value
// TODO check all use cases  empty/null/undefined values
function IndividualShadowControlMenu({ propertyPath }) {
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  let importantAlreadyExist = ''

  const getShadowStyleVal = () => {
    let shadowValue = getValueByObjPath(styles, propertyPath)
    if (shadowValue?.match(/var/gi)?.[0] === 'var') {
      const themeVarShadow = shadowValue.replaceAll(/\(|var|,.*|\)/gi, '')
      shadowValue = themeVars[themeVarShadow]
    }
    if (shadowValue?.match(/(!important)/gi)) {
      importantAlreadyExist = '!important'
      shadowValue = shadowValue.replaceAll(/(!important)/gi, '')
    }
    return shadowValue
  }

  const splitMultipleShadows = (shadowString) => (shadowString && shadowString?.split(/,(?![^(]*\))/gi)) || []
  const arrOfShadowStr = splitMultipleShadows(getShadowStyleVal())

  const arrOfExtractedShadowObj = extractMultipleShadowValuesArr(arrOfShadowStr)

  console.log({ arrOfExtractedShadowObj })
  const newShadowVal = (name, val, unit) => {
    if (name === 'color') {
      return val || 'hsla(0, 0%, 0%, 100)'
    }
    if (name === 'inset') {
      return val || ''
    }
    return `${val || '0'}${unit === undefined ? 'px' : unit}`
  }
  const generateShadowValue = (name, { value, unit }, indx) => {
    const newShadowStyle = Object.entries(arrOfExtractedShadowObj[indx]).map(([shName, shVal]) => {
      if (shName === name) {
        return newShadowVal(name, value, unit)
      }
      return newShadowVal(shName, shVal, '')
    }).join(' ')
    arrOfShadowStr[indx] = newShadowStyle

    let shadowArrToStr = arrOfShadowStr.toString()

    if (importantAlreadyExist) {
      shadowArrToStr = `${shadowArrToStr} !important`
    }
    setStyles(prvStyles => produce(prvStyles, drftStyles => {
      assignNestedObj(drftStyles, propertyPath, shadowArrToStr)
    }))
  }

  const unitHandler = (name, unit, value, oldVal, indx) => {
    if (value) {
      const preUnit = getStrFromStr(oldVal)
      const convertedVal = unitConverter(unit, value, preUnit)
      generateShadowValue(name, { value: convertedVal, unit }, indx)
    }
  }
  const addShadowHandler = () => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldShadow = getShadowStyleVal()
      const newShadow = getOldShadow === undefined || getOldShadow === '' ? '0px 5px 15px 2px hsla(0, 0%, 0%, 35%)' : `${getOldShadow},0px 5px 15px 2px hsla(0, 0%, 0%, 35%)${importantAlreadyExist}`
      assignNestedObj(drftStyles, propertyPath, newShadow)
    }))
  }
  const deleteShadow = (indx) => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldShadow = getShadowStyleVal()
      const shadowArr = splitMultipleShadows(getOldShadow)
      if (shadowArr.length === 1) return
      shadowArr.splice(indx, 1)
      assignNestedObj(drftStyles, propertyPath, shadowArr.toString())
    }))
  }
  return (
    <div>
      {arrOfExtractedShadowObj.map((shadowObj, indx) => (
        <>
          <SimpleAccordion
            className={css(c.accordionHead)}
            title={__(`Shadow ${indx + 1}`, 'bitform')}
            open={indx === 0}
            actionComponent={(
              <button
                type="button"
                title="Remove"
                className={css(c.delBtn)}
                onClick={() => deleteShadow(indx)}
              >
                <TrashIcn size="14" />
              </button>
            )}
            key={`shadow-${indx * 2 * 4}`}
          >
            <div className={css(ut.p1)}>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>X</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowObj.xOffset) || 0)}
                  unit={getStrFromStr(shadowObj.xOffset) || 'px'}
                  inputHandler={valObj => generateShadowValue('xOffset', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, shadowObj.xOffset, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Y</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowObj.yOffset) || 0)}
                  unit={getStrFromStr(shadowObj.yOffset) || 'px'}
                  inputHandler={valObj => generateShadowValue('yOffset', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('yOffset', unitKey, unitValue, shadowObj.yOffset, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Blur</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowObj.blur) || 0)}
                  unit={getStrFromStr(shadowObj.blur) || 'px'}
                  inputHandler={valObj => generateShadowValue('blur', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('blur', unitKey, unitValue, shadowObj.blur, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Spread</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowObj.spread) || 0)}
                  unit={getStrFromStr(shadowObj.spread) || 'px'}
                  inputHandler={valObj => generateShadowValue('spread', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('spread', unitKey, unitValue, shadowObj.spread, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Color</span>
                <SimpleColorPickerTooltip action={{ onChange: val => generateShadowValue('color', { value: val }, indx) }} value={shadowObj.color} />
              </div>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Inset</span>
                <select className={css(sc.select)} value={shadowObj.inset || ''} onChange={e => generateShadowValue('inset', { value: e.target.value }, indx)}>
                  <option value="">outset</option>
                  <option value="inset">inset</option>
                </select>
              </div>
            </div>
          </SimpleAccordion>
          <div className={css(c.divider)} />
        </>
      ))}
      <div className={css(c.footer)}>
        <button
          className={css(c.addBtn)}
          type="button"
          aria-label="Add Shadow"
          onClick={addShadowHandler}
          title="Add Shadow"
        >
          <CloseIcn size="12" className={css({ tm: 'rotate(45deg)' })} />
        </button>
      </div>
    </div>
  )
}

export default memo(IndividualShadowControlMenu)

const extractMultipleShadowValuesArr = (arrOfShadowStr) => {
  const shadowArr = arrOfShadowStr.map(shdw => {
    if (!shdw) return { xOffset: '2px', yOffset: '2px', blur: '3px', spread: '0px', color: 'hsla(0, 44%, 35%, 66%)', inset: '' }
    const [xOffset, yOffset, blur, spread, color, inset] = splitValueBySpaces(shdw)
    return { xOffset, yOffset, blur, spread, color, inset }
  })
  return shadowArr
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
  delBtn: {
    se: 18,
    p: 1,
    curp: 1,
    bd: 'transparent',
    oe: 'none',
    b: 'none',
    brs: '50%',
    '&:hover': { bd: 'var(--white-0-86)' },
  },
  footer: { flx: 'center' },
  addBtn: {
    se: 25,
    b: 'none',
    brs: '50%',
    p: 0,
    flxi: 'center',
    bd: 'var(--white-0-95)',
    curp: 1,
    tn: 'transform 0.2s',
    ':hover': { tm: 'scale(1.1)', cr: 'var(--b-50)' },
    ':active': { tm: 'scale(0.95)' },
  },
}
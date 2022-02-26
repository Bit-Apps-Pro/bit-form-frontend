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
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { ucFirst } from '../../Utils/Helpers'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import CssPropertyList from './CssPropertyList'
import { getNumFromStr, getStrFromStr } from './styleHelpers'

function TransformControlMenu({ stateObjName, propertyPath }) {
  const title = 'Transform'
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  let checkImportant = ''
  const getTransformnStyleVal = () => {
    // let transformValue = getValueByObjPath(styles, propertyPath)
    let transformValue = 'perspective(500px) translateX(10px) rotateY(3deg)'

    if (transformValue?.match(/var/gi)?.[0] === 'var') {
      const themeVarTransition = transformValue?.replaceAll(/\(|var|,.*|\)/gi, '')
      transformValue = themeVars[themeVarTransition]
    }
    if (transformValue?.match(/(!important)/gi)?.[0]) {
      checkImportant = '!important'
      transformValue = transformValue?.replaceAll(/(!important)/gi, '')
    }
    return transformValue
  }
  const splitMultipleTransform = (transformString) => (transformString && transformString?.split(/(?!\(.*)\s(?![^(]*?\))/gi)) || []
  const arrOfTransformStr = splitMultipleTransform(getTransformnStyleVal())
  const arrOfExtractedTransformObj = extractTransformValuesArr(arrOfTransformStr)

  const newTransformVal = (name, val, unit) => {
    val = `${name}(${val}${unit})`
    return val
  }

  const generateTransformValue = (name, { value, unit }, indx) => {
    const newTransitionStyle = newTransformVal(name, value, unit)

    arrOfTransformStr[indx] = newTransitionStyle
    let tnArrToStr = arrOfTransformStr.join(' ')

    if (checkImportant) {
      tnArrToStr = `${tnArrToStr} !important`
    }
    setStyles(prvStyles => produce(prvStyles, drftStyles => {
      assignNestedObj(drftStyles, propertyPath, tnArrToStr)
    }))
  }

  const addTransitionHandler = () => {
    const getOldTransition = getTransformnStyleVal()
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const newTransition = getOldTransition === undefined || getOldTransition === '' ? `all 0.1s 0.1s ease${checkImportant}` : `${getOldTransition},all 0.1s 0.1s ease${checkImportant}`
      assignNestedObj(drftStyles, propertyPath, newTransition)
    }))
  }

  const deleteTransition = (indx) => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldTransition = getTransformnStyleVal()
      const transitionArr = splitMultipleTransform(getOldTransition)
      if (transitionArr.length === 1) return
      transitionArr.splice(indx, 1)
      assignNestedObj(drftStyles, propertyPath, transitionArr.toString())
    }))
  }

  const convartUnit = (vlu, unt, prvUnt) => {
    let newVal
    if (prvUnt === unt) newVal = vlu
    else if (prvUnt === 'ms' && unt === 's') newVal = vlu / 1000
    else if (prvUnt === 's' && unt === 'ms') newVal = vlu * 1000
    return newVal
  }

  const sizeHandler = (v, prop, indx, prvUnit) => {
    const { unitKey: unit, unitValue: val } = v
    const value = convartUnit(val, unit, prvUnit)
    generateTransformValue(prop, { value, unit }, indx)
  }

  const addFilterToCss = () => {
    console.log('working')
  }
  const getValue = (transObj, val) => (transObj?.name ? transformProps?.[transObj?.name][getStrFromStr(transObj.value)]?.[val] : '')
  return (
    <>
      <div className={css(ut.flxcb, ut.mb1)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>{title}</span>
        <CssPropertyList properties={Object.keys(transformProps)} setProperty={addFilterToCss} classNames={css({ mt: '0px !important' })} />
      </div>
      <div className={css(c.overflowXhidden)}>
        {arrOfExtractedTransformObj.map((transformObj, indx) => (
          <div className={css(ut.p1)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fs12, ut.fw500)}>{ucFirst(transformObj.name)}</span>
              <SizeControl
                width="128px"
                value={Number(getNumFromStr(transformObj.value) || 0)}
                unit={getStrFromStr(transformObj.value) || ''}
                inputHandler={valObj => generateTransformValue(transformObj.name, valObj, indx)}
                sizeHandler={(v) => sizeHandler(v, transformObj.name, indx, getStrFromStr(transformObj.value))}
                options={transformObj?.name ? transformProps?.[transformObj?.name]?.unit : ''}
                min={getValue(transformObj, 'min') || ''}
                max={getValue(transformObj, 'max') || ''}
                step={getValue(transformObj, 'step') || ''}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(TransformControlMenu)

const extractTransformValuesArr = (arrOfTransformStr) => {
  const transformArr = arrOfTransformStr.map(transform => {
    if (!transform) return { name: 'perspective', value: '10px' }
    const [prop, val] = transform.split(/\(|\)/gi)
    return { name: prop, value: val }
  })
  return transformArr
}

const rotate = {
  unit: ['deg', 'turn', 'rad'],
  deg: { min: 1, max: 360, step: 1 },
  turn: { min: 0.1, max: 10, step: 0.1 },
  rad: { min: '', max: '', step: 0.1 },
}
const translate = {
  unit: ['px', '%'],
  px: { min: 1, max: 100, step: 1 },
  '%': { min: 1, max: 200, step: 1 },
}
const scale = {
  unit: [''],
  '': { min: '', max: '', step: '' },
}
const skew = {
  unit: ['', 'deg', 'deg', 'turn'],
  '': { min: '', max: '', step: '' },
  deg: { min: 1, max: 360, step: 1 },
  turn: { min: 0.1, max: 10, step: 0.1 },
  rad: { min: '', max: '', step: 0.1 },
}

const transformProps = {
  perspective: {
    unit: ['px', 'rem', 'cm'],
    px: { min: 1, max: 1000, step: 1 },
    rem: { min: 0.1, max: 500, step: 0.1 },
    cm: { min: 1, max: 500, step: 1 },
  },
  rotateX: { ...rotate },
  rotateY: { ...rotate },
  rotateZ: { ...rotate },
  translateX: { ...translate },
  translateY: { ...translate },
  translateZ: { ...translate },
  scaleX: { ...scale },
  scaleY: { ...scale },
  scaleZ: { ...scale },
  skewX: { ...skew },
  skewY: { ...skew },
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
  footer: { flx: 'center', m: 5 },
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
  overflowXhidden: { owx: 'hidden' },
  input: {
    fs: 14,
    fw: 500,
    w: '100%',
    h: 35,
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    mt: 10,
    mb: 3,
    bs: 'none !important',
    brs: '8px !important',
    tn: 'box-shadow .3s',
    b: '1px solid #e6e6e6 !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 1px var(--b-50) !important', bcr: 'var(--b-50)!important' },
  },
}

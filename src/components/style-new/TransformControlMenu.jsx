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
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { ucFirst } from '../../Utils/Helpers'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import CssPropertyList from './CssPropertyList'
import { getNumFromStr, getStrFromStr, getValueByObjPath, unitConverter } from './styleHelpers'

function TransformControlMenu({ propertyPath }) {
  const title = 'Transform'
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  let checkImportant = ''
  const getTransformStyleVal = () => {
    let transformValue = getValueByObjPath(styles, propertyPath)

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
  const arrOfTransformStr = splitMultipleTransform(getTransformStyleVal())
  const arrOfExtractedTransformObj = extractTransformValuesArr(arrOfTransformStr)
  const transformNameArr = arrOfExtractedTransformObj.map(transformObj => transformObj.name)
  const availableTransformVal = Object.keys(transformProps).filter(itm => !transformNameArr.includes(itm))

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

  const addTransitionHandler = (name) => {
    const getOldTransform = getTransformStyleVal()
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const newTransition = () => {
        const val = getOldTransform === undefined || getOldTransform === ''
          ? newTransformVal(name, 0, transformProps[name].unit[0])
          : `${getOldTransform} ${newTransformVal(name, 0, transformProps[name].unit[0])}${checkImportant}`
        return val
      }
      assignNestedObj(drftStyles, propertyPath, newTransition())
    }))
  }

  const deleteTransform = (indx) => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldTransform = getTransformStyleVal()
      const transformArr = splitMultipleTransform(getOldTransform)
      if (transformArr.length === 1) return
      transformArr.splice(indx, 1)
      assignNestedObj(drftStyles, propertyPath, transformArr.join(' '))
    }))
  }

  const sizeHandler = (v, prop, indx, prvUnit) => {
    const { unitKey: unit, unitValue: val } = v
    const value = unitConverter(unit, val, prvUnit)
    generateTransformValue(prop, { value, unit }, indx)
  }

  const getValue = (transObj, val) => (transObj?.name ? transformProps?.[transObj?.name][getStrFromStr(transObj.value)]?.[val] : '')

  return (
    <>
      <div className={css(ut.flxcb, ut.mb1)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>{title}</span>
        <CssPropertyList properties={availableTransformVal} setProperty={addTransitionHandler} classNames={css({ mt: '0px !important' })} />
      </div>
      <div className={css(c.overflowXhidden)}>
        {arrOfExtractedTransformObj.map((transformObj, indx) => (
          <div key={`transformObj-${indx * 5}`} className={css(ut.p1, c.containerHover)}>
            <div className={css(ut.flxcb, ut.mt1)}>
              <span className={css(ut.flxcb, ut.fs12, ut.fw500)}>
                {arrOfExtractedTransformObj.length > 1 && (
                  <button onClick={() => deleteTransform(indx)} className={`${css(c.delBtn)} delete-btn`} type="button">
                    <TrashIcn />
                  </button>
                )}
                <span className={css({ ml: 15 })}>
                  {ucFirst(transformObj.name)}
                </span>
              </span>
              <SizeControl
                width="100px"
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
  unit: ['deg', 'rad', 'turn'],
  // '': { min: '', max: '', step: '' },
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
  containerHover: { '&:hover .delete-btn': { tm: 'scale(1.1)' } },
  accordionHead: {
    w: 220,
    p: 3,
    fw: 500,
    brs: 8,
    fs: 12,
  },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 3 },
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
    lt: 6,
    ':hover': { bd: '#ffd0d0', cr: '#460000' },
  },
}

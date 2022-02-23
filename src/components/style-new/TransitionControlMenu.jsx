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
import { getNumFromStr, getStrFromStr, getValueByObjPath, splitValueBySpaces } from './styleHelpers'

function TransitionControlMenu({ stateObjName, propertyPath }) {
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  let checkImportant = ''
  const getTransitionStyleVal = () => {
    let transitionValue = getValueByObjPath(styles, propertyPath)

    if (transitionValue.match(/var/gi)?.[0] === 'var') {
      const themeVarTransition = transitionValue?.replaceAll(/\(|var|,.*|\)/gi, '')
      transitionValue = themeVars[themeVarTransition]
    }
    if (transitionValue.match(/(!important)/gi)?.[0]) {
      checkImportant = '!important'
      transitionValue = transitionValue.replaceAll(/(!important)/gi, '')
    }
    return transitionValue
  }
  const splitMultipleTransition = (transitionString) => (transitionString && transitionString?.split(/,(?![^(]*\))/gi)) || []
  const arrOfTransitionStr = splitMultipleTransition(getTransitionStyleVal())
  const arrOfExtractedTransitionObj = extractMultipleTransitionValuesArr(arrOfTransitionStr)

  const newTransitionVal = (name, val, unit) => {
    if (name === 'duration' || name === 'delay') {
      return `${val || '0.1'}${unit === undefined ? 's' : unit}`
    }
    return `${val}`
  }
  const generateTransitionValue = (name, { value, unit }, indx) => {
    const newTransitionStyle = Object.entries(arrOfExtractedTransitionObj[indx]).map(([tnName, tnVal]) => {
      if (tnName === name) {
        return newTransitionVal(name, value, unit)
      }
      return newTransitionVal(tnName, tnVal, '')
    }).join(' ')

    arrOfTransitionStr[indx] = newTransitionStyle

    let tnArrToStr = arrOfTransitionStr.toString()

    if (checkImportant) {
      tnArrToStr = `${tnArrToStr} !important`
    }
    setStyles(prvStyles => produce(prvStyles, drftStyles => {
      assignNestedObj(drftStyles, propertyPath, tnArrToStr)
    }))
  }

  const addTransitionHandler = () => {
    const getOldTransition = getTransitionStyleVal()
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const newTransition = getOldTransition === undefined || getOldTransition === '' ? `all 0.1s 0.1s ease${checkImportant}` : `${getOldTransition},all 0.1s 0.1s ease${checkImportant}`
      assignNestedObj(drftStyles, propertyPath, newTransition)
    }))
  }
  const deleteTransition = (indx) => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldTransition = getTransitionStyleVal()
      const transitionArr = splitMultipleTransition(getOldTransition)
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
    generateTransitionValue(prop, { value, unit }, indx)
  }
  return (
    <div className={css(c.overflowXhidden)}>
      {arrOfExtractedTransitionObj.map((transitionObj, indx) => (
        <>
          <SimpleAccordion
            className={css(c.accordionHead)}
            title={__(`Transition ${indx + 1}`, 'bitform')}
            open={indx === 0}
            actionComponent={
              arrOfExtractedTransitionObj.length > 1
              && (
                <button
                  type="button"
                  title="Remove"
                  className={css(c.delBtn)}
                  onClick={() => deleteTransition(indx)}
                >
                  <TrashIcn size="14" />
                </button>
              )
            }
            key={`transition-${indx * 2 * 4}`}
          >
            <div className={css(ut.p1)}>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Property</span>
                <select className={css(sc.select)} value={transitionObj.property || ''} onChange={e => generateTransitionValue('property', { value: e.target.value }, indx)}>
                  <option value="all">all</option>
                  <option value="width">width</option>
                  <option value="background">background</option>
                  <option value="opacity">opacity</option>
                  <option value="box-shadow">box-shadow</option>
                  <option value="border-radius">border-radius</option>
                  <option value="text-shadow">text-shadow</option>
                  <option value="transform">transform</option>
                </select>
              </div>

              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Duration</span>
                <SizeControl
                  width="128px"
                  value={Number(getNumFromStr(transitionObj.duration) || 0)}
                  unit={getStrFromStr(transitionObj.duration) || 's'}
                  inputHandler={valObj => generateTransitionValue('duration', valObj, indx)}
                  sizeHandler={(v) => sizeHandler(v, 'duration', indx, getStrFromStr(transitionObj.duration))}
                  options={['s', 'ms']}
                  min={getStrFromStr(transitionObj.duration) === 's' ? 0.1 : 100}
                  max={getStrFromStr(transitionObj.duration) === 's' ? 10 : 10000}
                  step={getStrFromStr(transitionObj.duration) === 's' ? 0.1 : 100}
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Delay</span>
                <SizeControl
                  width="128px"
                  value={Number(getNumFromStr(transitionObj.delay) || 0)}
                  unit={getStrFromStr(transitionObj.delay) || 's'}
                  inputHandler={valObj => generateTransitionValue('delay', valObj, indx)}
                  sizeHandler={(v) => sizeHandler(v, 'delay', indx, getStrFromStr(transitionObj.delay))}
                  options={['s', 'ms']}
                  min={getStrFromStr(transitionObj.delay) === 's' ? 0.1 : 100}
                  max={getStrFromStr(transitionObj.delay) === 's' ? 10 : 10000}
                  step={getStrFromStr(transitionObj.delay) === 's' ? 0.1 : 100}
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Function</span>
                <div>
                  <select className={css(sc.select)} value={transitionObj.func || ''} onChange={e => generateTransitionValue('func', { value: e.target.value }, indx)}>
                    <option value="Custom">Custom</option>
                    {transitionFunc.map(itm => (<option value={itm}>{itm}</option>))}
                  </select>
                </div>
              </div>
              {!transitionFunc.includes(transitionObj.func) && (
                <input className={css(c.input)} type="text" aria-label="Custom transition" onChange={e => generateTransitionValue('func', { value: e.target.value }, indx)} value={transitionObj.func} />
              )}
            </div>
          </SimpleAccordion>
          <div className={css(c.divider)} />
        </>
      ))}

      <div className={css(c.footer)}>
        <button
          className={css(c.addBtn)}
          type="button"
          aria-label="Add Transition"
          onClick={addTransitionHandler}
          title="Add Transition"
        >
          <CloseIcn size="12" className={css({ tm: 'rotate(45deg)' })} />
        </button>
      </div>
    </div>
  )
}

export default memo(TransitionControlMenu)

const extractMultipleTransitionValuesArr = (arrOfTransitionStr) => {
  const transitionArr = arrOfTransitionStr.map(trnsition => {
    if (!trnsition) return { property: 'all', duration: '8.4s', delay: '7.6s', func: 'ease' }
    const [property, duration, delay, func] = splitValueBySpaces(trnsition)
    return { property, duration, delay, func }
  })
  return transitionArr
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

const transitionFunc = [
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'linear',
]

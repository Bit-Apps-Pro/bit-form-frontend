/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $builderHelperStates, $layouts, $updateBtn } from '../../../../GlobalStates'
import ut from '../../../../styles/2.utilities'
import FieldStyle from '../../../../styles/FieldStyle.style'
import SimpleAccordion from '../ChildComp/SimpleAccordion'

function SizeAndPosition({ fieldKey }) {
  const { css } = useFela()
  const [layouts, setLayouts] = useRecoilState($layouts)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const breakpoint = useRecoilValue($breakpoint)
  const fieldSize = layouts[breakpoint].find(fl => (fl.i === fieldKey))
  const setBuilderHelperStates = useSetRecoilState($builderHelperStates)

  const maxY = layouts[breakpoint].reduce((prv, curr) => prv.y > curr.y ? prv.y : curr.y)

  const maxValue = {
    lg: { w: 60, h: fieldSize.maxH || null, x: Math.abs(60 - fieldSize.w), y: maxY },
    md: { w: 40, h: fieldSize.maxH || null, x: Math.abs(40 - fieldSize.w), y: maxY },
    sm: { w: 20, h: fieldSize.maxH || null, x: Math.abs(20 - fieldSize.w), y: maxY },
  }

  console.log('fieldSize', fieldSize)
  console.log('max value', maxValue)

  const xHandler = (e) => {
    const val = e.target.valueAsNumber
    if (val < 0) return
    if (val > maxValue[breakpoint].x) return

    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].x = val
    }))

    setBuilderHelperStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn({ unsaved: true })
  }
  const wHandler = (e) => {
    const val = e.target.valueAsNumber
    if (val < 0) return
    if (val > maxValue[breakpoint].w) return

    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].w = val
    }))

    setBuilderHelperStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn({ unsaved: true })
  }
  const yHandler = (e) => {
    const val = e.target.valueAsNumber
    if (val < 0) return
    if (maxValue[breakpoint].y !== null && val > maxValue[breakpoint].y) return

    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].y = val
    }))

    setBuilderHelperStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn({ unsaved: true })
  }
  const hHandler = (e) => {
    const val = e.target.valueAsNumber
    if (val < 0) return
    if (maxValue[breakpoint].h !== null && val > maxValue[breakpoint].h) return

    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].h = val
    }))

    setBuilderHelperStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn({ unsaved: true })
  }
  return (
    <SimpleAccordion
      title="Sizes & Positions"
      className={css(FieldStyle.fieldSection)}
      open
    >
      <div className={css(s.fd)}>
        <label className={css(ut.w5, s.label)} htmlFor="x">
          <span className={css(s.name)}>X</span>
          <input aria-label="position x" placeholder="" min="0" max={maxValue[breakpoint].x} onChange={xHandler} value={fieldSize.x} className={css(ut.w8, s.input)} id="x" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="w">
          <span className={css(s.name)}>W</span>
          <input aria-label="position w" placeholder="" min="0" max={maxValue[breakpoint].w} onChange={wHandler} value={fieldSize.w} className={css(ut.w8, s.input)} id="w" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="y">
          <span className={css(s.name)}>Y</span>
          <input aria-label="position y" placeholder="" min="0" max={maxValue[breakpoint].y} onChange={yHandler} value={fieldSize.y} className={css(ut.w8, s.input)} id="y" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="h">
          <span className={css(s.name)}>H</span>
          <input aria-label="position h" placeholder="" min="0" max={maxValue[breakpoint].h} onChange={hHandler} value={fieldSize.h} className={css(ut.w8, s.input)} id="h" type="number" />
        </label>
      </div>
    </SimpleAccordion>
  )
}

export default SizeAndPosition
const s = {
  fd: {
    flx: 'center',
    flxp: 1,
    m: 10,
  },
  label: { pn: 'relative' },
  name: {
    pn: 'absolute',
    tp: 8,
    lt: 10,
    fw: 500,
  },
  input: {
    pl: '30px !important',
    ta: 'center',
    oe: 'none !important',
    b: 'none !important',
    bd: 'none !important',
    tn: 'background o.2s',
    brs: '8px !important',
    '&:hover': { bd: 'var(--white-0-81-32)' },
    '&:focus': { focusShadow: 1 },
  },
}

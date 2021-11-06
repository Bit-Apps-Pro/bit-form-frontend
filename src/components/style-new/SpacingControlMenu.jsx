import { useState } from 'react'
import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import BoxSizeControl from '../CompSettings/StyleCustomize/ChildComp/BoxSizeControl'
import LabelSpaceControl from '../CompSettings/StyleCustomize/ChildComp/LabelSpaceControl'

export default function SpacingControlMenu() {
  const { css } = useFela()
  const [marginFull, setMarginFull] = useState(false)
  const [paddingFull, setPaddingFull] = useState(false)
  const [spacing, setSpacing] = useState('10px 30px')

  const handlerMargin = (value) => {
    if (value === 'F') setMarginFull(true)
    else setMarginFull(false)
  }
  const handlerPadding = value => {
    if (value === 'F') setPaddingFull(true)
    else setPaddingFull(false)
  }

  const onChangeHandler = v => {
    console.log(' spacing', v)
    setSpacing(v)
  }

  return (
    <>
      <div>
        {/* <div className={css(s.title)}>
          <span>Margin</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            options={[
              { icn: <BorderRadiusIcn size="17" />, label: 'FX', tip: 'All side' },
              { icn: 'F', label: 'F', tip: 'Full' },
            ]}
            onChange={handlerMargin}
          />
        </div> */}
        {/* <BoxSizeControl value="10px 30px 30px 11rem" unit={'px'} /> */}
        <LabelSpaceControl value={spacing} onChange={val => onChangeHandler(val)} unitOption={['px', 'em', 'rem']} />
        {/* <div className={css(s.fd)}>
          {!marginFull ? (
            <>
              <label className={css(s.label)} htmlFor="margin_left">
                <span className={css(s.name)}>L</span>
                <input aria-label="margin left" placeholder="" min="0" className={css(ut.w8, s.input)} id="margin_left" type="number" />
                <select className={css(s.select)}>
                  <option value="px">px</option>
                  <option value="em">em</option>
                  <option value="rem">rem</option>
                </select>
              </label>
              <label className={css(s.label)} htmlFor="margin_right">
                <span className={css(s.name)}>R</span>
                <input aria-label="margin right" placeholder="" min="0" className={css(ut.w8, s.input)} id="margin_right" type="number" />
              </label>
              <label className={css(s.label)} htmlFor="margin_top">
                <span className={css(s.name)}>T</span>
                <input aria-label="margin top" placeholder="" min="0" className={css(ut.w8, s.input)} id="margin_top" type="number" />
              </label>
              <label className={css(s.label)} htmlFor="margin_bottom">
                <span className={css(s.name)}>B</span>
                <input aria-label="margin bottom" placeholder="" min="0" className={css(ut.w8, s.input)} id="margin_bottom" type="number" />
              </label>
            </>
          ) : (
            <label className={css(s.label)} htmlFor="margin_bottom">
              <span className={css(s.name)}>B</span>
              <input aria-label="margin bottom" placeholder="" min="0" className={css(ut.w8, s.input)} id="margin_bottom" type="number" />
            </label>
          )}
        </div> */}
      </div>

    </>

  )
}

const s = {
  title: { flx: 'center-between' },
  fd: {
    flx: 'center-between',
    flxp: 1,
    my: 10,
  },
  label: {
    w: '48%',
    pn: 'relative',
    flx: 'center-between',
    bd: 'var(--white-0-97)',
    mx: 2,
    my: 5,
    brs: 4,
  },
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
    '&:focus': { bs: 'none !important', oe: 'none' },
  },
  select: {
    bi: 'none !important',
    all: 'unset',
    'border-top-left-radius': '0 !important',
    'border-bottom-left-radius': '0 !important',
    bl: '1px solid var(--white-0-75)',
    p: '0px !important',
    pr: '3px !important',
    pl: '3px !important',
    bc: 'var(--white-0-95) !important',
    lh: '1 !important',
    mnh: '18px !important',
    h: 18,

    '&:focus': { bs: 'none !important' },
  },
}

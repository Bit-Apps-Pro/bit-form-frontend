import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { __ } from '../../Utils/i18nwrap'
import { lowerCaseAllAndReplaceSpaceToHipen } from '../style-new/styleHelpers'
import Tip from './Tip'

export default function StyleSegmentControl({ defaultActive,
  className,
  options,
  size = 100,
  onChange,
  show,
  width,
  tipPlace = 'top',
  borderRadius = 8,
  activeShow,
  noShadow,
  defaultItmWidth,
  wideTab }) {
  const { css } = useFela()
  const baseSize = Number(size)
  const floor = (number) => (Math.floor(baseSize / number))

  const style = {
    wrapper: {
      ta: 'center',
      ...width && { w: width },
      // mx: 'auto',
    },
    tabs: {
      fs: 14,
      // bd: 'blue',
      bd: 'var(--white-0-95)',
      py: 3,
      flx: 'center',
      px: 3,
      ls: 'none',
      // dy: 'inline-block',
      brs: borderRadius,
      pn: 'relative',
      '& .active': { cr: 'var(--b-50) !important' },
      '& button': {
        bd: 'none',
        oe: 'none',
        b: 'none',
      },
    },
    selector: {
      w: 0,
      h: '80%',
      dy: 'inline-block',
      pn: 'absolute',
      lt: 5,
      tp: '50%',
      tm: 'translatey(-50%)',
      zx: 1,
      brs: borderRadius - 2,
      tdn: '0.3s',
      ttf: 'cubic-bezier(0.42, 0.44, 0.57, 1.35)',
      willChange: 'transform',
      bs: '0 2px 3px -1px #84848485',
      bd: 'linear-gradient(0deg, #efefef 0%, white 20%)',
    },
    tab_link: {
      curp: 1,
      // bd: 'red !important',
      td: 'none',
      fw: 500,
      pn: 'relative',
      p: 0,
      zx: 1,
      mnh: 24,
      // mxh: 24,
      w: wideTab ? '100%' : 24,
      h: wideTab ? 30 : 24,
      brs: borderRadius,
      flxi: 'center',
      tdy: '0.3s',
      tdn: '0.6s',
      cr: 'var(--white-0-0-29)',
      ':hover:not(.active)': {
        cr: 'var(--white-0-31)',
        tdy: '0s',
        tdn: '300ms',
      },
      '& .icn': {
        mr: show?.includes('label') ? floor(20) : 0,
        lh: '75%',
        flx: 'center',
      },
    },
    // icn: { ...!noShadow && { fr: 'drop-shadow(0 1px 1px lightgray)' } },
  }

  const selectorRef = useRef(null)
  const [tabsRef, setTabsRef] = useState(null)
  const [active, setactive] = useState(defaultActive || options[0].label)

  useEffect(() => {
    if (active !== defaultActive) setactive(defaultActive)
  }, [defaultActive])

  const setSelectorPos = (activeElement) => {
    setTimeout(() => {
      const { width: toActiveElmWidth } = activeElement.getBoundingClientRect() || { width: 0 }
      // selectorRef.current.style.left = `${activeElement.offsetLeft}px`
      if (!selectorRef.current) return
      selectorRef.current.style.width = `${toActiveElmWidth}px`
      selectorRef.current.style.transform = `translate(${activeElement.offsetLeft - 5}px, -50%)`
    }, 100)
  }

  const toActiveElement = tabsRef?.querySelector(`[data-label="${active}"]`)
  if (toActiveElement) {
    setSelectorPos(toActiveElement)
  }

  const eventHandler = (e, i) => {
    e.preventDefault()
    if (e.type === 'keypress' && e.code !== 'Space') return
    if (e.type === 'keypress' && e.code !== 'Enter') return

    const elm = e.currentTarget

    if (!e.type === 'keypress' || !e.type === 'click') return

    const currentActiveElm = tabsRef.querySelector('.tabs button.active')
    if (elm !== currentActiveElm) {
      currentActiveElm?.classList.remove('active')
      setactive(options[i].label)
    }

    if (onChange) onChange(options[i].label)
  }

  const checkToShow = (item, key) => {
    if (item[key]) {
      if (activeShow && active === item.label && activeShow.includes(key)) return true
      if (show && show.includes(key)) return true
      if (!show && !activeShow) return true
    }
    return false
  }

  return (
    <div className={`${css(style.wrapper)} ${className}`}>
      <div ref={setTabsRef} className={`${css(style.tabs)} tabs`}>
        <div ref={selectorRef} className={`selector ${css(style.selector)}`} style={{ width: defaultItmWidth }} />
        {options?.map((item, i) => {
          const btn = (
            <button
              key={`segment-option-${i * 10}`}
              type="button"
              className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
              onClick={e => eventHandler(e, i)}
              onKeyPress={e => eventHandler(e, i)}
              data-label={item.label}
              data-testid={lowerCaseAllAndReplaceSpaceToHipen(item.label)}
            >
              {checkToShow(item, 'icn') && (
                <span className={`icn ${css(style.icn)} ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
              )}
              {checkToShow(item, 'label') && __(item.label, 'bitform')}
            </button>
          )
          if (item.tip) {
            return <Tip key={`segment-option-${i * 100}`} className={css({ w: '100%', dy: 'inline-block' })} msg={item.tip} place={tipPlace} whiteSpaceNowrap theme="light-border" delay={300}>{btn}</Tip>
          }
          return btn
        })}
      </div>
    </div>
  )
}

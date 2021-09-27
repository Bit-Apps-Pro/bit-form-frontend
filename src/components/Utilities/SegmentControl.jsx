import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { __ } from '../../Utils/i18nwrap'

function SegmentControl({ defaultActive,
  options,
  size = 100,
  component = 'a',
  onChange,
  variant = 'white',
  show,
  activeShow,
  square }) {
  const { css } = useFela()
  const baseSize = Number(size) // 100
  const floor = (number) => (Math.floor(baseSize / number))
  const clr = {}

  if (variant === 'white') {
    clr.tabBg = 'var(--white-0-95)'
    clr.selectorBg = 'var(--white-100)'
    clr.active = 'var(--b-50) !important'
  }
  if (variant === 'blue') {
    clr.selectorBg = 'var(--b-50)'
    clr.tabBg = '#454A65'
    clr.tabClr = 'var(--b-44-87)'
    clr.active = 'var(--white-100) !important'
  }
  if (variant === 'lightgray') {
    clr.selectorBg = 'var(--white-100)'
    clr.tabBg = 'var(--white-0-95)'
    clr.tabClr = 'var(--b-44-87)'
    clr.active = 'var(--b-50) !important'
  }
  const style = {
    wrapper: {
      ta: 'center',
      // mx: 'auto',
    },
    tabs: {
      fs: floor(6.67), // 15
      py: floor(33.34), // 3
      px: floor(20), // 5
      bd: clr.tabBg, // '#f1f1f1',
      ls: 'none',
      dy: 'inline-block',
      brs: floor(7.15), // 14,
      pn: 'relative',
      '& .active': { cr: clr.active },
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
      lt: floor(20), // 5
      tp: '50%',
      tm: 'translatey(-50%)',
      zx: 1,
      brs: floor(9.09), // 11,
      tdn: '0.5s',
      ttf: 'cubic-bezier(0.68, -0.55, 0.36, 1.35)',
      bd: clr.selectorBg, // '#fff',
    },
    tab_link: {
      curp: 1,
      td: 'none',
      fw: 500,
      flxi: 'align-center',
      pn: 'relative',
      py: square ? 0 : floor(10), // 10,
      px: square ? 0 : floor(5), // 20,
      zx: 1,
      ...square && {
        aspectRatio: '1/1',
        w: 30,
        h: 30,
        flxi: 'center',
      },
      tdy: '0.3s',
      tdn: '0.6s',
      cr: clr.tabClr,
      ':hover:not(.active)': {
        cr: 'var(--white-0-100-90)', // '#333',
        tdy: '0s',
        tdn: '300ms',
      },
      '& .icn': {
        mr: show?.includes('label') ? floor(20) : 0,
        lh: '75%',
        // se: floor(9),
        dy: 'block',
      },
      // '& .icn img, .icn svg': {
      //   oy: 0,
      //   tm: 'scale(0)',
      //   // mt: floor(20), // 5
      // },
    },
    // segment_img: {
    //   '& > img, & > svg': {
    //     oy: '1 !important',
    //     tm: 'scale(1) !important',
    //     tdy: '.3s',
    //     tdn: '300ms',
    //   },
    // },
  }
  const selectorRef = useRef(null)
  const tabsRef = useRef(null)
  const [active, setactive] = useState(defaultActive || options[0].label)

  const setSelectorPos = (activeElement) => {
    const { width: toActiveElmWidth } = activeElement.getBoundingClientRect()
    // selectorRef.current.style.left = `${activeElement.offsetLeft}px`
    selectorRef.current.style.transform = `translate(${activeElement.offsetLeft - 4}px, -50%)`
    selectorRef.current.style.width = `${toActiveElmWidth}px`
  }

  useEffect(() => {
    const toActiveElement = tabsRef.current.querySelector(`[data-label="${active}"]`)
    setSelectorPos(toActiveElement)
  }, [active])

  const eventHandler = (e, i) => {
    e.preventDefault()
    if (e.type === 'keypress' && e.code !== 'Space') return
    if (e.type === 'keypress' && e.code !== 'Enter') return

    let elm = e.target
    if (e.target.tagName !== component.toUpperCase()) {
      elm = e.target.parentNode
    }

    if (!e.type === 'keypress' || !e.type === 'click') return

    tabsRef.current.querySelector(`.tabs ${component}.active`)?.classList.remove('active')
    setSelectorPos(elm)
    setactive(options[i].label)
    onChange(options[i].label)
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
    <div className={css(style.wrapper)}>
      <div ref={tabsRef} className={`${css(style.tabs)} tabs`}>
        <div ref={selectorRef} className={`selector ${css(style.selector)}`} />
        {component === 'a' && options?.map((item, i) => (
          <a
            key={`segment-option-${i * 10}`}
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={e => eventHandler(e, i)}
            onKeyPress={e => eventHandler(e, i)}
            href={`#${item.label}`}
            data-label={item.label}
          >
            {checkToShow(item, 'icn') && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {checkToShow(item, 'label') && __(item.label, 'bitform')}
          </a>
        ))}
        {component === 'button' && options?.map((item, i) => (
          <button
            key={`segment-option-${i * 10}`}
            type="button"
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={e => eventHandler(e, i)}
            onKeyPress={e => eventHandler(e, i)}
            data-label={item.label}
          >
            {checkToShow(item, 'icn') && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {checkToShow(item, 'label') && __(item.label, 'bitform')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SegmentControl

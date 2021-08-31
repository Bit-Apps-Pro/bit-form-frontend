import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'

function SegmentControl({ defaultActive, options, size, component = 'a', onChange, variant = 'white' }) {
  const { css } = useFela()
  const baseSize = Number(size) // 100
  const floor = (number) => (Math.floor(baseSize / number))
  const clr = {}
  // console.log(va)
  if (variant === 'white') {
    clr.tabBg = 'var(--white-0-95)'
    clr.selectorBg = 'var(--white-100)'
    clr.active = 'var(--b-50) !important'
  }
  if (variant === 'blue') {
    clr.tabBg = '#454A65'
    clr.selectorBg = 'var(--b-50)'
    clr.active = 'var(--white-100)'
  }
  const style = {
    wrapper: {
      ta: 'center',
      // my: baseSize / 2, // 50
      mx: 'auto',
      // p: baseSize / 10, // 10
    },
    tabs: {
      // mt: baseSize / 2, // 50
      fs: floor(6.67), // 15
      py: floor(33.34), // 3
      px: floor(20), // 5
      // bg: 'var(--white-0-95)', // '#f1f1f1',
      bg: clr.tabBg, // '#f1f1f1',
      ls: 'none',
      d: 'inline-block',
      br: floor(7.15), // 14,
      pos: 'relative',
      // bs: '0 1px 8px -7px grey inset',

      '& button': {
        bg: 'none',
        ol: 'none',
        b: 'none',
      },
    },
    selector: {
      h: '80%',
      d: 'inline-block',
      pos: 'absolute',
      xl: floor(20), // 5
      yt: '50%',
      tf: 'translatey(-50%)',
      z: 1,
      br: floor(9.09), // 11,
      tdu: '0.5s',
      ttf: 'cubic-bezier(0.68, -0.55, 0.36, 1.35)',
      // bg: 'var(--white-100)', // '#fff',
      bg: clr.selectorBg, // '#fff',
      // bs: ' 0 2px 5px 0px #c7c7c7',
    },
    tab_link: {
      td: 'none',
      // clr: 'var(--white-0-50)', // '#777',
      flxi: 'align-center',
      pos: 'relative',
      py: floor(10), // 10,
      px: floor(5), // 20,
      z: 1,
      tdl: '0.3s',
      tdu: '0.6s',
      clr: clr.active,

      '&:hover:not(.active)': {
        clr: 'var(--white-0-100-90)', // '#333',
        tdl: '0s',
        tdu: '300ms',
      },
      // '&.active': {
      //   // clr: 'var(--b-50) !important', // '#005aff',
      //   clr: clr.active, // '#005aff',
      //   t: 'color 0.3s ease 0.3s',
      // },
      '& .icn': {
        mr: floor(20),
        w: floor(5),
        d: 'block',
      },
      '& .icn img, .icn svg': {
        o: 0,
        tf: 'scale(0)',
        mt: floor(20), // 5
      },
    },
    segment_img: {
      '& img, svg': {
        o: '1 !important',
        tf: 'scale(1) !important',
        tdl: '.3s',
        tdu: '300ms',
      },
    },
  }
  const selectorRef = useRef(null)
  const tabsRef = useRef(null)
  const [active, setactive] = useState(false)

  const setSelectorPos = (activeElement) => {
    const { width: toActiveElmWidth } = activeElement.getBoundingClientRect()
    selectorRef.current.style.left = `${activeElement.offsetLeft}px`
    selectorRef.current.style.width = `${toActiveElmWidth}px`
  }

  useEffect(() => {
    const defaultItem = defaultActive || options[0].label
    setactive(defaultItem)
    const toActiveElement = tabsRef.current.querySelector(`[data-label="${defaultItem}"]`)
    setSelectorPos(toActiveElement)
  }, [])

  const eventHandler = (e, i) => {
    e.preventDefault()
    let elm = e.target
    if (e.target.tagName !== component.toUpperCase()) {
      elm = e.target.parentNode
    }

    if (!e.type === 'keypress' || !e.type === 'click') return

    tabsRef.current.querySelector(`.tabs ${component}.active`).classList.remove('active')
    setSelectorPos(elm)
    setactive(options[i].label)
    onChange(options[i].label)
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
            {item.icn && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {item.label}
          </a>
        ))}
        {component === 'button' && options?.map((item, i) => (
          // eslint-disable-next-line react/button-has-type
          <button
            key={`segment-option-${i * 10}`}
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={e => eventHandler(e, i)}
            onKeyPress={e => eventHandler(e, i)}
            data-label={item.label}
          >
            {item.icn && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {item.label}
          </button>
        ))}

      </div>
    </div>
  )
}

export default SegmentControl

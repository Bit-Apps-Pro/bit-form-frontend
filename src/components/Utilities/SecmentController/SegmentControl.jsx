import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import './SegmentControl.css'

function SegmentControl({ defaultActive, options, size }) {
  const { css } = useFela()
  const baseSize = size // 100
  const floor = (number) => (Math.floor(baseSize / number))
  const style = {
    wrapper: {
      ta: 'center',
      my: baseSize / 2, // 50
      mx: 'auto',
      p: baseSize / 10, // 10
    },
    tabs: {
      mt: baseSize / 2, // 50
      fs: floor(6.67), // 15
      py: floor(33.34), // 3
      px: floor(20), // 5
      bg: 'var(--white-0-95)', // '#f1f1f1',
      ls: 'none',
      d: 'inline-block',
      br: floor(7.15), // 14,
      pos: 'relative',
      bs: '0 1px 8px -7px grey inset',
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
      bg: 'var(--white-100)', // '#fff',
      bs: ' 0 2px 5px 0px #c7c7c7',
    },
    tab_link: {
      td: 'none',
      clr: 'var(--white-0-50)', // '#777',
      flxi: 'align-center',
      pos: 'relative',
      py: floor(10), // 10,
      px: floor(5), // 20,
      z: 1,
      tdl: '0.3s',
      tdu: '0.6s',
      '&:hover': {
        clr: 'var(--white-0-0-32)', // '#333',
        tdl: '0s',
        tdu: '300ms',
      },
      '&.active': {
        clr: 'var(--b-50) !important', // '#005aff',
        t: 'color 0.3s ease 0.3s',
      },
      '& .icn': { mr: 5 },
    },
  }
  // const options = [
  //   { label: 'Sunny', icn: '' },
  //   { label: 'Cloudy', icn: '' },
  //   { label: 'Rainy', icn: '' },
  //   { label: 'Snow', icn: '' },
  // ]
  const selectorRef = useRef(null)
  const tabsRef = useRef(null)
  const [active, setactive] = useState(false)

  useEffect(() => {
    const defaultItem = defaultActive || options[0].label
    setactive(defaultItem)
    const toActiveElement = tabsRef.current.querySelector(`[href="#${defaultItem}"]`)
    const { width: toActiveElmWidth } = toActiveElement.getBoundingClientRect()
    selectorRef.current.style.left = `${toActiveElement.offsetLeft}px`
    selectorRef.current.style.width = `${toActiveElmWidth}px`
  }, [])

  const onClickHandler = (e, i) => {
    e.preventDefault()
    let elm = e.target
    if (e.target.tagName !== 'A') {
      elm = e.target.parentNode
    }

    tabsRef.current.querySelector('.tabs a.active').classList.remove('active')
    const currentElmLeft = elm.offsetLeft
    const { width: currentElmWidth } = elm.getBoundingClientRect()
    // console.log(selectorRef)
    selectorRef.current.style.left = `${currentElmLeft}px`
    selectorRef.current.style.width = `${currentElmWidth}px`
    setactive(options[i].label)
    // setOptions({ ...options, active: options.op[index] })
  }

  return (
    <div className={css(style.wrapper)}>
      <div ref={tabsRef} className={`${css(style.tabs)} tabs`}>
        <div ref={selectorRef} className={`selector ${css(style.selector)}`} />
        {options.map((item, i) => (
          <a
            key={`segment-option-${i * 10}`}
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={(e) => onClickHandler(e, i)}
            href={`#${item.label}`}
          >
            {item.icn && (
              <span className="icn">{item.icn}</span>
            )}
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SegmentControl

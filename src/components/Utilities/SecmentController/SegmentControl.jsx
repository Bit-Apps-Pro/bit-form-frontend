import './SegmentControl.css'
import { useEffect, useRef, useState } from 'react'

export default function SegmentControl({ defaultActive }) {
  const options = [
    { label: 'Sunny', icn: '' },
    { label: 'Cloudy', icn: '' },
    { label: 'Rainy', icn: '' },
    { label: 'Snow', icn: '' },
  ]
  const $ = (selector) => (document.querySelector(selector))
  const selectorRef = useRef(false)
  const [active, setactive] = useState(false)

  useEffect(() => {
    const defaultItem = defaultActive || options[0].label
    setactive(defaultItem)
    const toActiveElement = $(`[href="#${defaultItem}"]`)
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

    $('.tabs a.active').classList.remove('active')
    const currentElmLeft = elm.offsetLeft
    const { width: currentElmWidth } = elm.getBoundingClientRect()
    console.log(selectorRef)
    selectorRef.current.style.left = `${currentElmLeft}px`
    selectorRef.current.style.width = `${currentElmWidth}px`
    setactive(options[i].label)
    // setOptions({ ...options, active: options.op[index] })
  }

  return (
    <div className="wrapper">
      <nav className="tabs">
        <div ref={selectorRef} className="selector" />
        {options.map((item, i) => (
          <a
            key={`segment-option-${i * 10}`}
            className={active === item.label ? 'active' : ''}
            onClick={(e) => onClickHandler(e, i)}
            href={`#${item.label}`}
          >
            <span>{item.icn}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

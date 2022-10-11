import { useRef, useState, useEffect } from 'react'
import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import tableStyle from '../../styles/table.style'

export default function Menu({ children, title, icn }) {
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const ref = useRef(null)
  const { css } = useFela()

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      // props.onClickOut()
      // isComponentVisible && props.onClickOut()
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  const handleMenu = () => {
    setIsComponentVisible(true)
  }

  return (
    <div className="btcd-menu">
      <button
        ref={ref}
        onClick={handleMenu}
        className={css(tableStyle.tableActionBtn)}
        style={{ '--tooltip-txt': '"Column  Visibility"', '--tt-left': '148%' }}
        aria-label="icon-btn"
        type="button"
      >
        {icn}
        {title}
      </button>
      <div />
      <div ref={ref} className={`btcd-menu-li ${isComponentVisible ? 'btcd-menu-a' : ''}`}>
        {children}
      </div>
    </div>
  )
}

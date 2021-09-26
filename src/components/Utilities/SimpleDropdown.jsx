import { useRef, useState, useEffect } from 'react'
import { useFela } from 'react-fela'
import ChevronDownIcn from '../../Icons/ChevronDownIcn'
import ut from '../../styles/2.utilities'
import simppleDpdStyle from '../../styles/SimpleDropdown.style'
import useComponentVisible from '../CompSettings/StyleCustomize/ChildComp/useComponentVisible'

export default function SimpleDropdown({ options, value, onChange = () => { }, placeholder = 'Select One', w = 150, h = 25 }) {
  let defaultVal = null
  if (Number.isInteger(value)) {
    defaultVal = options[value]
  } else {
    defaultVal = value
  }
  const { css } = useFela()
  const [menu, setMenu] = useState({ open: false, height: 0 })
  const [selectedItem, setSelectedItem] = useState(defaultVal)
  const optionWrpRef = useRef()
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  useEffect(() => {
    if (Number.isInteger(value)) {
      setSelectedItem(options[value])
    } else {
      setSelectedItem(value)
    }
  }, [value])

  useEffect(() => {
    onChange(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    if (!isComponentVisible) {
      setMenu({ open: false, height: 0 })
    }
  }, [isComponentVisible])

  const handleMenu = (e) => {
    e.stopPropagation()
    if (menu.open) {
      setMenu({ height: 0, open: false })
    } else {
      const optionsHeight = optionWrpRef.current.children[0].offsetHeight
      setMenu({ height: optionsHeight, open: true })
      setIsComponentVisible(true)
    }
  }

  const handleOptionClick = (e, i) => {
    e.stopPropagation()
    setSelectedItem(options[i])
    setMenu({ height: 0, open: false })
  }

  const handleDropdownClick = (e) => {
    if (e.code === 'Escape') {
      setMenu({ height: 0, open: false })
    }
    if (e.code === 'Space' || e.code === 'Enter') {
      if (menu.open) {
        setMenu({ height: 0, open: false })
      } else {
        const optionsHeight = optionWrpRef.current.children[0].offsetHeight
        setMenu({ height: optionsHeight, open: true })
        setIsComponentVisible(true)
      }
      return
    }
    if (e.type === 'click') {
      const optionsHeight = optionWrpRef.current.children[0].offsetHeight
      setMenu({ open: true, height: optionsHeight })
    }
  }

  return (
    <div className={css(simppleDpdStyle.dpd_wrp)} style={{ width: w, height: h }}>
      <div
        ref={ref}
        role="button"
        onClick={handleDropdownClick}
        onKeyUp={handleDropdownClick}
        tabIndex="0"
        className={`${menu.open && css(simppleDpdStyle.dpd_open)} ${css(simppleDpdStyle.dpd)} ${css({ w })}`}
      >
        <div className={css(simppleDpdStyle.selected)} style={{ height: h - 8 }}>
          <div className={css(ut.flxc)}>
            {selectedItem?.icn && <div className={css(simppleDpdStyle.selected_icn)}>{selectedItem.icn}</div>}
            <div>{selectedItem?.label || placeholder}</div>
          </div>
          <button
            aria-label="Menu Close Button"
            type="button"
            onClick={handleMenu}
            className={css([simppleDpdStyle.down_btn, ut['g-c']])}
          >
            <ChevronDownIcn size="18" rotate={!menu.open} />
          </button>
        </div>
        <div
          ref={optionWrpRef}
          className={css(simppleDpdStyle.option_wrp)}
          style={{ height: menu.height }}
        >
          <ul className={css(simppleDpdStyle.options)} aria-hidden={!menu.open}>
            <div className={css(simppleDpdStyle.divider)} />
            {options.map((itm, i) => (
              <li key={`${itm.value}-${i * 9}`} className={css(simppleDpdStyle.option)}>
                <button
                  type="button"
                  tabIndex={menu.open ? 0 : -1}
                  onClick={(e) => handleOptionClick(e, i)}
                  onKeyPress={(e) => handleOptionClick(e, i)}
                  className={css(simppleDpdStyle.opt_btn)}
                >
                  <i className={css(simppleDpdStyle.opt_icn)}>{itm.icn}</i>
                  {itm.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

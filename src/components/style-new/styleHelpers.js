import produce from 'immer'
import { select } from '../../Utils/globalHelpers'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal, { component, width = 250, subtitle, action, value }) => {
  const settingsMenu = select('#settings-menu')
  const offset = { top: 55 }
  const x = Math.round((window.innerWidth - settingsMenu.getBoundingClientRect().width) - width)
  const y = e.target.getBoundingClientRect().top - offset.top
  setDraggableModal({ show: true, component, position: { x, y }, width, subtitle, action, value })
}

export const json2CssStr = (jsonValue) => {
  let cssStr = '{'
  for (const property in jsonValue) {
    if (Object.hasOwnProperty.call(jsonValue, property)) {
      cssStr += `${property}:${jsonValue[property]};`
    }
  }
  cssStr += '}'
  return cssStr
}

export const changeFormDir = (style, dir) => produce(style, drft => {
  if (drft.theme === 'bitformDefault') {
    for (const fieldKey in drft.fields) {
      if (Object.hasOwnProperty.call(drft.fields, fieldKey)) {
        if (drft.fields[fieldKey].overrideGlobalTheme === false) {
          switch (drft.fields[fieldKey].fieldType) {
            case 'check':
            case 'radio':
              if (dir === 'rtl') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
              } else if (dir === 'ltr') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
              }
              break
          }
        }
      }
    }
  }
})

export const unitConverterHelper = (unit, value, preUnit) => {
  if (preUnit === unit) return value

  if (preUnit === 'px' && unit === 'em') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === 'rem') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === '%') return Number(value * 6.25)

  if (preUnit === 'em' && unit === 'px') return Number(value * 16)
  if (preUnit === 'em' && unit === 'rem') return Number(value)
  if (preUnit === 'em' && unit === '%') return Number(value * 100)

  if (preUnit === 'rem' && unit === 'em') return Number(value)
  if (preUnit === 'rem' && unit === 'px') return Number(value * 16)
  if (preUnit === 'rem' && unit === '%') return Number(value * 100)

  if (preUnit === '%' && unit === 'px') return Number(value * 0.16)
  if (preUnit === '%' && unit === 'rem') return Number(value * 0.01)
  if (preUnit === '%' && unit === 'em') return Number(value * 0.01)
}

export const getNumFromStr = (str = '') => str.match(/[-]?([0-9]*[.])?[0-9]+/gi)?.[0]
export const getStrFromStr = (str = '') => str.match(/([A-z]|%)+/gi)?.[0]

function getAbsoluteSize(el) {
  const styles = window.getComputedStyle(el)
  const marginTop = parseFloat(styles.marginTop)
  const marginBottom = parseFloat(styles.marginBottom)
  const marginY = marginTop + marginBottom

  const marginLeft = parseFloat(styles.marginLeft)
  const marginRight = parseFloat(styles.marginRight)
  const marginX = marginLeft + marginRight

  const borderTop = parseFloat(styles.borderTop)
  const borderBottom = parseFloat(styles.borderBottom)
  const borderY = borderBottom + borderTop

  const borderLeft = parseFloat(styles.borderLeft)
  const borderRight = parseFloat(styles.borderRight)
  const borderX = borderRight + borderLeft

  const paddingLeft = parseFloat(styles.paddingLeft)
  const paddingRight = parseFloat(styles.paddingRight)
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)
  const height = Math.ceil(el.offsetHeight)
  const width = Math.ceil(el.offsetWidth)

  return {
    height,
    width,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    marginX,
    marginY,
    borderX,
    borderY,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }
}

/**
 * @param {string} selector html query  selector
 * @param {string} selector "element" | "margin" | "padding"
*/
export function highlightElm(selector, selectType = 'element') {
  const elms = document.querySelectorAll(selector)
  elms.forEach(elm => {
    const marginDiv = document.createElement('div')
    const paddingDiv = document.createElement('div')
    const elementDiv = document.createElement('div')
    const { height,
      width,
      marginX,
      marginY,
      marginRight,
      marginBottom,
      marginLeft,
      marginTop,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom } = getAbsoluteSize(elm)
    marginDiv.style.width = `${width + marginX}px`
    marginDiv.style.height = `${height + marginY}px`
    marginDiv.style.top = `${elm.offsetTop - marginTop}px`
    marginDiv.style.left = `${elm.offsetLeft - marginLeft}px`
    marginDiv.classList.add('margin')

    elementDiv.classList.add('element')
    elementDiv.style.width = `${width}px`
    elementDiv.style.height = `${height}px`
    elementDiv.style.marginRight = `${marginRight}px`
    elementDiv.style.marginLeft = `${marginLeft}px`
    elementDiv.style.marginTop = `${marginTop}px`
    elementDiv.style.marginBottom = `${marginBottom}px`

    paddingDiv.classList.add('padding')
    paddingDiv.style.width = `${width - paddingLeft - paddingRight}px`
    paddingDiv.style.height = `${height - paddingTop - paddingBottom}px`
    paddingDiv.style.marginRight = `${paddingRight}px`
    paddingDiv.style.marginLeft = `${paddingLeft}px`
    paddingDiv.style.marginTop = `${paddingTop}px`
    paddingDiv.style.marginBottom = `${paddingBottom}px`

    if (selectType.indexOf('element') < 0) {
      elementDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('margin') < 0) {
      marginDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('padding') < 0) {
      paddingDiv.style.background = 'transparent'
    }
    marginDiv.appendChild(elementDiv)
    elementDiv.appendChild(paddingDiv)
    elementDiv.style.width = document.body.appendChild(marginDiv)
  })
}

/**
 * @param {string} fk "field key"
 * @param {string} type "size"
*/
export const CommonStyle = (fk, type) => {
  switch (type) {
    case 'small-2':
      return {
        [`.${fk}-lbl`]: { 'font-size': '10px' },
        [`.${fk}-st`]: { 'font-size': '9px' },
        [`.${fk}-ht`]: { 'font-size': '9px' },
        [`.${fk}-fld`]: { 'font-size': '10px', padding: '5px 2px !important' },
      }
    case 'small-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '12px' },
        [`.${fk}-st`]: { 'font-size': '10px' },
        [`.${fk}-ht`]: { 'font-size': '10px' },
        [`.${fk}-fld`]: { 'font-size': '12px', padding: '6px 3px' },
      }
    case 'small':
      return {
        [`.${fk}-lbl`]: { 'font-size': '14px' },
        [`.${fk}-st`]: { 'font-size': '12px' },
        [`.${fk}-ht`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '14px', padding: '7px 4px' },
      }
    case 'medium':
      return {
        [`.${fk}-lbl`]: { 'font-size': '16px' },
        [`.${fk}-st`]: { 'font-size': '11px' },
        [`.${fk}-ht`]: { 'font-size': '11px' },
        [`.${fk}-fld`]: { 'font-size': '16px', padding: '8px 5px' },
      }
    case 'large':
      return {
        [`.${fk}-lbl`]: { 'font-size': '18px' },
        [`.${fk}-st`]: { 'font-size': '12px' },
        [`.${fk}-ht`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '18px', padding: '9px 6px' },
      }
    case 'large-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '20px' },
        [`.${fk}-st`]: { 'font-size': '14px' },
        [`.${fk}-ht`]: { 'font-size': '14px' },
        [`.${fk}-fld`]: { 'font-size': '20px', padding: '10px 7px' },
      }
    default:
      return 'default......'
  }
}


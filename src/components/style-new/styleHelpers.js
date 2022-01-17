/* eslint-disable no-param-reassign */
import produce from 'immer'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { select } from '../../Utils/globalHelpers'
// eslint-disable-next-line camelcase
import textStyle_1_bitformDefault from './componentsStyleByTheme/1_bitformDefault/textStyle_1_bitformDefault'
import editorConfig from './NewStyleEditorConfig'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal, props) => {
  const settingsMenu = select('#settings-menu')
  const offset = { top: 55 }
  const x = Math.round((window.innerWidth - settingsMenu.getBoundingClientRect().width) - (props.width || 250))
  const y = e.target.getBoundingClientRect().top - offset.top
  setDraggableModal({ show: true, position: { x, y }, ...props })
}

// This Function used for Array To Style String converter (like shadow)
export const objectArrayToStyleStringGenarator = shadows => {
  let shadowString = ''
  shadows.map(shadow => {
    shadowString += `${Object.values(shadow).join(' ')},`
  })
  shadowString = shadowString.slice(0, -1)
  return shadowString
}

export const json2CssStr = (className, jsonValue) => {
  let cssStr = '{'
  const objArr = Object.entries(jsonValue)
  objArr.map(([property, value]) => {
    cssStr += `${property}:${value};`
  })
  cssStr += '}'
  return className + cssStr
}

export const changeFormDir = (style, dir) => produce(style, drft => {
  if (drft.theme === 'bitformDefault') {
    const fieldsKeysArr = Object.keys(drft.fields)
    const fieldsKeysArrLen = fieldsKeysArr.length
    for (let i = 0; i < fieldsKeysArrLen; i += 1) {
      const fieldKey = fieldsKeysArr[i]
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
            default:
              break
          }
        }
      }
    }
  }
})

export const unitConverter = (unit, value, prvUnit) => {
  if (prvUnit === unit) return value

  if (prvUnit === 'px' && unit === 'em') return Number((value * 0.0625).toFixed(3))
  if (prvUnit === 'px' && unit === 'rem') return Number((value * 0.0625).toFixed(3))
  if (prvUnit === 'px' && unit === '%') return Number(value * 6.25)

  if (prvUnit === 'em' && unit === 'px') return Number(value * 16)
  if (prvUnit === 'em' && unit === 'rem') return Number(value)
  if (prvUnit === 'em' && unit === '%') return Number(value * 100)

  if (prvUnit === 'rem' && unit === 'em') return Number(value)
  if (prvUnit === 'rem' && unit === 'px') return Number(value * 16)
  if (prvUnit === 'rem' && unit === '%') return Number(value * 100)

  if (prvUnit === '%' && unit === 'px') return Number(value * 0.16)
  if (prvUnit === '%' && unit === 'rem') return Number(value * 0.01)
  if (prvUnit === '%' && unit === 'em') return Number(value * 0.01)
}

export const getNumFromStr = (str = '') => str.match(/[-]?([0-9]*[.])?[0-9]+/gi)?.[0]
export const getStrFromStr = (str = '') => str.match(/([A-z]|%)+/gi)?.[0]

export const searchKey = (e) => {
  if (e.ctrlKey && e.code === 'Slash') {
    document.getElementById('search-icon').focus()
  }
  if (e.code === 'Escape') {
    document.getElementById('search-icon').blur()
  }
}

function getAbsoluteSize(el) {
  const styles = window.getComputedStyle(el)
  // const marginTop =
  // const marginBottom =

  // const marginLeft = parseFloat(styles.marginLeft)
  // const marginRight = parseFloat(styles.marginRight)

  // const borderTop = parseFloat(styles.borderTop)
  const borderBottom = parseFloat(styles.borderBottom)

  const borderLeft = parseFloat(styles.borderLeft)
  const borderRight = parseFloat(styles.borderRight)

  const paddingLeft = parseFloat(styles.paddingLeft)
  const paddingRight = parseFloat(styles.paddingRight)
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)

  return {
    borderBottom,
    borderTop: parseFloat(styles.borderTop),
    borderLeft,
    borderRight,
    marginBottom: parseFloat(styles.marginBottom),
    marginTop: parseFloat(styles.marginTop),
    marginLeft: parseFloat(styles.marginLeft),
    marginRight: parseFloat(styles.marginRight),
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }
}

/**
 * @param {string} selector html query selector
 * @param {string} selectType "element" | "margin" | "padding"
*/
export function highlightElm(selector, selectType = 'element padding margin') {
  const elms = document.getElementById('bit-grid-layout')?.contentWindow.document.querySelectorAll(selector)
  elms?.forEach(elm => {
    const marginDiv = document.createElement('div')
    const paddingDiv = document.createElement('div')
    const elementDiv = document.createElement('div')
    const { marginRight,
      marginBottom,
      marginLeft,
      marginTop,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom } = getAbsoluteSize(elm)
    const { top, left, height, width } = elm.getBoundingClientRect()

    marginDiv.style.width = `${width + marginRight + marginLeft}px`
    marginDiv.style.height = `${height + marginTop + marginBottom}px`
    marginDiv.style.top = `${top - marginTop}px`
    marginDiv.style.left = `${left - marginLeft}px`
    marginDiv.classList.add('highlight-margin')
    marginDiv.setAttribute('data-highlight', selector)
    marginDiv.onclick = (e) => {
      if (e.target.hasAttribute('data-highlight')) { e.target.remove(); return }
      if (e.target.parentNode.hasAttribute('data-highlight')) { e.target.parentNode.remove(); return }
      if (e.target.parentNode.parentNode.hasAttribute('data-highlight')) { e.target.parentNode.parentNode.remove() }
    }

    elementDiv.classList.add('highlight-element')
    elementDiv.style.width = `${width}px`
    elementDiv.style.height = `${height}px`
    elementDiv.style.marginRight = `${marginRight}px`
    elementDiv.style.marginLeft = `${marginLeft}px`
    elementDiv.style.marginTop = `${marginTop}px`
    elementDiv.style.marginBottom = `${marginBottom}px`

    paddingDiv.classList.add('highlight-padding')
    paddingDiv.style.width = `${width - paddingLeft - paddingRight}px`
    paddingDiv.style.height = `${height - paddingTop - paddingBottom}px`
    paddingDiv.style.marginRight = `${paddingRight}px`
    paddingDiv.style.marginLeft = `${paddingLeft}px`
    paddingDiv.style.marginTop = `${paddingTop}px`
    paddingDiv.style.marginBottom = `${paddingBottom}px`

    if (selectType.indexOf('element') < 0) {
      elementDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('margin') < 0
      || (width + marginTop + marginBottom) === width
      || (height + marginRight + marginLeft) === height) {
      marginDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('padding') < 0
      || (width - paddingLeft - paddingRight) === width
      || (height - paddingTop - paddingBottom) === height) {
      paddingDiv.style.background = 'transparent'
    }

    marginDiv.appendChild(elementDiv)
    elementDiv.appendChild(paddingDiv)
    // console.log('', marginDiv)
    // document.body.appendChild(marginDiv)
    document.getElementById('bit-grid-layout')?.contentWindow?.document.body.prepend(marginDiv)
  })
}

export const removeHightlight = (selector = '[data-highlight]') => {
  const elms = document.getElementById('bit-grid-layout')?.contentWindow.document.querySelectorAll(selector)
  elms.forEach(elm => { elm.remove() })
}

/**
 * @function commonStyle(fk, type)
 * @param {string} fk field key
 * @param {string} type size
 * @return style classes
*/
export const commonStyle = (fk, type) => {
  switch (type) {
    case 'small-2':
      return {
        [`.${fk}-lbl`]: { 'font-size': '10px' },
        [`.${fk}-sub-titl`]: { 'font-size': '9px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '9px' },
        [`.${fk}-fld`]: { 'font-size': '10px', padding: '5px 2px !important', height: '10px' },
      }
    case 'small-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '12px' },
        [`.${fk}-sub-titl`]: { 'font-size': '10px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '10px' },
        [`.${fk}-fld`]: { 'font-size': '12px', padding: '6px 3px' },
      }
    case 'small':
      return {
        [`.${fk}-lbl`]: { 'font-size': '14px' },
        [`.${fk}-sub-titl`]: { 'font-size': '12px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '14px', padding: '7px 4px' },
      }
    case 'medium':
      return {
        [`.${fk}-lbl`]: { 'font-size': '16px' },
        [`.${fk}-sub-titl`]: { 'font-size': '11px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '11px' },
        [`.${fk}-fld`]: { 'font-size': '16px', padding: '8px 5px' },
      }
    case 'large':
      return {
        [`.${fk}-lbl`]: { 'font-size': '18px' },
        [`.${fk}-sub-titl`]: { 'font-size': '12px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '18px', padding: '9px 6px' },
      }
    case 'large-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '20px' },
        [`.${fk}-sub-titl`]: { 'font-size': '14px' },
        [`.${fk}-hlp-txt`]: { 'font-size': '14px' },
        [`.${fk}-fld`]: { 'font-size': '20px', padding: '10px 7px' },
      }
    default:
      return 'default......'
  }
}

export const splitValueBySpaces = str => str?.split(/(?!\(.*)\s(?![^(]*?\))/g) || []

export const getObjByKey = (objName, obj) => obj[objName]

export const getValueByObjPath = (obj, path) => {
  if (!obj || !path) return null
  const paths = path?.split('->') || []
  if (paths.length === 1) {
    return obj[paths[0]]
  }
  let value = obj
  for (let i = 0; i < paths.length; i += 1) {
    value = value[paths[i]]
    if (value === undefined) return ''
  }

  return value
}

export const setStyleStateObj = (obj, path, value, setStates) => {
  let setStateFunc = null
  if (obj === 'themeVars') {
    setStateFunc = setStates.setThemeVars
  } else if (obj === 'styles') {
    setStateFunc = setStates.setStyles
  } else if (obj === 'themeColors') {
    setStateFunc = setStates.setThemeColors
  }
  setStateFunc?.(preStyle => produce(preStyle, drftStyle => {
    assignNestedObj(drftStyle, path, value)
  }))
}

export function arrDiff(arr1, arr2) {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x)))
}

export const addableCssPropsByField = (fieldType) => {
  switch (fieldType) {
    case 'text':
    case 'date':
    case 'number':
    case 'username':
    case 'textarea':
    case 'email':
      return Object.keys(editorConfig.texfieldStyle.properties)
    case 'dropdown':
    // return Object.keys(editorConfig.texfieldStyle.properties)

    // eslint-disable-next-line no-fallthrough
    default:
      break
  }
}

const styleClasses = {
  lbl: ['lbl', 'lbl-wrp'],
  lblPreIcn: ['lbl-pre-i'],
  lblSufIcn: ['lbl-suf-i'],
  subTitl: ['sub-titl'],
  subTlePreIcn: ['sub-titl-pre-i'],
  subTleSufIcn: ['sub-titl-suf-i'],
  hepTxt: ['hlp-txt'],
  hlpPreIcn: ['hlp-txt-pre-i'],
  hlpSufIcn: ['hlp-txt-suf-i'],
  prefixIcn: ['pre-i'],
  suffixIcn: ['suf-i'],
  err: ['err-msg'],
  errPreIcn: ['err-txt-pre-i'],
  errSufIcn: ['err-txt-suf-i'],
}

const deleteStyles = (obj, clsArr, fk) => clsArr.forEach(cls => delete obj.fields?.[fk]?.classes?.[`.${fk}-${cls}`])

export const removeUnuseStyles = (fields, setStyles) => {
  const fieldsArray = Object.keys(fields)
  setStyles(prvStyle => produce(prvStyle, deftStyles => {
    fieldsArray.forEach(fldkey => {
      const fld = fields[fldkey]
      if (!fld.lbl) deleteStyles(deftStyles, styleClasses.lbl, fldkey)
      if (!fld.lblPreIcn) deleteStyles(deftStyles, styleClasses.lblPreIcn, fldkey)
      if (!fld.lblSufIcn) deleteStyles(deftStyles, styleClasses.lblSufIcn, fldkey)
      if (!fld.subtitle) deleteStyles(deftStyles, styleClasses.subTitl, fldkey)
      if (!fld.subTlePreIcn) deleteStyles(deftStyles, styleClasses.subTlePreIcn, fldkey)
      if (!fld.subTleSufIcn) deleteStyles(deftStyles, styleClasses.subTleSufIcn, fldkey)
      if (!fld.helperTxt) deleteStyles(deftStyles, styleClasses.hepTxt, fldkey)
      if (!fld.hlpPreIcn) deleteStyles(deftStyles, styleClasses.hlpPreIcn, fldkey)
      if (!fld.hlpSufIcn) deleteStyles(deftStyles, styleClasses.hlpSufIcn, fldkey)
      if (!fld.err) deleteStyles(deftStyles, styleClasses.err, fldkey)
      if (!fld.errPreIcn) deleteStyles(deftStyles, styleClasses.errPreIcn, fldkey)
      if (!fld.errSufIcn) deleteStyles(deftStyles, styleClasses.errSufIcn, fldkey)

      switch (fld.typ) {
        case 'text':
        case 'number':
        case 'password':
        case 'username':
        case 'email':
        case 'url':
        case 'date':
        case 'datetime-local':
        case 'time':
        case 'month':
        case 'week':
        case 'color':
        case 'textarea':
          if (!fld.prefixIcn) deleteStyles(deftStyles, styleClasses.prefixIcn, fldkey)
          if (!fld.suffixIcn) deleteStyles(deftStyles, styleClasses.suffixIcn, fldkey)
          break
        case 'radio':

          break
        case 'check':

          break
        default:
          break
      }
    })
  }))
}

export const addDefaultStyleClasses = (fk, element, setStyle) => {
  setStyle(prvStyle => produce(prvStyle, drftStyle => {
    console.log('fk', fk, 'element', element)
    const fldTyp = prvStyle.fields[fk].fieldType
    switch (fldTyp) {
      case 'text':
      case 'number':
      case 'password':
      case 'username':
      case 'email':
      case 'url':
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
      case 'color':
      case 'textarea':
        // eslint-disable-next-line no-case-declarations
        const textStyleBitFormDefault = textStyle_1_bitformDefault({ fk, fldTyp })
        // eslint-disable-next-line no-case-declarations
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = textStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      default:
        break
    }
  }))
}

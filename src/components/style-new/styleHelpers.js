/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { hexToCSSFilter } from 'hex-to-css-filter'
import produce from 'immer'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { select } from '../../Utils/globalHelpers'
import { getIconsGlobalFilterVariable, getIconsParentElement } from '../../Utils/Helpers'
import { hslToHex } from './colorHelpers'
import advancedFileUp_1_bitformDefault from './componentsStyleByTheme/1_bitformDefault/advancedFileUp_1_bitformDefault'
import buttonStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/buttonStyle_1_bitformDefault'
import checkboxNradioStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/checkboxNradioStyle_1_bitformDefault'
import countryStyle_1_BitformDefault from './componentsStyleByTheme/1_bitformDefault/countryStyle_1_bitformDefault'
import currencyStyle_1_BitformDefault from './componentsStyleByTheme/1_bitformDefault/currencyStyle_1_bitformDefault'
import dividerStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/dividerStyle_1_bitformDefault'
import dropdownStyle_1_BitformDefault from './componentsStyleByTheme/1_bitformDefault/dropdownStyle_1_bitformDefault'
import fileUploadStyle_1_BitformDefault from './componentsStyleByTheme/1_bitformDefault/fileUpload_1_bitformDefault'
import htmlStyle_1_bitformDefault from './componentsStyleByTheme/1_bitformDefault/htmlStyle_1_bitformDefault'
import imageStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/imageStyle_1_bitformDefault'
import phoneNumberStyle_1_bitformDefault from './componentsStyleByTheme/1_bitformDefault/phoneNumberStyle_1_bitformDefault'
import recaptchaStyle_1_bitformDefault from './componentsStyleByTheme/1_bitformDefault/recaptchaStyle_1_bitformDefault'
import selectStyle_1_BitformDefault from './componentsStyleByTheme/1_bitformDefault/selectStyle_1_bitformDefault'
import textStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/textStyle_1_bitformDefault'
import titleStyle1BitformDefault from './componentsStyleByTheme/1_bitformDefault/titleStyle_1_bitformDefault'
import editorConfig from './NewStyleEditorConfig'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal, props) => {
  const settingsMenu = select('#settings-menu')
  const offset = { top: 55 }
  const x = Math.round((window.innerWidth - settingsMenu.getBoundingClientRect().width) - (props.width || 250))
  const currentTargetTop = e.target.getBoundingClientRect().top
  const y = currentTargetTop > 300 ? 200 : currentTargetTop - offset.top
  setDraggableModal({ show: true, position: { x, y }, ...props })
}

// This Function used for Array To Style String converter (like shadow)
export const objectArrayToStyleStringGenarator = shadows => {
  let shadowString = ''
  shadows.forEach(shadow => {
    shadowString += `${Object.values(shadow).join(' ')},`
  })
  shadowString = shadowString.slice(0, -1)
  return shadowString
}

export const json2CssStr = (className, jsonValue) => {
  if (!jsonValue) return ''
  let cssStr = '{'
  const objArr = Object.entries(jsonValue)
  objArr.forEach(([property, value]) => {
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
        if (drft.fields[fieldKey].overrideGlobalTheme.length === 0) {
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
            case 'currency':
            case 'country':
              if (dir === 'rtl') {
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].left
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right = '13px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right
                drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left = '6px'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`].margin = '0px 10px 0px 0px'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-right'] = '35px !important'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-left'] = '35px !important'
              } else if (dir === 'ltr') {
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].left = '13px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right
                drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right = '6px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`].margin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-right']
              }
              break
            case 'phone-number':
              if (dir === 'rtl') {
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].left
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right = '13px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].right
                drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].left = '6px'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`].margin = '0px 10px 0px 0px'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-right'] = '35px !important'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right
                drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left = '6px'
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-prefix`].margin = '0px 10px 0px 0px'
              } else if (dir === 'ltr') {
                drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].left = '13px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right
                drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].right = '6px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].left
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`].margin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-right']
                drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right = '6px'
                delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left
                delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-prefix`].margin
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
  if (prvUnit === 'px' && unit === '') return Number(value)
  if (prvUnit === 'px' && unit === 'cm') return Number(value * 0.026)
  if (prvUnit === 'px' && unit === 'mm') return Number(value * 0.26)

  if (prvUnit === 'em' && unit === 'px') return Number(value * 16)
  if (prvUnit === 'em' && unit === '') return Number(value * 16)
  if (prvUnit === 'em' && unit === 'rem') return Number(value)
  if (prvUnit === 'em' && unit === '%') return Number(value * 100)
  if (prvUnit === 'em' && unit === 'cm') return Number(value * 0.423)
  if (prvUnit === 'em' && unit === 'cm') return Number(value * 4.233)

  if (prvUnit === 'rem' && unit === 'em') return Number(value)
  if (prvUnit === 'rem' && unit === 'px') return Number(value * 16)
  if (prvUnit === 'rem' && unit === '') return Number(value * 16)
  if (prvUnit === 'rem' && unit === '%') return Number(value * 100)
  if (prvUnit === 'rem' && unit === 'cm') return Number(value * 0.423)
  if (prvUnit === 'rem' && unit === 'mm') return Number(value * 4.233)

  if (prvUnit === 'cm' && unit === 'rem') return Number(value * 2.362)
  if (prvUnit === 'cm' && unit === 'px') return Number(value * 37.80)

  if (prvUnit === '%' && unit === 'px') return Number(value * 0.16)
  if (prvUnit === '%' && unit === '') return Number(value * 0.01)
  if (prvUnit === '%' && unit === 'rem') return Number(value * 0.01)
  if (prvUnit === '%' && unit === 'em') return Number(value * 0.01)

  if (prvUnit === '' && unit === 'em') return Number((value * 0.0625).toFixed(3))
  if (prvUnit === '' && unit === 'rem') return Number((value * 0.0625).toFixed(3))
  if (prvUnit === '' && unit === '%') return Number(value * 100)
  if (prvUnit === '' && unit === 'px') return Number(value)

  if (prvUnit === 'deg' && unit === 'rad') return Number(value * 0.0174533)
  if (prvUnit === 'deg' && unit === 'turn') return Number(value * 0.00277778)

  if (prvUnit === 'turn' && unit === 'rad') return Number(value * 6.28319)
  if (prvUnit === 'turn' && unit === 'deg') return Number(value * 360)

  // formula (1)rad / 2π = turn
  if (prvUnit === 'rad' && unit === 'turn') return Number(value * 0.159155)
  // formula (1)rad * 180/π = deg°
  if (prvUnit === 'rad' && unit === 'deg') return Number(value * 57.2958)

  // convert mm to (px, rem, em)
  if (prvUnit === 'mm' && unit === 'px') return Number(value * 3.78)
  if (prvUnit === 'mm' && unit === 'rem') return Number(value * 0.24)
  if (prvUnit === 'mm' && unit === 'em') return Number(value * 0.24)
  return value
}

export const getNumFromStr = (str = '') => {
  const num = str ? str?.match(/[-]?([0-9]*[.])?[0-9]+/gi) : 0
  return num ? num[0] : ''
}
export const getStrFromStr = (str = '') => {
  const newStr = str ? str?.match(/([A-z]|%)+/gi)?.[0] : ''
  return newStr || ''
}

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
    document.getElementById('bit-grid-layout')?.contentWindow?.document.body.prepend(marginDiv)
  })
}

export const removeHighlight = (selector = '[data-highlight]') => {
  const elms = document.getElementById('bit-grid-layout')?.contentWindow.document.querySelectorAll(selector)
  elms?.forEach(elm => { elm.remove() })
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

export const setStyleStateObj = (objName, path, value, setStates) => {
  let setStateFunc = null
  if (objName === 'themeVars') {
    setStateFunc = setStates.setThemeVars
  } else if (objName === 'styles') {
    setStateFunc = setStates.setStyles
  } else if (objName === 'themeColors') {
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
export const addableCssPropsObj = (fieldType, elementKey = 'fld-wrp') => editorConfig[fieldType][elementKey].properties
export const addableCssPropsByField = (fieldType, elementKey = 'fld-wrp') => Object.keys(editorConfig[fieldType][elementKey].properties)

export const styleClasses = {
  logo: ['logo'],
  title: ['title'],
  titlePreIcn: ['title-pre-i'],
  titleSufIcn: ['title-suf-i'],
  lbl: ['lbl', 'lbl-wrp'],
  lblPreIcn: ['lbl-pre-i'],
  lblSufIcn: ['lbl-suf-i'],
  reqSmbl: ['req-smbl'],
  subTitl: ['sub-titl'],
  subTlePreIcn: ['sub-titl-pre-i'],
  subTleSufIcn: ['sub-titl-suf-i'],
  subTitlPreIcn: ['sub-titl-pre-i'],
  subTitlSufIcn: ['sub-titl-suf-i'],
  fld: ['fld'],
  divider: ['divider'],
  image: ['img'],
  button: ['btn'],
  btnTxt: ['btn-txt'],
  hlpTxt: ['hlp-txt'],
  hlpPreIcn: ['hlp-txt-pre-i'],
  hlpSufIcn: ['hlp-txt-suf-i'],
  prefixIcn: ['pre-i'],
  suffixIcn: ['suf-i'],
  fileSelectStatus: ['file-select-status'],
  maxSizeLbl: ['max-size-lbl'],
  fileWpr: ['file-wrpr'],
  filePreview: ['file-preview'],
  fileTitl: ['file-title'],
  fileSize: ['file-size'],
  crossBtn: ['cross-btn'],
  btnPreIcn: ['btn-pre-i'],
  btnSufIcn: ['btn-suf-i'],
  err: ['err-msg'],
  errPreIcn: ['err-txt-pre-i'],
  errSufIcn: ['err-txt-suf-i'],
  reqSmbl: ['req-smbl'],
}

export const iconElementLabel = {
  titlePreIcn: 'Title Leading',
  titleSufIcn: 'Title Trailing',
  lblPreIcn: 'Label Leading',
  lblSufIcn: 'Label Trailing',
  subTlePreIcn: 'Sub Title Leading',
  subTleSufIcn: 'Sub Title Trailing',
  subTitlPreIcn: 'sub Title Leading',
  subTitlSufIcn: 'sub Title Trailing',
  hlpPreIcn: 'Helper Text Leading',
  hlpSufIcn: 'Helper Text Trailing',
  prefixIcn: 'Leading',
  suffixIcn: 'Trailing',
  btnPreIcn: 'Button Leading',
  btnSufIcn: 'Button Trailing',
  errPreIcn: 'Error Text Leading',
  errSufIcn: 'Error Text Trailing',
  placeholderImage: 'Placeholder Image',
  logo: 'Logo',
  bg_img: 'Background Image',
}

const deleteStyles = (obj, clsArr, fk) => clsArr.forEach(cls => delete obj.fields?.[fk]?.classes?.[`.${fk}-${cls}`])
const checkExistElmntInOvrdThm = (fldStyleObj, element) => fldStyleObj?.overrideGlobalTheme?.find(el => el === element)

export const removeUnuseStyles = () => {
  const newStyles = getUpdatedStyles()
  setRecoil($styles, newStyles)
}

export const getUpdatedStyles = () => {
  const fields = getRecoil($fields)
  const styles = getRecoil($styles)
  const fieldsArray = Object.keys(fields)
  const newStyles = produce(styles, deftStyles => {
    fieldsArray.forEach(fldkey => {
      const fld = fields[fldkey]
      if (!fld.lbl) deleteStyles(deftStyles, styleClasses.lbl, fldkey)
      if (!fld.lblPreIcn) deleteStyles(deftStyles, styleClasses.lblPreIcn, fldkey)
      if (!fld.lblSufIcn) deleteStyles(deftStyles, styleClasses.lblSufIcn, fldkey)
      if (!fld.subtitle) deleteStyles(deftStyles, styleClasses.subTitl, fldkey)
      if (!fld.subTlePreIcn && !(fld.typ === 'title')) deleteStyles(deftStyles, styleClasses.subTlePreIcn, fldkey)
      if (!fld.subTleSufIcn && !(fld.typ === 'title')) deleteStyles(deftStyles, styleClasses.subTleSufIcn, fldkey)
      if (!fld.helperTxt) deleteStyles(deftStyles, styleClasses.hlpTxt, fldkey)
      if (!fld.hlpPreIcn) deleteStyles(deftStyles, styleClasses.hlpPreIcn, fldkey)
      if (!fld.hlpSufIcn) deleteStyles(deftStyles, styleClasses.hlpSufIcn, fldkey)
      if (!fld.err) deleteStyles(deftStyles, styleClasses.err, fldkey)
      if (!fld.errPreIcn) deleteStyles(deftStyles, styleClasses.errPreIcn, fldkey)
      if (!fld.errSufIcn) deleteStyles(deftStyles, styleClasses.errSufIcn, fldkey)
      if (!fld.valid.reqShow) deleteStyles(deftStyles, styleClasses.reqSmbl, fldkey)

      switch (fld.typ) {
        case 'button':
          if (!fld.btnPreIcn) deleteStyles(deftStyles, styleClasses.btnPreIcn, fldkey)
          if (!fld.btnSufIcn) deleteStyles(deftStyles, styleClasses.btnSufIcn, fldkey)
          break
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

        case 'title':
          if (!fld.subTitlPreIcn) deleteStyles(deftStyles, styleClasses.subTitlPreIcn, fldkey)
          if (!fld.subTitlSufIcn) deleteStyles(deftStyles, styleClasses.subTitlSufIcn, fldkey)
          if (!fld.titlePreIcn) deleteStyles(deftStyles, styleClasses.titlePreIcn, fldkey)
          if (!fld.titleSufIcn) deleteStyles(deftStyles, styleClasses.titleSufIcn, fldkey)
          break

        default:
          break
      }
    })
  })
  return newStyles
}

export const addDefaultStyleClasses = (fk, element) => {
  const styles = getRecoil($styles)
  const newStyles = produce(styles, drftStyle => {
    const fldTyp = styles.fields[fk]?.fieldType
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
        const textStyleBitFormDefault = textStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = textStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'title':
        const titleStyleBitFormDefault = titleStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = titleStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'divider':
        const dividerStyleBitFormDefault = dividerStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = dividerStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'image':
        const imageStyleBitFormDefault = imageStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = imageStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'button':
        const buttonStyleBitFormDefault = buttonStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = buttonStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'check':
      case 'radio':
        const checkBoxStyleBitFormDefault = checkboxNradioStyle1BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = checkBoxStyleBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'advanced-file-up':
        const advanceFileUpBitFormDefault = advancedFileUp_1_bitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = advanceFileUpBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'html':
        const htmlBitFormDefault = htmlStyle_1_bitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = htmlBitFormDefault[`.${fk}-${cls}`]
        })
        break
      case 'currency':
        const currencyStyle1BitformDefault = currencyStyle_1_BitformDefault({ fk })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = currencyStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'country':
        const countryStyle1BitformDefault = countryStyle_1_BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = countryStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'file-up':
        const fileUploadStyle1BitformDefault = fileUploadStyle_1_BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = fileUploadStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'recaptcha':
        const recaptchaStyle1BitformDefault = recaptchaStyle_1_bitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = recaptchaStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'html-select':
        const selectStyle1BitformDefault = selectStyle_1_BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = selectStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'select':
        const dropdownStyle1BitformDefault = dropdownStyle_1_BitformDefault({ fk, fldTyp })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = dropdownStyle1BitformDefault[`.${fk}-${cls}`]
        })
        break
      case 'phone-number':
        const phoneNumberStyleBitformDefault = phoneNumberStyle_1_bitformDefault({ fk })
        styleClasses[element].forEach(cls => {
          drftStyle.fields[fk].classes[`.${fk}-${cls}`] = phoneNumberStyleBitformDefault[`.${fk}-${cls}`]
        })
        break
      default:
        break
    }
  })
  setRecoil($styles, newStyles)
}

export const generateFontUrl = (font, string) => {
  const fontFamily = font.replaceAll(/\s/gi, '+')
  const newParmrs = string !== '' ? `:ital,${string}` : ''
  return `https://fonts.googleapis.com/css2?family=${fontFamily}${newParmrs}&display=swap`
}

export const findExistingFontStyleNWeidth = () => {
  const styles = getRecoil($styles)
  const themeVars = getRecoil($themeVars)
  const fontWeightVariant = []
  const fontStyleVariant = []
  const fieldsArr = Object.keys(styles.fields)
  const fieldsLenght = fieldsArr.length

  for (let fldIndx = 0; fldIndx < fieldsLenght; fldIndx += 1) {
    const fieldClasses = styles.fields[fieldsArr[fldIndx]].classes
    const fieldClassesArr = Object.keys(fieldClasses)
    const fieldClassesLen = fieldClassesArr.length
    for (let clsIndx = 0; clsIndx < fieldClassesLen; clsIndx += 1) {
      const clsProperties = fieldClasses[fieldClassesArr[clsIndx]]
      if (Object.prototype.hasOwnProperty.call(clsProperties, 'font-weight')) {
        let weight = clsProperties['font-weight']
        weight = getValueFromStateVar(themeVars, weight)
        if (weight && !fontWeightVariant.includes(weight)) fontWeightVariant.push(weight)
      }
      if (Object.prototype.hasOwnProperty.call(clsProperties, 'font-style')) {
        let style = clsProperties['font-style']
        style = getValueFromStateVar(themeVars, style)
        if (style && !fontStyleVariant.includes(style)) fontStyleVariant.push(style)
      }
    }
  }
  return [fontWeightVariant, fontStyleVariant]
}

export const updateGoogleFontUrl = () => {
  const styles = getRecoil($styles)
  const themeVars = getRecoil($themeVars)

  const fontWeightparam = []
  let string = ''
  const globalFont = themeVars['--g-font-family']
  const [fontWeightVariant, fontStyleVariant] = findExistingFontStyleNWeidth(styles, themeVars)

  const fontWeightVLen = fontWeightVariant.length
  if (fontWeightVLen > 0) {
    for (let indx = 0; indx < fontWeightVLen; indx += 1) {
      if (fontStyleVariant.includes('italic')) {
        fontWeightparam.push(`1,${fontWeightVariant[indx]};`)
      }
      fontWeightparam.push(`0,${fontWeightVariant[indx]};`)
    }
    const str = fontWeightparam.sort().toString().replaceAll(/;,/gi, ';')
    string = str.substring(0, str.length - 1)
    string = `wght@${string}`
  }

  const url = generateFontUrl(globalFont, string)
  const newStyles = produce(styles, drft => {
    drft.font.fontURL = url
  })
  setRecoil($styles, newStyles)
}

export const arrayToObject = (arr) => Object.keys(arr).map(item => ({ label: arr[item], value: String(arr[item]) }))

export const isFieldOverrideStyles = (styles, fldKey) => styles?.fields?.[fldKey]?.overrideGlobalTheme?.length > 0

export const isLabelOverrideStyles = (styles, fldKey, lblName) => styles?.fields?.[fldKey]?.overrideGlobalTheme?.includes(lblName)

export const isValidURL = (string) => {
  const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)
  return (res !== null)
}

export const getValueFromStateVar = (stateObj, val) => {
  if (val && val.match(/(var)/g)?.[0] === 'var') {
    const getVarProperty = val.replaceAll(/\(|var|,.*|\)|(!important|\s)/gi, '')
    return stateObj[getVarProperty] || ''
  }
  return val
}

export const setIconFilterValue = (iconType, fldKey) => {
  const styles = getRecoil($styles)
  const themeColors = getRecoil($themeColors)
  const elementKey = styleClasses[iconType][0]
  const filterValue = styles?.fields?.[fldKey].classes[`.${fldKey}-${elementKey}`]?.filter
  const themeVal = getValueFromStateVar(themeColors, filterValue)
  if (!themeVal) {
    const parentElement = getIconsParentElement(iconType)
    const parentColor = styles?.fields?.[fldKey].classes[`.${fldKey}-${parentElement}`]?.color
    if (parentColor && parentColor.indexOf('var') >= 0) {
      const parentThemeVal = getValueFromStateVar(themeColors, parentColor)
      if (parentThemeVal) {
        const valArr = parentThemeVal.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
        const hexValue = hslToHex(valArr[0], valArr[1], valArr[2])
        const setFilterValue = hexToCSSFilter(hexValue)
        const newThemeColors = produce(themeColors, drft => {
          drft[getIconsGlobalFilterVariable(iconType)] = setFilterValue.filter
        })
        setRecoil($themeColors, newThemeColors)
      }
    } else if (parentColor) {
      const valArr = parentColor.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
      const hexValue = hslToHex(valArr[0], valArr[1], valArr[2])
      const setFilterValue = hexToCSSFilter(hexValue)
      const newStyles = produce(styles, drftStyles => {
        drftStyles.fields[fldKey].classes[`.${fldKey}-${elementKey}`].filter = setFilterValue.filter
        if (!checkExistElmntInOvrdThm(drftStyles.fields[fldKey], elementKey)) {
          drftStyles.fields[fldKey].overrideGlobalTheme = [...styles.fields[fldKey].overrideGlobalTheme, elementKey]
        }
      })
      setRecoil($styles, newStyles)
    } else {
      const setFilterValue = hexToCSSFilter('#000000')
      const newStyles = produce(styles, drftStyles => {
        drftStyles.fields[fldKey].classes[`.${fldKey}-${elementKey}`].filter = setFilterValue.filter
        if (!checkExistElmntInOvrdThm(drftStyles.fields[fldKey], elementKey)) {
          drftStyles.fields[fldKey].overrideGlobalTheme = [...styles.fields[fldKey].overrideGlobalTheme, elementKey]
        }
      })
      setRecoil($styles, newStyles)
    }
  }
}

export const isStyleExist = (styles, fieldKey, classKey) => {
  if (styles.fields[fieldKey].classes[`.${fieldKey}-${classKey}`]) return true
  return false
}

/**
 * @function paddingGenerator
 * @description This funcaiton generate padding for add or remove padding by icon position
 * @param {String} padding : {Padding String};
 * @param {String} pos {Add Icon left or right positon in input field};
 * @param {true|false} add {When padding add param value true or remove param value false }
 * @return Padding String
 */
export const paddingGenerator = (padding, pos, add) => {
  let checkImportant = false
  let values
  if (padding === '') values = '10px'
  if (padding.match(/(!important)/gi)) {
    values = (padding.replaceAll(/(!important)/gi, '')).trim().split(' ')
    checkImportant = true
  } else {
    values = (padding.replaceAll(/(!important)/gi, '')).trim().split(' ')
  }
  const valuesLan = values.length
  const val = add ? '40px' : values[0]
  switch (valuesLan) {
    case 1:
      if (pos === 'left') {
        values = [values[0], values[0], values[0], val]
      } else {
        values = [values[0], val, values[0], values[0]]
      }
      break
    case 2:
      if (pos === 'left') {
        values = [values[0], values[1], values[0], val]
      } else {
        values = [values[0], val, values[0], values[1]]
      }
      break
    case 3:
      if (pos === 'left') {
        values = [values[0], values[1], values[2], val]
      } else {
        values = [values[0], val, values[2], values[1]]
      }
      break
    case 4:
      if (pos === 'left') {
        values = [values[0], values[1], values[2], val]
      } else {
        values = [values[0], val, values[2], values[3]]
      }
      break
    default:
      break
  }

  if (checkImportant) values[4] = '!important'

  return values.join(' ')
}

export const sortArrOfObjByMultipleProps = (props = []) => {
  const l = props.length

  return (a, b) => {
    for (let i = 0; i < l; i += 1) {
      const o = props[i]
      if (a[o] > b[o]) return 1
      if (a[o] < b[o]) return -1
    }
    return 0
  }
}

export const lowerCaseAllAndReplaceSpaceToHipen = (str) => str.toLowerCase().replace(/ /g, '-')

export const styleToGradientObj = (styleStr) => {
  // get linera or radial type from style string
  const type = styleStr?.match(/^(linear|radial)/g) || false

  // get numbers/values from style string
  const values = styleStr?.match(/-?[\d\.]+/g) || []

  const len = values.length
  let degree = 0
  let points = [{
    left: 0,
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1,
  },
  {
    left: 100,
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
  }]

  if (!type) {
    return {
      degree,
      type: 'liner',
      points,
    }
  }
  points = []

  if (type[0] === 'linear') {
    [degree] = len > 5 ? values : [0]
    for (let i = 1; i < len; i += 5) {
      points.push({
        red: values[i],
        green: values[i + 1],
        blue: values[i + 2],
        alpha: values[i + 3],
        left: values[i + 4],
      })
    }
  } else if (type[0] === 'radial') {
    for (let i = 0; i < len; i += 5) {
      points.push({
        red: values[i],
        green: values[i + 1],
        blue: values[i + 2],
        alpha: values[i + 3],
        left: values[i + 4],
      })
    }
  }

  const gardient = {
    degree,
    type: type[0],
    points,
  }
  return gardient
}

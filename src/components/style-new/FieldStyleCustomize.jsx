/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { memo, useEffect } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $fields, $flags } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import { assignNestedObj, deleteNestedObj } from '../../Utils/FormBuilderHelper'
import { getElmDataBasedOnElement } from '../../Utils/Helpers'
import fieldsTypes from '../../Utils/StaticData/fieldTypes'
import { getElementTitle } from '../../Utils/StaticData/IndividualElementTitle'
import SingleToggle from '../Utilities/SingleToggle'
import FieldQuickTweaks from './FieldQuickTweaks'
import IndividualCustomStyle from './IndividualCustomStyle'
import editorConfig from './NewStyleEditorConfig'
import bitformDefaultTheme from './themes/1_bitformDefault'

export default function FieldStyleCustomizeHOC() {
  const { formType, formID, fieldKey, element } = useParams()
  const styles = useRecoilValue($styles)

  if (!styles?.fields?.[fieldKey]) { console.error('no style object found according to this field'); return <>No Field</> }
  return <FieldStyleCustomize {...{ formType, formID, fieldKey, element }} />
}
const FieldStyleCustomize = memo(({ formType, formID, fieldKey, element }) => {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const setFlags = useSetRecoilState($flags)
  const fields = useRecoilValue($fields)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, theme } = fldStyleObj

  const isFieldElemetOverrided = fldStyleObj?.overrideGlobalTheme?.includes(element)
  const getPath = (elementKey, state = '') => `fields->${fieldKey}->classes->.${fieldKey}-${elementKey}${state}`

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    return () => { setFlags(oldFlgs => ({ ...oldFlgs, styleMode: false })) }
  }, [])

  const deleteStyle = (drft, elemnt, state = '') => {
    const hoverStyle = drft.fields[fieldKey].classes[`.${fieldKey}-${elemnt}${state}`]
    if (hoverStyle) deleteNestedObj(drft, getPath(elemnt, state))
  }

  const title = getElementTitle(element)

  const overrideGlobalThemeHandler = ({ target: { checked } }, elmnt) => {
    if (theme === 'material') return
    if (checked) {
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.fields[fieldKey].overrideGlobalTheme = [...prvStyle.fields[fieldKey].overrideGlobalTheme, elmnt]
      }))
    } else {
      setStyles(prvStyle => produce(prvStyle, drft => {
        const prvElmnt = [...prvStyle.fields[fieldKey].overrideGlobalTheme]
        prvElmnt.splice(prvElmnt.findIndex(el => el === elmnt), 1)
        drft.fields[fieldKey].overrideGlobalTheme = prvElmnt

        if (theme === 'bitformDefault') {
          const { classes: getElementStyleClasses } = bitformDefaultTheme(fieldKey, fieldType)

          switch (elmnt) {
            case 'field-container':
              const fldwrp = getElementStyleClasses[`.${fieldKey}-fld-wrp`]
              assignNestedObj(drft, getPath('fld-wrp'), fldwrp)
              deleteStyle(drft, 'fld-wrp', ':hover')
              break

            case 'label-subtitle-container':
              const lblwrp = getElementStyleClasses[`.${fieldKey}-lbl-wrp`]
              assignNestedObj(drft, getPath('lbl-wrp'), lblwrp)
              deleteStyle(drft, 'lbl-wrp', ':hover')
              break

            case 'label':
              const lbl = getElementStyleClasses[`.${fieldKey}-lbl`]
              assignNestedObj(drft, getPath('lbl'), lbl)
              deleteStyle(drft, 'lbl', ':hover')
              break

            case 'subtitle':
              const subtitle = getElementStyleClasses[`.${fieldKey}-sub-titl`]
              assignNestedObj(drft, getPath('sub-titl'), subtitle)
              deleteStyle(drft, 'sub-titl', ':hover')
              break

            case 'helper-text':
              const hlptxt = getElementStyleClasses[`.${fieldKey}-hlp-txt`]
              assignNestedObj(drft, getPath('hlp-txt'), hlptxt)
              deleteStyle(drft, 'hlp-txt', ':hover')
              break

            case 'error-message':
              const errMsg = getElementStyleClasses[`.${fieldKey}-err-msg`]
              assignNestedObj(drft, getPath('err-msg'), errMsg)
              deleteStyle(drft, 'err-msg', ':hover')
              break

            case 'currency-fld-wrp':
            case 'phone-fld-wrp':
              const curcyFldWrp = getElementStyleClasses[`.${fieldKey}-${elmnt}`]
              const curcyFldWrpHover = getElementStyleClasses[`.${fieldKey}-${elmnt}:hover:not(.${fieldKey}-menu-open, .${fieldKey}-disabled)`]
              const curcyFldWrpFocus = getElementStyleClasses[`.${fieldKey}-${elmnt}:focus-within:not(.${fieldKey}-menu-open, .${fieldKey}-disabled)`]
              assignNestedObj(drft, getPath(`${elmnt}`), curcyFldWrp)
              assignNestedObj(drft, getPath(`${elmnt}:hover:not(.${fieldKey}-menu-open, .${fieldKey}-disabled)`), curcyFldWrpHover)
              assignNestedObj(drft, getPath(`${elmnt}:focus-within:not(.${fieldKey}-menu-open, .${fieldKey}-disabled)`), curcyFldWrpFocus)
              break

            case 'selected-currency-img':
            case 'selected-country-img':
              const selectedCurncyImg = getElementStyleClasses[`.${fieldKey}-${elmnt}`]
              assignNestedObj(drft, getPath(elmnt), selectedCurncyImg)
              break

            case 'input-clear-btn':
              const inputClrBtn = getElementStyleClasses[`.${fieldKey}-input-clear-btn`]
              const inputClrBtnHvr = getElementStyleClasses[`.${fieldKey}-input-clear-btn:hover`]
              const inputCltBtnFocus = getElementStyleClasses[`.${fieldKey}-input-clear-btn:focus-visible`]
              assignNestedObj(drft, getPath('input-clear-btn'), inputClrBtn)
              assignNestedObj(drft, getPath('input-clear-btn:hover'), inputClrBtnHvr)
              assignNestedObj(drft, getPath('input-clear-btn:focus-visible'), inputCltBtnFocus)
              break

            case 'opt-search-input':
              const optSearchInput = getElementStyleClasses[`.${fieldKey}-opt-search-input`]
              assignNestedObj(drft, getPath('opt-search-input'), optSearchInput)
              deleteStyle(drft, 'opt-search-input', ':hover')
              deleteStyle(drft, 'opt-search-input', ':focus')
              break

            case 'opt-search-icn':
              const optSearchIcn = getElementStyleClasses[`.${fieldKey}-opt-search-icn`]
              assignNestedObj(drft, getPath('opt-search-icn'), optSearchIcn)
              deleteStyle(drft, 'opt-search-icn', ':hover')
              break

            case 'search-clear-btn':
              const seatchClrBtn = getElementStyleClasses[`.${fieldKey}-search-clear-btn`]
              const searchClrBtnHrv = getElementStyleClasses[`.${fieldKey}-search-clear-btn:hover`]
              const searchClrBtnFocus = getElementStyleClasses[`.${fieldKey}-search-clear-btn:focus-visible`]
              assignNestedObj(drft, getPath('search-clear-btn'), seatchClrBtn)
              assignNestedObj(drft, getPath('search-clear-btn:hover'), searchClrBtnHrv)
              assignNestedObj(drft, getPath('search-clear-btn:focus-visible'), searchClrBtnFocus)
              break

            case 'currency-option':
            case 'phone-option':
              const opt = getElementStyleClasses[`.${fieldKey}-option`]
              const optHovr = getElementStyleClasses[`.${fieldKey}-option:hover:not(.selected-opt)`]
              const optFocus = getElementStyleClasses[`.${fieldKey}-option:focus-visible`]
              assignNestedObj(drft, getPath('option'), opt)
              assignNestedObj(drft, getPath('option:hover:not(.selected-opt)'), optHovr)
              assignNestedObj(drft, getPath('option:focus-visible'), optFocus)
              break

            case 'currency-option-icn':
            case 'phone-option-icn':
              const optIcn = getElementStyleClasses[`.${fieldKey}-opt-icn`]
              assignNestedObj(drft, getPath('opt-icn'), optIcn)
              break

            case 'currency-option-lbl':
            case 'phone-option-lbl':
              const optLbl = getElementStyleClasses[`.${fieldKey}-opt-lbl`]
              assignNestedObj(drft, getPath('opt-lbl'), optLbl)
              break

            case 'currency-option-suf':
              const optSuf = getElementStyleClasses[`.${fieldKey}-opt-suffix`]
              assignNestedObj(drft, getPath('opt-suffix'), optSuf)
              break

            case 'phone-option-prefix':
              const optPrefix = getElementStyleClasses[`.${fieldKey}-opt-prefix`]
              assignNestedObj(drft, getPath('opt-prefix'), optPrefix)
              break

            case 'check-container':
              const cc = getElementStyleClasses[`.${fieldKey}-cc`]
              assignNestedObj(drft, getPath('cc'), cc)
              deleteStyle(drft, 'cc', ':hover')
              break

            case 'option-label':
              const ct = getElementStyleClasses[`.${fieldKey}-ct`]
              assignNestedObj(drft, getPath('ct'), ct)
              deleteStyle(drft, 'ct', ':hover')
              deleteStyle(drft, 'ct', ':focus')
              break

            case 'check-box':
            case 'radio-box':
              const optBox = elmnt === 'check-box' ? 'ck' : 'rdo'
              const ck = getElementStyleClasses[`.${fieldKey}-${optBox}`]
              assignNestedObj(drft, getPath(optBox), ck)
              deleteStyle(drft, optBox, ':hover')
              deleteStyle(drft, optBox, ':focus')
              deleteStyle(drft, optBox, ':checked')
              break

            case 'check-wrapper':
              const cw = getElementStyleClasses[`.${fieldKey}-cw`]
              assignNestedObj(drft, getPath('cw'), cw)
              deleteStyle(drft, 'cw', ':hover')
              break

            case 'option-wrapper':
              const cl = getElementStyleClasses[`.${fieldKey}-cl`]
              assignNestedObj(drft, getPath('cl'), cl)
              deleteStyle(drft, 'cl', ':hover')
              break

            default:
              const keyObj = getElmDataBasedOnElement(elmnt)
              const allDefaltStyle = getElementStyleClasses[`.${fieldKey}-${keyObj.classKey}`] || {}
              assignNestedObj(drft, getPath(keyObj.classKey), allDefaltStyle)
              const states = [...editorConfig[fieldType][keyObj.elementKey].states]
              states?.map(state => {
                const tempDefault = getElementStyleClasses[`.${fieldKey}-${keyObj.classKey}:${state}`]
                if (tempDefault) {
                  assignNestedObj(drft, getPath(`${keyObj.classKey}:${state}`), tempDefault)
                } else {
                  deleteStyle(drft, keyObj.classKey, `:${state}`)
                }
              })
              break
          }
        }
        // if (theme === 'material') {
        //   drft.fields[fieldKey] = materialTheme(fieldKey, fieldType)
        // }
      }))
    }
  }

  const checkExistElement = () => fldStyleObj?.overrideGlobalTheme?.find(el => el === element)

  const renderIndividualCustomStyleComp = () => {
    const { elementKey, classKey } = getElmDataBasedOnElement(element)
    return (
      <div className={css(!checkExistElement(classKey) && cls.blur)}>
        <IndividualCustomStyle elementKey={elementKey} fldKey={fieldKey} />
      </div>
    )
  }
  return (
    <div className={css(cls.mainWrapper)}>
      <span className={css({ flxi: 'center', mt: 10 })}>
        <Link to={`/form/builder/${formType}/${formID}/themes`} className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}>
          <ChevronLeft size="14" />
          {' '}
          Themes /
          {' '}
        </Link>
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Individual Field Style Customize</span>
      </span>
      <h4 className={css(cls.title)}>
        {fieldsTypes[fieldType]}
        {' '}
        {/* {element?.replaceAll('-', ' ')} */}
        {title}
      </h4>
      <div className={css(ut.flxc)}>
        <h5 className={css(cls.subTitle)}>{fields[fieldKey]?.adminLbl}</h5>
        <span title="Field Key" className={css(cls.pill)}>{fieldKey}</span>
      </div>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        {element !== 'quick-tweaks' && (
          <SingleToggle
            title="Override form theme styles"
            action={(e) => overrideGlobalThemeHandler(e, element)}
            isChecked={isFieldElemetOverrided}
            className={css(ut.mr2, ut.mb2)}
          />
        )}

        <div className={css(cls.container)}>
          {element === 'quick-tweaks' && <FieldQuickTweaks fieldKey={fieldKey} />}
          {element !== 'quick-tweaks' && renderIndividualCustomStyleComp()}
        </div>

        {[...Array(20).keys()].map((i) => <br key={`${i}-asd`} />)}
      </div>
    </div>
  )
})

const cls = {
  title: { mt: 5, mb: 2 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  subTitle2: { fs: 14, fw: 500, mt: 10 },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  container: { ml: 12, mr: 15, pn: 'relative' },
  btn: {
    b: 'none',
    oe: 'none',
    brs: 8,
    bc: 'var(--white-0-95)',
    cur: 'pointer',
  },
  pnt: { cur: 'not-allowed' },
  menuItem: {
    ws: 'nowrap',
    fs: 14,
    fw: 500,
    b: 'none',
    bd: 'transparent',
    curp: 1,
    py: 8,
    px: 15,
    brs: 20,
    pn: 'relative',
    ':hover:not([data-active="true"])': { bd: 'var(--b-79-96)' },
  },
  clrActive: {
    bd: 'var(--b-50)',
    cr: 'var(--white-100)',
  },
  con: { py: 10, bb: '0.5px solid var(--white-0-83)' },
  blur: {
    oy: '0.5',
    cur: 'not-allowed',
    bd: 'white',
    zx: 9,
    pe: 'none',
  },
  pill: {
    brs: 8,
    b: '1px solid var(--b-31-44-27)',
    px: 5,
    py: 2,
    bd: 'var(--b-23-95)',
    fw: 500,
  },
}

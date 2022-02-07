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
import fieldsTypes from '../../Utils/StaticData/fieldTypes'
import SingleToggle from '../Utilities/SingleToggle'
import FieldQuickTweaks from './FieldQuickTweaks'
import IndividualCustomStyle from './IndividualCustomStyle'
import IndividualInputFldCustomStyle from './IndividualInputFldCustomStyle'
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

  console.log(styles)

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
          const getElementStyle = bitformDefaultTheme(fieldKey, fieldType)
          switch (elmnt) {
            case 'field-container':
              const fldwrp = getElementStyle.classes[`.${fieldKey}-fld-wrp`]
              assignNestedObj(drft, getPath('fld-wrp'), fldwrp)
              deleteStyle(drft, 'fld-wrp', ':hover')
              break

            case 'label-subtitle-container':
              const lblwrp = getElementStyle.classes[`.${fieldKey}-lbl-wrp`]
              assignNestedObj(drft, getPath('lbl-wrp'), lblwrp)
              deleteStyle(drft, 'lbl-wrp', ':hover')
              break

            case 'label':
              const lbl = getElementStyle.classes[`.${fieldKey}-lbl`]
              assignNestedObj(drft, getPath('lbl'), lbl)
              deleteStyle(drft, 'lbl', ':hover')
              break

            case 'subtitle':
              const subtitle = getElementStyle.classes[`.${fieldKey}-sub-titl`]
              assignNestedObj(drft, getPath('sub-titl'), subtitle)
              deleteStyle(drft, 'sub-titl', ':hover')
              break

            case 'helper-text':
              const hlptxt = getElementStyle.classes[`.${fieldKey}-hlp-txt`]
              assignNestedObj(drft, getPath('hlp-txt'), hlptxt)
              deleteStyle(drft, 'hlp-txt', ':hover')
              break

            case 'fld':
              const fldStyle = getElementStyle.classes[`.${fieldKey}-fld`]
              const hoverFldStyle = getElementStyle.classes[`.${fieldKey}-fld:hover`]
              const focusFldStyle = getElementStyle.classes[`.${fieldKey}-fld:focus`]
              assignNestedObj(drft, getPath('fld'), fldStyle)
              assignNestedObj(drft, getPath('fld', ':hover'), hoverFldStyle)
              assignNestedObj(drft, getPath('fld', ':focus'), focusFldStyle)
              break

            case 'error-message':
              const errMsg = getElementStyle.classes[`.${fieldKey}-err-msg`]
              assignNestedObj(drft, getPath('err-msg'), errMsg)
              deleteStyle(drft, 'err-msg', ':hover')
              break

            default:
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

  const getElmDataBasedOnElement = () => {
    let elementKey = ''
    let classKey = ''
    switch (element) {
      case 'field-container':
        elementKey = 'fld-wrp'
        break
      case 'label-subtitle-container':
        elementKey = 'lbl-wrp'
        break
      case 'label':
        elementKey = 'lbl'
        break
      case 'subtitle':
        elementKey = 'sub-titl'
        break
      case 'helper-text':
        elementKey = 'hlp-txt'
        break
      case 'error-message':
        classKey = 'err-msg'
        elementKey = 'err-msg'
        break
      default:
        elementKey = ''
        classKey = ''
    }

    return { elementKey, classKey }
  }

  const renderIndividualCustomStyleComp = () => {
    const { elementKey, classKey } = getElmDataBasedOnElement()
    return (
      <div className={css(!checkExistElement(classKey || element) && cls.blur)}>
        <IndividualCustomStyle elementKey={elementKey || element} fldKey={fieldKey} />
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
        {element?.replaceAll('-', ' ')}
      </h4>
      <div className={css(ut.flxc)}>
        <h5 className={css(cls.subTitle)}>{fields[fieldKey].adminLbl}</h5>
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

          {element !== 'quick-tweaks' && element !== 'fld' && renderIndividualCustomStyleComp(element, 'fld-wrp', 'field-container')}

          {element === 'fld' && (
            <div className={css(!checkExistElement(element) && cls.blur)}>
              <IndividualInputFldCustomStyle elementKey={element} fldKey={fieldKey} />
            </div>
          )}
          {element === 'bg-img' && (
            <h2>background image</h2>
            // <div className={css(!checkExistElement(element) && cls.blur)}>
            //   <IndividualInputFldCustomStyle elementKey={element} fldKey={fieldKey} />
            // </div>
          )}
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

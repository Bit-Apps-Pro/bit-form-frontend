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
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import fieldsTypes from '../../Utils/StaticData/fieldTypes'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import FieldQuickTweaks from './FieldQuickTweaks'
import IndividualCustomStyle from './IndividualCustomStyle'
import IndividualInputFldCustomStyle from './IndividualInputFldCustomStyle'
import { getNumFromStr, getStrFromStr } from './styleHelpers'
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
  const themeVars = useRecoilValue($themeVars)
  const fields = useRecoilValue($fields)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, classes, theme } = fldStyleObj

  const isFieldElemetOverrided = fldStyleObj?.overrideGlobalTheme.includes(element)

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    return () => { setFlags(oldFlgs => ({ ...oldFlgs, styleMode: false })) }
  }, [])

  const getValueFromThemeVar = (val) => {
    if (val?.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }
  const updateFontSize = (unit, value, elemn) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fieldKey].classes[`.${fieldKey}-${elemn}`]['font-size'] = `${value}${unit}`
    }))
  }

  // sub title
  const subtitl = classes?.[`.${fieldKey}-sub-titl`]?.['font-size']
  const subTitlFs = getValueFromThemeVar(subtitl)
  const subtitlFsHandler = ({ unit, value }) => {
    updateFontSize(unit, value, 'sub-titl')
  }
  const subTitlFSValue = getNumFromStr(subTitlFs)
  const subTitlFSUnit = getStrFromStr(subTitlFs)

  // heplper text
  const hplTxtFs = classes?.[`.${fieldKey}-hlp-txt`]?.['font-size']
  const hplTxtfsvalue = getValueFromThemeVar(hplTxtFs)
  const hlpTxtFsHandler = ({ unit, value }) => {
    updateFontSize(unit, value, 'hlp-txt')
  }
  const hplTxtFSValue = getNumFromStr(hplTxtfsvalue)
  const hplTxtFSUnit = getStrFromStr(hplTxtfsvalue)

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
          if (elmnt === 'field-container') {
            const getStyle = getElementStyle.classes[`.${fieldKey}-fld-wrp`]
            drft.fields[fieldKey].classes[`.${fieldKey}-fld-wrp`] = getStyle
          } else if (elmnt === 'label-subtitle-container') {
            const getStyle = getElementStyle.classes[`.${fieldKey}-lbl-wrp`]
            drft.fields[fieldKey].classes[`.${fieldKey}-lbl-wrp`] = getStyle
          } else if (elmnt === 'label') {
            const getStyle = getElementStyle.classes[`.${fieldKey}-lbl`]
            drft.fields[fieldKey].classes[`.${fieldKey}-lbl`] = getStyle
          } else if (elmnt === 'subtitle') {
            const getStyle = getElementStyle.classes[`.${fieldKey}-sub-titl`]
            drft.fields[fieldKey].classes[`.${fieldKey}-sub-titl`] = getStyle
          } else if (elmnt === 'helper-text') {
            const getStyle = getElementStyle.classes[`.${fieldKey}-hlp-txt`]
            drft.fields[fieldKey].classes[`.${fieldKey}-hlp-txt`] = getStyle
          }
        }
        // if (theme === 'material') {
        //   drft.fields[fieldKey] = materialTheme(fieldKey, fieldType)
        // }
      }))
    }
  }
  // console.log({ fldStyleObj, element, isFieldElemetOverrided })

  console.log('element', element)

  const checkExistElement = () => fldStyleObj?.overrideGlobalTheme?.find(el => el === element)

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

          {element === 'field-container' && (
            <div className={css(!checkExistElement('field-container') && cls.blur)}>
              <IndividualCustomStyle elementKey="fld-wrp" fldKey={fieldKey} />
            </div>
          )}
          {element === 'label-subtitle-container' && (
            <div className={css(!checkExistElement('label-subtitle-container') && cls.blur)}>
              <IndividualCustomStyle elementKey="lbl-wrp" fldKey={fieldKey} />
            </div>
          )}
          {element === 'label' && (
            <div className={css(!checkExistElement('label') && cls.blur)}>
              <IndividualCustomStyle elementKey="lbl" fldKey={fieldKey} />
            </div>
          )}
          {element === 'subtitle' && (
            <div className={css(!checkExistElement('subtitle') && cls.blur)}>
              <IndividualCustomStyle elementKey="sub-titl" fldKey={fieldKey} />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>Font Size</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={subtitlFsHandler}
                    sizeHandler={({ unitKey, unitValue }) => subtitlFsHandler({ unit: unitKey, value: unitValue })}
                    value={subTitlFSValue}
                    unit={subTitlFSUnit}
                    width="110px"
                    options={['px', 'em', 'rem']}
                    id="font-size-control"
                  />
                </div>
              </div>
            </div>
          )}
          {element === 'helper-text' && (
            <div className={css(!checkExistElement('helper-text') && cls.blur)}>
              <IndividualCustomStyle elementKey="hlp-txt" fldKey={fieldKey} />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>Font Size</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={hlpTxtFsHandler}
                    sizeHandler={({ unitKey, unitValue }) => hlpTxtFsHandler({ unit: unitKey, value: unitValue })}
                    value={hplTxtFSValue}
                    unit={hplTxtFSUnit}
                    width="110px"
                    options={['px', 'em', 'rem']}
                    id="font-size-control"
                  />
                </div>
              </div>
            </div>
          )}

          {element === 'pre-i' && (
            <div className={css(!checkExistElement(element) && cls.blur)}>
              <IndividualCustomStyle elementKey={element} fldKey={fieldKey} />
            </div>
          )}
          {element === 'fld' && (
            <div className={css(!checkExistElement(element) && cls.blur)}>
              <IndividualInputFldCustomStyle elementKey={element} fldKey={fieldKey} />
            </div>
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

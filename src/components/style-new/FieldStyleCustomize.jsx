/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $flags, $styles, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { getNumFromStr, getStrFromStr } from './styleHelpers'
import bitformDefaultTheme from './themes/1_bitformDefault'

export default function FieldStyleCustomize() {
  const { css } = useFela()
  const { formType, formID, fldKey, element } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  const setFlags = useSetRecoilState($flags)
  const themeVars = useRecoilValue($themeVars)

  const fldStyleObj = styles?.fields?.[fldKey]
  const { fieldType, classes, theme } = fldStyleObj

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    return () => { setFlags(oldFlgs => ({ ...oldFlgs, styleMode: false })) }
  }, [])

  const fldWrpStyle = classes[`.${fldKey}-fld-wrp`]
  const labelSubTitlStyle = classes[`.${fldKey}-lbl-wrp`]
  const lblStyle = classes[`.${fldKey}-lbl`]
  const subtitlStyle = classes[`.${fldKey}-sub-titl`]
  const hlpTxtStyle = classes[`.${fldKey}-hlp-txt`]

  const getValueFromThemeVar = (val) => {
    if (val.match(/var/g)?.[0] === 'var') {
      const getVarProperty = val.replaceAll(/\(|var|,.*|\)/gi, '')
      return themeVars[getVarProperty]
    }
    return val
  }
  const uddateFontSize = (unit, value, elemn) => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-${elemn}`]['font-size'] = `${value}${unit}`
    }))
  }
  // for font-size
  const fldLblfs = classes[`.${fldKey}-lbl`]?.['font-size']
  const fldLblfsvalue = getValueFromThemeVar(fldLblfs)
  const fldFsHandler = ({ unit, value }) => {
    uddateFontSize(unit, value, 'lbl')
  }
  const fldFSValue = getNumFromStr(fldLblfsvalue)
  const fldFSUnit = getStrFromStr(fldLblfsvalue)

  // sub title
  const subtitl = classes[`.${fldKey}-sub-titl`]?.['font-size']
  const subTitlFs = getValueFromThemeVar(subtitl)
  const subtitlFsHandler = ({ unit, value }) => {
    uddateFontSize(unit, value, 'sub-titl')
  }
  const subTitlFSValue = getNumFromStr(subTitlFs)
  const subTitlFSUnit = getStrFromStr(subTitlFs)

  // heplper text
  const hplTxtFs = classes[`.${fldKey}-hlp-txt`]?.['font-size']
  const hplTxtfsvalue = getValueFromThemeVar(hplTxtFs)
  const hlpTxtFsHandler = ({ unit, value }) => {
    uddateFontSize(unit, value, 'hlp-txt')
  }
  const hplTxtFSValue = getNumFromStr(hplTxtfsvalue)
  const hplTxtFSUnit = getStrFromStr(hplTxtfsvalue)

  const overrideGlobalThemeHandler = (e, elmnt) => {
    const { target: { checked } } = e

    if (theme === 'material') return
    if (checked) {
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.fields[fldKey].overrideGlobalTheme = [...prvStyle.fields[fldKey].overrideGlobalTheme, elmnt]
      }))
    } else {
      setStyles(prvStyle => produce(prvStyle, drft => {
        const prvElmnt = [...prvStyle.fields[fldKey].overrideGlobalTheme]
        prvElmnt.splice(prvElmnt.findIndex(el => el === elmnt), 1)
        drft.fields[fldKey].overrideGlobalTheme = prvElmnt

        if (theme === 'bitformDefault') {
          const getElementStyle = bitformDefaultTheme(fldKey, fieldType)
          if (elmnt === 'field-container') {
            const getStyle = getElementStyle.classes[`.${fldKey}-fld-wrp`]
            drft.fields[fldKey].classes[`.${fldKey}-fld-wrp`] = getStyle
          } else if (elmnt === 'label-subtitle-container') {
            const getStyle = getElementStyle.classes[`.${fldKey}-lbl-wrp`]
            drft.fields[fldKey].classes[`.${fldKey}-lbl-wrp`] = getStyle
          } else if (elmnt === 'label') {
            const getStyle = getElementStyle.classes[`.${fldKey}-lbl`]
            drft.fields[fldKey].classes[`.${fldKey}-lbl`] = getStyle
          } else if (elmnt === 'subtitle') {
            const getStyle = getElementStyle.classes[`.${fldKey}-sub-titl`]
            drft.fields[fldKey].classes[`.${fldKey}-sub-titl`] = getStyle
          } else if (elmnt === 'helper-text') {
            const getStyle = getElementStyle.classes[`.${fldKey}-hlp-txt`]
            drft.fields[fldKey].classes[`.${fldKey}-hlp-txt`] = getStyle
          }
        }
        // if (theme === 'material') {
        //   drft.fields[fldKey] = materialTheme(fldKey, fieldType)
        // }
      }))
    }
  }

  const colorObj = (elemnt, cssProperty) => (
    {
      fk: fldKey,
      selector: `.${fldKey}-${elemnt}`,
      property: cssProperty,
    }
  )
  const fldWrpBg = colorObj('fld-wrp', 'background')
  const fldWrpColor = colorObj('fld-wrp', 'color')
  const lblWrpBg = colorObj('lbl-wrp', 'background')
  const lblWrpColor = colorObj('lbl-wrp', 'color')
  const lblBg = colorObj('lbl', 'background')
  const lblColor = colorObj('lbl', 'color')
  const subTitlBg = colorObj('sub-titl', 'background')
  const subTitlColor = colorObj('sub-titl', 'color')
  const hlpTxtBg = colorObj('hlp-txt', 'background')
  const hlpTxtColor = colorObj('hlp-txt', 'color')

  const spacingObj = (ele) => (
    {
      object: 'fieldStyle',
      paths: {
        fk: fldKey,
        selector: `.${fldKey}-${ele}`,
        margin: 'margin',
        padding: 'padding',
      },
    }
  )

  const fldWrpSpacing = spacingObj('fld-wrp')
  const labelWrp = spacingObj('lbl-wrp')
  const lbl = spacingObj('lbl')
  const subtitle = spacingObj('sub-titl')
  const hlpTxt = spacingObj('hlp-txt')

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
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      </span>
      <h4 className={css(cls.title)}>Theme Customize</h4>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        {/* <h4 className={css(cls.subTitle)}>Color Scheme</h4>
        <div className={css(ut.flxcb, ut.w9, ut.mt1)}>
          <button onClick={handlecolorScheme} name="light" data-active={colorScheme === 'light'} className={css(cls.menuItem, colorScheme === 'light' && cls.clrActive)} type="button">Light</button>
          <button onClick={handlecolorScheme} name="dark" data-active={colorScheme === 'dark'} className={css(cls.menuItem, colorScheme === 'dark' && cls.clrActive)} type="button">Dark</button>
          <button onClick={handlecolorScheme} name="high-contrast" data-active={colorScheme === 'high-contrast'} className={css(cls.menuItem, colorScheme === 'high-contrast' && cls.clrActive)} type="button">High Contrast</button>
        </div>
        <div className={css(cls.divider)} /> */}

        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <span>
          Override Global Theme Color
          {' '}
          <input
            type="checkbox"
            onChange={(e) => overrideGlobalThemeHandler(e, element)}
            checked={fldStyleObj?.overrideGlobalTheme?.find(el => el === element) || false}
            aria-label="default Theme Color"
          />
        </span>

        <div className={css(cls.container)}>
          {element === 'field-container' && (
            <div className={css(!checkExistElement('field-container') && cls.blur)}>
              <SimpleColorPicker
                title="Background Color"
                subtitle="Background Color"
                stateName="themeVars"
                value={fldWrpStyle?.background}
                modalType="individul-color"
                modalId="field-container-backgroung"
                objectPaths={fldWrpBg}
              />
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                stateName="themeVars"
                value={fldWrpStyle?.color}
                modalType="individul-color"
                modalId="field-container-color"
                objectPaths={fldWrpColor}
              />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={fldWrpSpacing} id="spacing-control" />
              </div>
            </div>
          )}

          {element === 'label-subtitle-container' && (
            <div className={css(!checkExistElement('label-subtitle-container') && cls.blur)}>
              <SimpleColorPicker
                title="Background Color"
                subtitle="Background Color"
                stateName="themeVars"
                value={labelSubTitlStyle?.background}
                modalType="individul-color"
                modalId="label-subtitle-container-backgroung"
                objectPaths={lblWrpBg}
              />
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                stateName="themeVars"
                value={labelSubTitlStyle?.color}
                modalType="individul-color"
                modalId="label-subtitle-container-color"
                objectPaths={lblWrpColor}
              />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={labelWrp} id="label-subtitle-spacing-control" />
              </div>
            </div>
          )}
          {element === 'label' && (
            <div className={css(!checkExistElement('label') && cls.blur)}>
              <SimpleColorPicker
                title="Background Color"
                subtitle="Background Color"
                stateName="themeVars"
                value={lblStyle?.background}
                modalType="individul-color"
                modalId="label-container-backgroung"
                objectPaths={lblBg}
              />
              <SimpleColorPicker
                title="Color"
                subtitle="Color"
                stateName="themeVars"
                value={lblStyle?.color}
                modalType="individul-color"
                modalId="label-container-color"
                objectPaths={lblColor}
              />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>Field Font Size</span>
                <div className={css(ut.flxc)}>
                  <SizeControl
                    inputHandler={fldFsHandler}
                    sizeHandler={({ unitKey, unitValue }) => fldFsHandler({ unit: unitKey, value: unitValue })}
                    value={fldFSValue}
                    unit={fldFSUnit}
                    width="110px"
                    options={['px', 'em', 'rem']}
                    id="font-size-control"
                  />
                </div>
              </div>

              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={lbl} id="spacing-control" />
              </div>
            </div>
          )}
          {element === 'subtitle' && (
            <div className={css(!checkExistElement('subtitle') && cls.blur)}>
              <div className={css(ut.flxcb, ut.mt2)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
                </div>
                <SimpleColorPicker value={subtitlStyle?.background} action={{ type: 'individul-color' }} subtitle="Primary color" objectPaths={subTitlBg} id="label-container-backgroung" />
              </div>

              <div className={css(ut.flxcb, ut.mt2)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(ut.fw500)}>{__('Color', 'bitform')}</span>
                </div>
                <SimpleColorPicker value={subtitlStyle?.color} action={{ type: 'individul-color' }} subtitle="Primary color" objectPaths={subTitlColor} id="label-container-color" />
              </div>
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
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={subtitle} id="spacing-control" />
              </div>
            </div>
          )}
          {element === 'helper-text' && (
            <div className={css(!checkExistElement('helper-text') && cls.blur)}>
              <div className={css(ut.flxcb, ut.mt2)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
                </div>
                <SimpleColorPicker value={hlpTxtStyle?.background} action={{ type: 'individul-color' }} subtitle="Primary color" objectPaths={hlpTxtBg} id="label-container-backgroung" />
              </div>

              <div className={css(ut.flxcb, ut.mt2)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(ut.fw500)}>{__('Color', 'bitform')}</span>
                </div>
                <SimpleColorPicker value={hlpTxtStyle?.color} action={{ type: 'individul-color' }} subtitle="Primary color" objectPaths={hlpTxtColor} id="label-container-color" />
              </div>
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
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={hlpTxt} id="spacing-control" />
              </div>
            </div>
          )}
        </div>
        <div className={css(cls.divider)} />

        {[...Array(20).keys()].map((i) => <br key={`${i}-asd`} />)}
      </div>
    </div>
  )
}

// const MenuItem = ({ label, onClick, name }) => {
//   const { css } = useFela()
//   return <button onClick={onClick} name={name} className={css(cls.menuItem)} type="button">{label}</button>
// }

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
    // fr: 'blur(1px)',
    oy: '0.2',
    bd: 'radial-gradient(white, transparent)',
    zx: 9,
    pnevn: 'none',
  },
}

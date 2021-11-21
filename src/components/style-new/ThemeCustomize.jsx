/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { $styles, $tempThemeVars, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import UndoIcon from '../../Icons/UndoIcon'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import FieldMarginControl from './FieldMarginControl'
import FieldWrapperControl from './FieldWrapperControl'
import FontPicker from './FontPicker'
import FormWrapperControl from './FormWrapperControl'
import LabelControl from './LabelControl'
import LabelSpacingControl from './LabelSpacingControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { changeFormDir, CommonStyle, getNumFromStr, getStrFromStr, unitConverterHelper } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const setStyles = useSetRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempThemeVars = useRecoilValue($tempThemeVars)
  const [activeAccordion, setActiveAccordion] = useState()
  const { '--fw-m': wrpMagin, '--fw-p': wrpPadding } = themeVars

  const { '--global-primary-color': globalPrimaryColor,
    '--dir': direction,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--g-bdr-rad': globalBorderRad,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgClr,
    '--fld-fs': fldFs,
    '--g-bdr-width': globalBdrWidth,
    '--fw-bg': globalfldWrpBg,
    '--st-bg': stBg,
    '--fl-bg': flBg,
    '--fl-c': flc } = themeVars

  const globalBdrRadValue = getNumFromStr(globalBorderRad)
  const globalBdrRadUnit = getStrFromStr(globalBorderRad)

  const globalBdrWidthVal = getNumFromStr(globalBdrWidth)
  const globalBdrWidthUnit = getStrFromStr(globalBdrWidth)

  const fldFSValue = getNumFromStr(fldFs)
  const fldFSUnit = getStrFromStr(fldFs)
  // const [h,s,l/]
  // const globalPrimaryColor = ['--global-primary-color']
  // const direction = styles.themeVars['--dir']
  // console.log()

  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
  }

  const borderRadHandler = ({ value, unit }) => {
    const convertvalue = unitConverterHelper(unit, value, globalBdrRadUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft['--g-bdr-rad'] = `${convertvalue}${unit || globalBdrRadUnit}`
    }))
  }

  const borderWidthHandler = ({ value, unit }) => {
    const convertvalue = unitConverterHelper(unit, value, globalBdrWidthUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft['--g-bdr-width'] = `${convertvalue}${unit || globalBdrWidthUnit}`
    }))
  }

  const fldFsSizeHandler = ({ value, unit }) => {
    const convertvalue = unitConverterHelper(unit, value, fldFSUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft['--fld-fs'] = `${convertvalue}${unit || fldFSUnit}`
    }))
  }

  const undoColor = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[value] = tempThemeVars[value]
    }))
  }

  const undoHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || '0px'
    }))
  }

  const setSizes = ({ target: { value } }) => {
    const tmpThemeVar = deepCopy(themeVars)

    setStyles(prvStyle => produce(prvStyle, drft => {
      const flds = prvStyle.fields
      const fldKeyArr = Object.keys(flds)
      const fldKeyArrLen = fldKeyArr.length

      for (let i = 0; i < fldKeyArrLen; i += 1) {
        const fldKey = fldKeyArr[i]
        const commonStyles = CommonStyle(fldKeyArr[i], value)
        const commonStylClasses = Object.keys(commonStyles)

        const fldClassesObj = flds[fldKey].classes
        const fldClasses = Object.keys(fldClassesObj)

        const commonStylClassesLen = commonStylClasses.length
        for (let indx = 0; indx < commonStylClassesLen; indx += 1) {
          const comnStylClass = commonStylClasses[indx]

          if (fldClassesObj.hasOwnProperty(comnStylClass)) {
            const mainStlProperties = fldClassesObj[comnStylClass]
            const comStlProperties = commonStyles[comnStylClass]
            const comnStlPropertiesKey = Object.keys(comStlProperties)

            const comnStlPropertiesKeyLen = comnStlPropertiesKey.length
            for (let popIndx = 0; popIndx < comnStlPropertiesKeyLen; popIndx += 1) {
              const comnStlProperty = comnStlPropertiesKey[popIndx]

              if (mainStlProperties.hasOwnProperty(comnStlProperty)) {
                const mainStlVal = mainStlProperties[comnStlProperty]
                const comStlVal = comStlProperties[comnStlProperty]
                if (mainStlVal === comStlVal) {
                  continue
                }
                if (mainStlVal?.match(/var/gi)?.[0] === 'var') {
                  const mainStateVar = mainStlVal.replaceAll(/\(|var|!important|,.*|\)/gi, '')
                  tmpThemeVar[mainStateVar] = comStlVal
                  continue
                }
                if (!mainStlVal?.match(/var/gi)?.[0]) {
                  drft.fields[fldKey].classes[fldClasses[indx]][comnStlProperty] = comStlVal
                }
              }
            }
          }
        }
      }
    }))

    setThemeVars(tmpThemeVar)
  }

  const openHandler = (value) => {
    setActiveAccordion(value)
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
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      </span>
      <h4 className={css(cls.title)}>Theme Customize</h4>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <div className={css(cls.container)}>
          <div className={css(cls.subTitle2)}>Colors</div>

          <ScrollMenu>
            <MenuItem itemId={1} label="Default" />
            <MenuItem itemId={2} label="Default" />
            <MenuItem itemId={3} label="Default" />
          </ScrollMenu>

          <div className={css(ut.flxcb)}>
            <div className={css(ut.flxb)}>
              <span className={css(ut.fw500)}>Background Color</span>
              {
                tempThemeVars['--global-bg-color'] && (
                  <button onClick={() => undoColor('--global-bg-color')} className={css(cls.btn, ut.mr1)} type="button">
                    <UndoIcon size="20" />
                  </button>
                )
              }
            </div>
            <SimpleColorPicker value={globalBgColor} action={{ type: 'global-bg-color' }} subtitle="Background color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Primary Color</span>
              {
                tempThemeVars['--global-primary-color'] && (
                  <button onClick={() => undoColor('--global-primary-color')} className={css(cls.btn, ut.mr1)} type="button">
                    <UndoIcon size="20" />
                  </button>
                )
              }
            </div>
            <SimpleColorPicker value={globalPrimaryColor} action={{ type: 'global-primary-color' }} subtitle="Primary color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
              {
                tempThemeVars['--global-font-color'] && (
                  <button onClick={() => undoColor('--global-font-color')} className={css(cls.btn, ut.mr1)} type="button">
                    <UndoIcon size="20" />
                  </button>
                )
              }
            </div>
            <SimpleColorPicker value={globalFontColor} action={{ type: 'global-font-color' }} />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Border Color</span>
              {
                tempThemeVars['--global-fld-bdr-color'] && (
                  <button onClick={() => undoColor('--global-fld-bdr-color')} className={css(cls.btn, ut.mr1)} type="button">
                    <UndoIcon size="20" />
                  </button>
                )
              }
            </div>
            <SimpleColorPicker value={globalFldBdrClr} action={{ type: 'global-fld-bdr-color' }} subtitle="Border Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Field Background Color</span>
              {
                tempThemeVars['--global-fld-bg-color'] && (
                  <button onClick={() => undoColor('--global-fld-bg-color')} className={css(cls.btn, ut.mr1)} type="button">
                    <UndoIcon size="20" />
                  </button>
                )
              }
            </div>
            <SimpleColorPicker value={globalFldBgClr} action={{ type: 'global-fld-bg-color' }} subtitle="Field Background Color" />
          </div>
        </div>

        <div className={css(cls.divider)} />

        <div className={css({ mr: 15 })}>
          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Font Family</span>
            <FontPicker />
          </div>

          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
            <SingleToggle isChecked={direction === 'rtl'} action={handleDir} />
          </div>

          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Label Alignment</span>
            <LabelControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Label Spacing</span>
            <LabelSpacingControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Field Margin</span>
            <FieldMarginControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Field Wrapper Control</span>
            <FieldWrapperControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Form Wrapper Control</span>
            <FormWrapperControl />
          </div>
        </div>

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Border Radius</span>
          {
            tempThemeVars['--g-bdr-rad'] && (
              <button onClick={() => undoHandler('--g-bdr-rad')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            )
          }
          <SizeControl
            min={0}
            max={20}
            inputHandler={borderRadHandler}
            sizeHandler={({ unitKey, unitValue }) => borderRadHandler({ unit: unitKey, value: unitValue })}
            value={globalBdrRadValue}
            unit={globalBdrRadUnit}
            width="110px"
            options={['px', 'em', 'rem']}
          />
        </div>

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Border width</span>
          {
            tempThemeVars['--g-bdr-width'] && (
              <button onClick={() => undoHandler('--g-bdr-width')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            )
          }
          <SizeControl
            min={0}
            max={20}
            inputHandler={borderWidthHandler}
            sizeHandler={({ unitKey, unitValue }) => borderWidthHandler({ unit: unitKey, value: unitValue })}
            value={globalBdrWidthVal}
            unit={globalBdrWidthUnit}
            width="110px"
            options={['px', 'em', 'rem']}
          />
        </div>
        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Field Font Size</span>
          {
            tempThemeVars['--fld-fs'] && (
              <button onClick={() => undoHandler('--fld-fs')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            )
          }
          <SizeControl
            inputHandler={fldFsSizeHandler}
            sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
            value={fldFSValue}
            unit={fldFSUnit}
            width="110px"
            options={['px', 'em', 'rem']}
          />
        </div>
        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Theme</span>
          <ThemeControl />
        </div>
        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Size</span>
          <select onChange={setSizes} name="" id="">
            <option value="small-2">Small-2</option>
            <option value="small-1">Small-1</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="large-1">Large-1</option>
          </select>
        </div>

        <SimpleAccordion
          title={__('Field container', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 2}
          onClick={() => openHandler(2)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Background Color</span>
              <SimpleColorPicker value={globalfldWrpBg} action={{ type: 'global-fld-wrp-bg' }} subtitle="Field Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Spacing</span>
              <SpacingControl value={{ margin: wrpMagin, padding: wrpPadding }} action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={fldWrapperObj} />
            </div>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label & Subtitle Container', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 3}
          onClick={() => openHandler(3)}
        >
          <div className={css(ut.m10)}>

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Background Color</span>
              <SimpleColorPicker value={stBg} action={{ type: 'st-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Spacing</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={stSpacingObj} />
            </div>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 4}
          onClick={() => openHandler(4)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Background Color</span>
              <SimpleColorPicker value={flBg} action={{ type: 'fl-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Text Color</span>
              <SimpleColorPicker value={flc} action={{ type: 'fl-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Spacing</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={flSpacingObj} />
            </div>
          </div>
        </SimpleAccordion>

        {[...Array(20).keys()].map(() => <br />)}
      </div>
    </div>
  )
}

const MenuItem = ({ label }) => <div>{label}</div>

const cls = {
  title: { mt: 5, mb: 2 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  subTitle2: { fs: 14, fw: 500, my: 10 },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  container: { ml: 12, mr: 15 },
  btn: {
    b: 'none',
    oe: 'none',
    brs: 8,
    bc: 'var(--white-0-95)',
    cur: 'pointer',
  },
  pnt: { cur: 'not-allowed' },
  menuItem: {
    p: 10,
    ws: 'nowrap',
    fs: 14,
    fw: 500,
  },
  con: { py: 10, bb: '0.5px solid var(--white-0-83)' },
}

const fldWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--fw-m', padding: '--fw-p' },
}
const stSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--st-m', padding: '--st-p' },
}
const flSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--fl-m', padding: '--fl-p' },
}

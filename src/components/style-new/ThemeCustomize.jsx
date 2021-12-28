/* eslint-disable no-continue */
/* eslint-disable no-extra-label */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $colorScheme, $flags, $styles, $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import BorderControl from './BorderControl'
import FieldMarginControl from './FieldMarginControl'
import FontPicker from './FontPicker'
import FormContainerCustomizer from './FormContainerCustomizer'
import FormWrapperControl from './FormWrapperControl'
import FormWrapperCustomizer from './FormWrapperCustomizer'
import LabelControl from './LabelControl'
import LabelSpacingControl from './LabelSpacingControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { changeFormDir, commonStyle, getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID, element } = useParams()
  const setStyles = useSetRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [colorScheme, setColorScheme] = useRecoilState($colorScheme)

  const setFlags = useSetRecoilState($flags)
  const themeColors = useRecoilValue($themeColors)

  const { '--dir': direction,
    '--fld-wrp-m': wrpMagin,
    '--fld-wrp-p': wrpPadding,
    '--g-bdr-rad': globalBorderRad,
    '--fld-fs': fldFs,
    '--g-bdr-width': globalBdrWidth,
    '--sub-titl-bg': stBg,

    '--sub-titl-bdr': stBdr } = themeVars

  const { '--global-accent-color': globalPrimaryColor,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgClr,
    '--fld-wrp-bg': fwBg,
    '--fld-wrp-bdr': fwBdr,
    '--fld-wrp-sh': fwSh,
    '--lbl-wrp-bg': lwBg,
    '--lbl-wrp-sh': lwSh,
    '--lbl-wrp-bdr': lwBdr,
    '--fld-lbl-c': flc,
    '--fld-lbl-sh': flSh,
    '--fld-lbl-bg': flBg,
    '--fld-lbl-bdr': flBdr,
    '--sub-titl-sh': stSh,
    '--hlp-txt-bg': htBg,
    '--hlp-txt-c': htC,
    '--hlp-txt-sh': htSh,
    '--hlp-txt-bdr': htBdr,
    '--err-bg': errBg,
    '--err-c': errC,
    '--err-sh': errSh,
    '--err-bdr': errB,
    '--sub-titl-c': stC } = themeColors

  useEffect(() => {
    setFlags(oldFlgs => ({ ...oldFlgs, styleMode: true }))
    return () => { setFlags(oldFlgs => ({ ...oldFlgs, styleMode: false })) }
  }, [])

  const globalBdrRadValue = getNumFromStr(globalBorderRad)
  const globalBdrRadUnit = getStrFromStr(globalBorderRad)

  const globalBdrWidthVal = getNumFromStr(globalBdrWidth)
  const globalBdrWidthUnit = getStrFromStr(globalBdrWidth)

  const fldFSValue = getNumFromStr(fldFs)
  const fldFSUnit = getStrFromStr(fldFs)

  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
  }

  const updateHandler = (value, unit, globalVarUnit, globalVar) => {
    const convertvalue = unitConverter(unit, value, globalVarUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[globalVar] = `${convertvalue}${unit || globalVarUnit}`
    }))
  }

  const borderRadHandler = ({ value, unit }) => updateHandler(value, unit, globalBdrRadUnit, '--g-bdr-rad')

  const borderWidthHandler = ({ value, unit }) => updateHandler(value, unit, globalBdrWidthUnit, '--g-bdr-width')

  const fldFsSizeHandler = ({ value, unit }) => updateHandler(value, unit, fldFSUnit, '--fld-fs')

  const setSizes = ({ target: { value } }) => {
    const tmpThemeVar = deepCopy(themeVars)

    setStyles(prvStyle => produce(prvStyle, drft => {
      const flds = prvStyle.fields
      const fldKeyArr = Object.keys(flds)
      const fldKeyArrLen = fldKeyArr.length

      for (let i = 0; i < fldKeyArrLen; i += 1) {
        const fldKey = fldKeyArr[i]
        const commonStyles = commonStyle(fldKeyArr[i], value)
        const commonStylClasses = Object.keys(commonStyles)

        const fldClassesObj = flds[fldKey].classes
        // const fldClasses = Object.keys(fldClassesObj)

        const commonStylClassesLen = commonStylClasses.length
        for (let indx = 0; indx < commonStylClassesLen; indx += 1) {
          const comnStylClass = commonStylClasses[indx]

          if (fldClassesObj.hasOwnProperty(comnStylClass)) {
            const mainStlPropertiesObj = fldClassesObj[comnStylClass]
            const comStlPropertiesObj = commonStyles[comnStylClass]
            const comnStlProperties = Object.keys(comStlPropertiesObj)
            const comnStlPropertiesLen = comnStlProperties.length

            for (let popIndx = 0; popIndx < comnStlPropertiesLen; popIndx += 1) {
              const comnStlProperty = comnStlProperties[popIndx]

              if (mainStlPropertiesObj.hasOwnProperty(comnStlProperty)) {
                const mainStlVal = mainStlPropertiesObj[comnStlProperty]
                const comStlVal = comStlPropertiesObj[comnStlProperty]
                if (mainStlVal !== comStlVal) {
                  if (mainStlVal?.match(/var/gi)) {
                    const mainStateVar = mainStlVal.replaceAll(/\(|var|!important|,.*|\)/gi, '')
                    if (tmpThemeVar[mainStateVar] !== comStlVal) {
                      tmpThemeVar[mainStateVar] = comStlVal
                    }
                  } else {
                    drft.fields[fldKey].classes[comnStylClass][comnStlProperty] = comStlVal
                  }
                }
              }
            }
          }
        }
      }
    }))

    setThemeVars(tmpThemeVar)
  }

  const genarateTitle = () => {
    switch (element) {
      case 'quick-tweaks': return 'Theme Quick Tweaks'
      case 'field-container': return 'Field Blocks'
      case 'label-container': return 'Label Containers'
      case 'label': return 'Labels'
      case 'subtitle': return 'Sub Labels'
      case 'helper-text': return 'Helper Texts'
      case 'error-messages': return 'Error Messages'
      default: return 'Theme Customization'
    }
  }

  const handlecolorScheme = ({ target: { name } }) => setColorScheme(name)

  return (
    <div className={css(cls.mainWrapper)}>
      <span className={css({ flxi: 'center', mt: 10 })}>
        <Link
          to={`/form/builder/${formType}/${formID}/themes`}
          className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}
        >
          <ChevronLeft size="14" />
          {' '}
          Themes /
          {' '}
        </Link>
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      </span>
      <h4 className={css(cls.title)}>
        {genarateTitle()}
        {' '}
        (Global)
      </h4>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>

        <h4 className={css(cls.subTitle)}>Color Scheme</h4>
        <div className={css(ut.flxc, ut.w9, ut.mt1)}>
          <button
            onClick={handlecolorScheme}
            name="light"
            data-active={colorScheme === 'light'}
            className={css(cls.menuItem, colorScheme === 'light' && cls.clrActive)}
            type="button"
          >
            Light
          </button>
          <button
            onClick={handlecolorScheme}
            name="dark"
            data-active={colorScheme === 'dark'}
            className={css(cls.menuItem, ut.ml2, colorScheme === 'dark' && cls.clrActive)}
            type="button"
          >
            Dark

          </button>
        </div>
        <div className={css(cls.divider)} />

        {element === 'quick-tweaks' && (
          <>
            <SimpleColorPicker
              title="Background colorsss"
              subtitle="Background color"
              value={globalBgColor}
              stateObjName="themeColors"
              propertyPath="--global-bg-color"
              modalId="global-bg-clr"
            />
            <SimpleColorPicker
              title="Accent Color"
              subtitle="Accent Color"
              value={globalPrimaryColor}
              stateObjName="themeColors"
              propertyPath="--global-accent-color"
              modalId="global-primary-clr"
              // eslint-disable-next-line no-sequences
              hslaPaths={{ h: '--gah', s: '--gas', l: '--gal', a: '--gaa' }}
            />
            <SimpleColorPicker
              title="Font Color"
              subtitle="Font Color"
              value={globalFontColor}
              stateObjName="themeColors"
              propertyPath="--global-font-color"
              modalId="global-font-clr"
            />
            <SimpleColorPicker
              title="Border Color"
              subtitle="Border Color"
              value={globalFldBdrClr}
              stateObjName="themeColors"
              propertyPath="--global-fld-bdr-clr"
              modalId="global-fld-bdr-clr"
            />
            <SimpleColorPicker
              title="Field Background Color"
              subtitle="Field Background Color"
              value={globalFldBgClr}
              stateObjName="themeColors"
              propertyPath="--global-fld-bg-color"
              modalId="global-fld-bg-clr"
            />

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Font Family</span>
              <FontPicker id="global-font-fam" />
            </div>

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Border Radius</span>
              <div className={css(ut.flxc)}>
                <ResetStyle stateObjName="themeVars" propertyPath="--g-bdr-rad" />
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
            </div>

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Border width</span>
              <ResetStyle stateObjName="themeVars" propertyPath="--g-bdr-width" />
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

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Size</span>
              <select onChange={setSizes} className={css(sc.select)}>
                {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
              </select>
            </div>

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Field Font Size</span>
              <div className={css(ut.flxc)}>
                <ResetStyle propertyPath="--fld-fs" stateObjName="themeVars" />
                <SizeControl
                  inputHandler={fldFsSizeHandler}
                  sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
                  value={fldFSValue}
                  unit={fldFSUnit}
                  width="110px"
                  options={['px', 'em', 'rem']}
                />
              </div>
            </div>

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
              <SingleToggle isChecked={direction === 'rtl'} action={handleDir} />
            </div>

            <div className={css(cls.divider)} />

            <div className={css({ mr: 15 })}>

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
                <span className={css(ut.fw500)}>Form Wrapper Control</span>
                <FormWrapperControl />
              </div>
            </div>
          </>
        )}

        {element === 'form-wrapper' && <FormWrapperCustomizer />}
        {element === 'form-container' && <FormContainerCustomizer />}

        {
          element === 'field-container' && (
            <div className={css(ut.m10)}>
              <SimpleColorPicker
                title="Background colors"
                subtitle="Field Background Color"
                value={fwBg}
                stateObjName="themeColors"
                propertyPath="--fld-wrp-bg"
                modalId="fld-wp-bg"
              />
              <div className={css(ut.flxcb, ut.mt2)}>
                <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
                <SpacingControl
                  value={{ margin: wrpMagin, padding: wrpPadding }}
                  action={{ type: 'spacing-control' }}
                  subtitle="Spacing control"
                  objectPaths={fldWrapperObj}
                  id="spacing-control"
                />
              </div>
              <ThemeStylePropertyBlock label="Shadow">
                <div className={css(ut.flxc)}>
                  <ResetStyle
                    propertyPath={fldwrpShPathObj.paths.shadow}
                    stateObjName={fldwrpShPathObj.object}
                  />
                  <ShadowControl
                    subtitle="Field Container Shadow"
                    value={fwSh}
                    objectPaths={fldwrpShPathObj}
                    id="fld-wrp-sh"
                  />
                </div>
              </ThemeStylePropertyBlock>
              <ThemeStylePropertyBlock label="Border">
                <div className={css(ut.flxc)}>
                  <ResetStyle
                    // propertyPath={['--fld-wrp-bdr', '--fld-wrp-bdr-width', '--fld-wrp-bdr-rad']}
                    propertyPath={['--fld-wrp-bdr-width', '--fld-wrp-bdr-rad']}
                    stateObjName="themeVars"
                  />
                  <BorderControl
                    subtitle="Field Container Border"
                    value={fwBdr}
                    objectPaths={fwStylePathObj}
                    id="fld-wrp-bdr"
                  />
                </div>
              </ThemeStylePropertyBlock>
            </div>
          )
        }

        {element === 'label-container' && (
          <div className={css(ut.m10)}>
            <SimpleColorPicker
              title="Background Color"
              subtitle="Subtitle Background Color"
              value={lwBg}
              stateObjName="themeColors"
              propertyPath="--lbl-wrp-bg"
              modalId="lbl-wrp-bg"
            />

            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl
                action={{ type: 'spacing-control' }}
                subtitle="Spacing control"
                objectPaths={lWrapperObj}
                id="lbl-spacing-control"
              />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={labwrpShObj.paths.shadow}
                  stateObjName={labwrpShObj.object}
                />
                <ShadowControl
                  subtitle="Label & Subtitle Container Shadow"
                  value={lwSh}
                  objectPaths={labwrpShObj}
                  id="lbl-wrp-sh"
                />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  // propertyPath={['--lbl-wrp-bdr', '--lbl-wrp-bdr-width', '--lbl-wrp-bdr-rad']}
                  propertyPath={['--lbl-wrp-bdr-width', '--lbl-wrp-bdr-rad']}
                  stateObjName="themeVars"
                />
                <BorderControl
                  subtitle="Label & Subtitle Container Border"
                  value={lwBdr}
                  objectPaths={lwStylePathObj}
                  id="lbl-wrp-bdr"
                />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        )}

        {element === 'label' && (
          <div className={css(ut.m10)}>
            <SimpleColorPicker
              title="Background Color"
              subtitle="Subtitle Background Color"
              value={flBg}
              stateObjName="themeColors"
              propertyPath="--fld-lbl-bg"
              modalId="fld-lbl-bg"
            />
            <SimpleColorPicker
              title="Text Colors"
              subtitle="Text Color"
              value={flc}
              stateObjName="themeColors"
              propertyPath="--fld-lbl-c"
              modalId="fld-lbl-c"
            />
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl
                action={{ type: 'spacing-control' }}
                subtitle="Spacing control"
                objectPaths={flSpacingObj}
                id="lbl-spacing-control"
              />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={fldLblShObj.paths.shadow}
                  stateObjName={fldLblShObj.object}
                />
                <ShadowControl
                  subtitle="Label Shadow"
                  value={flSh}
                  objectPaths={fldLblShObj}
                  id="fld-lbl-sh"
                />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  // propertyPath={['--fld-lbl-bdr', '--fld-lbl-bdr-width', '--fld-lbl-bdr-rad']}
                  propertyPath={['--fld-lbl-bdr-width', '--fld-lbl-bdr-rad']}
                  stateObjName="themeVars"
                />
                <BorderControl
                  subtitle="Label Border"
                  value={flBdr}
                  objectPaths={flStylePathObj}
                  id="fld-lbl-bdr-width"
                />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        )}

        {element === 'subtitle' && (
          <div className={css(ut.m10)}>
            <SimpleColorPicker
              title="Background Color"
              subtitle="Subtitle Background Color"
              value={stBg}
              stateObjName="themeColors"
              propertyPath="--sub-titl-bg"
              modalId="sub-titl-bg"
            />
            <SimpleColorPicker
              title="Text Color"
              subtitle="Text Color"
              value={stC}
              stateObjName="themeColors"
              propertyPath="--sub-titl-c"
              modalId="sub-titl-c"
            />
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl
                action={{ type: 'spacing-control' }}
                subtitle="Spacing control"
                objectPaths={stSpacingObj}
                id="subtitle-spacing-control"
              />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={subTitlShObj.paths.shadow}
                  stateObjName={subTitlShObj.object}
                />
                <ShadowControl
                  subtitle="Subtitle Shadow"
                  value={stSh}
                  objectPaths={subTitlShObj}
                  id="sub-titl-sh"
                />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  // propertyPath={['--sub-titl-bdr', '--sub-titl-bdr-width', '--sub-titl-bdr-rad']}
                  propertyPath={['--sub-titl-bdr-width', '--sub-titl-bdr-rad']}
                  stateObjName="themeVars"
                />
                <BorderControl
                  subtitle="Subtitle Border"
                  value={stBdr}
                  objectPaths={stStylePathObj}
                  id="sub-title-width-bdr-control"
                />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        )}

        {element === 'helper-text' && (
          <div className={css(ut.m10)}>
            <SimpleColorPicker
              title="Background Color"
              subtitle="Background Color"
              value={htBg}
              stateObjName="themeColors"
              propertyPath="--hlp-txt-bg"
              modalId="hlp-txt-bg"
            />
            <SimpleColorPicker
              title="Text Color"
              subtitle="Text Color"
              value={htC}
              stateObjName="themeColors"
              propertyPath="--hlp-txt-c"
              modalId="hlp-txt-c"
            />
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl
                action={{ type: 'spacing-control' }}
                subtitle="Spacing control"
                objectPaths={htSpacingObj}
                id="hlp-spacing-control"
              />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={hlpTxtShObj.paths.shadow}
                  stateObjName={hlpTxtShObj.object}
                />
                <ShadowControl
                  subtitle="Helper Text Shadow"
                  value={htSh}
                  objectPaths={hlpTxtShObj}
                  id="hlp-txt-sh"
                />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  // propertyPath={['--hlp-txt-bdr', '--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
                  propertyPath={['--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']}
                  stateObjName="themeVars"
                />
                <BorderControl
                  subtitle="Helper Text Border"
                  value={htBdr}
                  objectPaths={htStylePathObj}
                  id="hlp-txt-control"
                />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        )}

        {element === 'error-messages' && (
          <div className={css(ut.m10)}>
            <SimpleColorPicker
              title="Background Color"
              subtitle="Background Color"
              value={errBg}
              stateObjName="themeColors"
              propertyPath="--err-bg"
              modalId="err-bg"
            />
            <SimpleColorPicker
              title="Text Color"
              subtitle="Text Color"
              value={errC}
              stateObjName="themeColors"
              propertyPath="--err-c"
              modalId="err-c"
            />
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl
                action={{ type: 'spacing-control' }}
                subtitle="Spacing control"
                objectPaths={errMsgSpacingObj}
                id="err-spacing-control"
              />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                <ResetStyle
                  propertyPath={errShObj.paths.shadow}
                  stateObjName={errShObj.object}
                />
                <ShadowControl
                  subtitle="Error Message Shadow"
                  value={errSh}
                  objectPaths={errShObj}
                  id="err-sh"
                />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {/* <ResetStyle propertyPath={['--err-bdr', '--err-bdr-width', '--err-bdr-rad']} stateObjName="themeVars" /> */}
                <ResetStyle
                  propertyPath={['--err-bdr-width', '--err-bdr-rad']}
                  stateObjName="themeVars"
                />
                <BorderControl
                  subtitle="Error Message Border"
                  value={errB}
                  objectPaths={errStylePathObj}
                  id="err-control"
                />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        )}

        {[...Array(20).keys()].map((i) => <br key={`${i}-asd`} />)}
      </div>
    </div>
  )
}

const sizes = {
  'small-2': 'Small-2',
  'small-1': 'Small-1',
  medium: 'Medium',
  large: 'Large',
  'large-1': 'Large-1',
}

const cls = {
  title: { mt: 5, mb: 2, fs: 18 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mr: 8, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)', w: '97%' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  subTitle2: { fs: 14, fw: 500, mt: 10 },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  // container: { ml: 12, mr: 10 },
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
    fs: 12,
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
  accordion: {
    py: 10,
    bb: '0.5px solid var(--white-0-83)',
    w: '95%',
    '& .title, .toggle-icn': { curp: 1 },
  },
}

const fldWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--fld-wrp-m', padding: '--fld-wrp-p' },
}
const lWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--lbl-wrp-m', padding: '--lbl-wrp-p' },
}
const flSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--fld-lbl-m', padding: '--fld-lbl-p' },
}
const stSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--sub-titl-m', padding: '--sub-titl-p' },
}
const fwStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--fld-wrp-bdr', borderWidth: '--fld-wrp-bdr-width', borderRadius: '--fld-wrp-bdr-rad' },
}
const fldwrpShPathObj = {
  object: 'themeColors',
  paths: { shadow: '--fld-wrp-sh' },
}
const lwStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--lbl-wrp-bdr', borderWidth: '--lbl-wrp-bdr-width', borderRadius: '--lbl-wrp-bdr-rad' },
}
const labwrpShObj = {
  object: 'themeColors',
  paths: { shadow: '--lbl-wrp-sh' },
}
const flStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--fld-lbl-bdr', borderWidth: '--fld-lbl-bdr-width', borderRadius: '--fld-lbl-bdr-rad' },
}
const fldLblShObj = {
  object: 'themeColors',
  paths: { shadow: '--fld-lbl-sh' },
}
const stStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--sub-titl-bdr', borderWidth: '--sub-titl-bdr-width', borderRadius: '--sub-titl-bdr-rad' },
}
const subTitlShObj = {
  object: 'themeColors',
  paths: { shadow: '--sub-titl-sh' },
}
const htStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--hlp-txt-bdr', borderWidth: '--hlp-txt-bdr-width', borderRadius: '--hlp-txt-bdr-rad' },
}
const hlpTxtShObj = {
  object: 'themeColors',
  paths: { shadow: '--hlp-txt-sh' },
}
const errStylePathObj = {
  object: 'themeVars',
  borderObjName: 'themeColors',
  paths: { border: '--err-bdr', borderWidth: '--err-bdr-width', borderRadius: '--err-bdr-rad' },
}
const errShObj = {
  object: 'themeColors',
  paths: { shadow: '--err-sh' },
}
const htSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--hlp-txt-m', padding: '--hlp-txt-p' },
}
const errMsgSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--err-m', padding: '--err-p', shadow: '--err-sh' },
}

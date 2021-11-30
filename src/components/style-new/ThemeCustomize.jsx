/* eslint-disable no-continue */
/* eslint-disable no-extra-label */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $styles, $themeVars, $colorScheme, $flags, $tempStyles, $themeColors } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import BorderControl from './BorderControl'
import FieldMarginControl from './FieldMarginControl'
import FontPicker from './FontPicker'
import FormWrapperControl from './FormWrapperControl'
import HighlightElm from './HighlightElm'
import LabelControl from './LabelControl'
import LabelSpacingControl from './LabelSpacingControl'
import ResetStyle from './ResetStyle'
import ShadowControl from './ShadowControl'
import SimpleColorPicker from './SimpleColorPicker'
import SpacingControl from './SpacingControl'
import { changeFormDir, CommonStyle, getNumFromStr, getStrFromStr, unitConverterHelper } from './styleHelpers'
import ThemeControl from './ThemeControl'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const setStyles = useSetRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempStyles = useRecoilValue($tempStyles)
  const colorSchemeRoot = useRecoilValue($colorScheme)
  const setFlags = useSetRecoilState($flags)
  const [activeAccordion, setActiveAccordion] = useState()
  const [colorScheme, setColorScheme] = useState(colorSchemeRoot)
  const tempThemeVars = tempStyles.themeVars
  const tempThemeColors = tempStyles.themeColors
  const { '--fld-wrp-m': wrpMagin, '--fld-wrp-p': wrpPadding } = themeVars
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  console.log({ colorScheme, themeColors })
  const { '--dir': direction,
    '--g-bdr-rad': globalBorderRad,
    '--fld-fs': fldFs,
    '--g-bdr-width': globalBdrWidth,
    '--fld-wrp-bg': fwBg,
    '--fld-wrp-sh': fwSh,
    '--fld-wrp-bdr': fwBdr,
    '--lbl-wrp-bg': lwBg,
    '--lbl-wrp-sh': lwSh,
    '--lbl-wrp-bdr': lwBdr,
    '--sub-titl-bg': stBg,
    '--sub-titl-c': stC,
    '--sub-titl-sh': stSh,
    '--sub-titl-bdr': stBdr,
    '--fld-lbl-bg': flBg,
    '--fld-lbl-c': flc,
    '--fld-lbl-sh': flSh,
    '--fld-lbl-bdr': flBdr,
    '--hlp-txt-bg': htBg,
    '--hlp-txt-c': htC,
    '--hlp-txt-sh': htSh,
    '--hlp-txt-bdr': htBdr,
    '--err-bg': errBg,
    '--err-c': errC,
    '--err-sh': errSh,
    '--err-bdr': errB } = themeVars

  const { '--global-primary-color': globalPrimaryColor,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgClr } = themeColors

  const { '--global-primary-color': tempPrimaryColor,
    '--global-font-color': tempFontColor,
    '--global-bg-color': tempBgColor,
    '--global-fld-bdr-clr': tempFldBdrClr,
    '--global-fld-bg-color': tempFldBgClr } = tempThemeColors

  const { '--fld-wrp-bg': tempFldWrpBg,
    '--fld-wrp-sh': tempFldWrpSh,
    '--fld-wrp-bdr': tempFldWrpBdr,
    '--lbl-wrp-bg': tempLblWrpBg,
    '--lbl-wrp-sh': tempLblWrpSh,
    '--lbl-wrp-bdr': tempLblWrpBdr,
    '--fld-lbl-bg': tempFlBg,
    '--fld-lbl-c': tempFlC,
    '--fld-lbl-sh': tempFlSh,
    '--fld-lbl-bdr': tempFlBdr,
    '--sub-titl-bg': tempSubTitleBg,
    '--sub-titl-c': tempSubTitlC,
    '--sub-titl-sh': tempSubTitlSh,
    '--sub-titl-bdr': tempSubTitlBdr,
    '--hlp-txt-bg': tempHlpTxtBg,
    '--hlp-txt-c': tempHlpTxtC,
    '--hlp-txt-sh': tempHlpTxtSh,
    '--hlp-txt-bdr': tempHlpTxtBdr,
    '--err-bg': tempErrBg,
    '--err-c': tempErrC,
    '--err-sh': tempErrSh,
    '--err-bdr': tempErrBdr } = tempThemeVars

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
    const convertvalue = unitConverterHelper(unit, value, globalVarUnit)
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
        const commonStyles = CommonStyle(fldKeyArr[i], value)
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

  const openHandler = (value) => {
    setActiveAccordion(value)
  }

  const handlecolorScheme = ({ target: { name } }) => setColorScheme(name)

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
        <h4 className={css(cls.subTitle)}>Color Scheme</h4>
        <div className={css(ut.flxcb, ut.w9, ut.mt1)}>
          <button onClick={handlecolorScheme} name="light" data-active={colorScheme === 'light'} className={css(cls.menuItem, colorScheme === 'light' && cls.clrActive)} type="button">Light</button>
          <button onClick={handlecolorScheme} name="dark" data-active={colorScheme === 'dark'} className={css(cls.menuItem, colorScheme === 'dark' && cls.clrActive)} type="button">Dark</button>
          <button onClick={handlecolorScheme} name="high-contrast" data-active={colorScheme === 'high-contrast'} className={css(cls.menuItem, colorScheme === 'high-contrast' && cls.clrActive)} type="button">High Contrast</button>
        </div>

        <div className={css(cls.divider)} />

        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <div className={css(cls.container)}>

          {/*
          <div className={css(ut.flxc)}>
            <div className={css(cls.menuItem)}>Default</div>
            <div className={css(cls.menuItem, { px: 10 })}>Dark Mode</div>
            <div className={css(cls.menuItem)}>High Contrast Mode</div>
          </div> */}

          <div className={css(ut.flxcb)}>
            <div className={css(ut.flxb)}>
              <span className={css(ut.fw500)}>Background Color</span>
              {tempBgColor && <ResetStyle themeVar="--global-bg-color" stateName="themeColors" />}

            </div>
            <SimpleColorPicker value={globalBgColor} action={{ type: 'global-bg-color' }} id="global-bg-clr" subtitle="Background color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Primary Color</span>
              {tempPrimaryColor && <ResetStyle themeVar="--global-primary-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={globalPrimaryColor} action={{ type: 'global-primary-color' }} id="global-primary-clr" subtitle="Primary color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
              {tempFontColor && <ResetStyle themeVar="--global-font-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={globalFontColor} action={{ type: 'global-font-color' }} id="global-font-clr" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Border Color</span>
              {tempFldBdrClr && <ResetStyle themeVar="--global-fld-bdr-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={globalFldBdrClr} action={{ type: 'global-fld-bdr-color' }} id="global-fld-bdr-clr" subtitle="Border Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Field Background Color</span>
              {tempFldBgClr && <ResetStyle themeVar="--global-fld-bg-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={globalFldBgClr} action={{ type: 'global-fld-bg-color' }} id="global-fld-bg-clr" subtitle="Field Background Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Font Family</span>
            <FontPicker id="global-font-fam" />
          </div>

          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Border Radius</span>
            {tempThemeVars['--g-bdr-red'] && <ResetStyle themeVar="--g-bdr-red" />}
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

          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Border width</span>
            {tempThemeVars['--g-bdr-width'] && <ResetStyle themeVar="--g-bdr-width" show={false} />}
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
              <option value="small-2">Small-2</option>
              <option value="small-1">Small-1</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="large-1">Large-1</option>
            </select>
          </div>

          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Field Font Size</span>
            <div className={css(ut.flxc)}>
              {tempThemeVars['--fld-fs'] && <ResetStyle themeVar="--fld-fs" />}
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

        </div>

        <div className={css(cls.divider)} />

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Theme</span>
          <ThemeControl />
        </div>

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

        <h4 className={css(cls.subTitle)}>More Customizations</h4>
        <div className={css(cls.divider)} />

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Field Font Size</span>
          {tempThemeVars['--fld-fs'] && <ResetStyle themeVar="--fld-fs" stateName="themeColors" />}
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

        <SimpleAccordion
          title={__('Field container', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 1}
          onClick={() => openHandler(1)}
          actionComponent={<HighlightElm selector="[data-dev-fld-wrp]" />}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempFldWrpBg !== fwBg && <ResetStyle themeVar="--fld-wrp-bg" stateName="themeColors" />}
              <SimpleColorPicker value={fwBg} action={{ type: 'fw-bg' }} subtitle="Field Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl value={{ margin: wrpMagin, padding: wrpPadding }} action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={fldWrapperObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempFldWrpSh !== fwSh && <ResetStyle themeVar="--fld-wrp-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Field Container Shadow" value={fwSh} objectPaths={fwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempFldWrpBdr !== fwBdr && <ResetStyle themeVar={['--fld-wrp-bdr', '--fld-wrp-bdr-width', '--fld-wrp-bdr-rad']} stateName="themeVars" />}
                <BorderControl subtitle="Field Container Border" value={fwBdr} objectPaths={fwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label & Subtitle Container', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 2}
          onClick={() => openHandler(2)}
          actionComponent={<HighlightElm selector="[data-dev-lbl-wrp]" />}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempLblWrpBg !== lwBg && <ResetStyle themeVar="--lbl-wrp-bg" stateName="themeVars" />}
              <SimpleColorPicker value={lwBg} action={{ type: 'lw-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={lWrapperObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempLblWrpSh !== lwSh && <ResetStyle themeVar="--lbl-wrp-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Label & Subtitle Container Shadow" value={lwSh} objectPaths={lwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempLblWrpBdr !== lwBdr && <ResetStyle themeVar={['--lbl-wrp-bdr', '--lbl-wrp-bdr-width', '--lbl-wrp-bdr-rad']} stateName="themeVars" />}
                <BorderControl subtitle="Label & Subtitle Container Border" value={lwBdr} objectPaths={lwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 3}
          onClick={() => openHandler(3)}
          actionComponent={<HighlightElm selector="[data-dev-lbl]" />}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--fld-lbl-bg'] && <ResetStyle themeVar="--fld-lbl-bg" />}
              <SimpleColorPicker value={flBg} action={{ type: 'fl-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempThemeVars['--fld-lbl-c'] && <ResetStyle themeVar="--fld-lbl-c" />}
              <SimpleColorPicker value={flc} action={{ type: 'fl-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={flSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fld-lbl-sh'] && <ResetStyle themeVar="--fld-lbl-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Label Shadow" value={flSh} objectPaths={flStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fld-lbl-bdr'] && <ResetStyle themeVar={['--fld-lbl-bdr', '--fld-lbl-bdr-width', '--fld-lbl-bdr-rad']} />}
                <BorderControl subtitle="Label Border" value={flBdr} objectPaths={flStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Subtitle', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 4}
          onClick={() => openHandler(4)}
          actionComponent={<HighlightElm selector="[data-dev-sub-titl]" />}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempSubTitleBg !== stBg && <ResetStyle themeVar="--sub-titl-bg" stateName="themeVars" />}
              <SimpleColorPicker value={stBg} action={{ type: 'st-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempSubTitlC !== stC && <ResetStyle themeVar="--sub-titl-c" stateName="themeVars" />}
              <SimpleColorPicker value={stC} action={{ type: 'st-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={stSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempSubTitlSh !== stSh && <ResetStyle themeVar="--sub-titl-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Subtitle Shadow" value={stSh} objectPaths={stStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempSubTitlBdr !== stBdr && <ResetStyle themeVar={['--sub-titl-bdr', '--sub-titl-bdr-width', '--sub-titl-bdr-rad']} stateName="themeVars" />}
                <BorderControl subtitle="Subtitle Border" value={stBdr} objectPaths={stStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Helper Text', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 5}
          onClick={() => openHandler(5)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempHlpTxtBg !== htBg && <ResetStyle themeVar="--hlp-txt-bg" stateName="themeVars" />}
              <SimpleColorPicker value={htBg} action={{ type: 'ht-bg' }} subtitle="Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempHlpTxtC !== htC && <ResetStyle themeVar="--hlp-txt-c" stateName="themeVars" />}
              <SimpleColorPicker value={htC} action={{ type: 'ht-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={htSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempHlpTxtSh !== htSh && <ResetStyle themeVar="--hlp-txt-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Helper Text Shadow" value={htSh} objectPaths={htStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempHlpTxtBdr !== htBdr && <ResetStyle themeVar={['--hlp-txt-bdr', '--hlp-txt-bdr-width', '--hlp-txt-bdr-rad']} stateName="themeVars" />}
                <BorderControl subtitle="Helper Text Border" value={htBdr} objectPaths={htStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Error Message', 'bitform')}
          className={css(cls.accordion)}
          disable={activeAccordion !== 6}
          onClick={() => openHandler(6)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempErrBg !== errBg && <ResetStyle themeVar="--err-bg" stateName="themeVars" />}
              <SimpleColorPicker value={errBg} action={{ type: 'err-bg' }} subtitle="Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempErrC !== errC && <ResetStyle themeVar="--err-c" stateName="themeVars" />}
              <SimpleColorPicker value={errC} action={{ type: 'err-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={errMsgSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempErrSh !== errSh && <ResetStyle themeVar="--err-sh" stateName="themeVars" />}
                <ShadowControl subtitle="Error Message Shadow" value={errSh} objectPaths={errStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempErrBdr !== errB && <ResetStyle themeVar={['--err-bdr', '--err-bdr-width', '--err-bdr-rad']} stateName="themeVars" />}
                <BorderControl subtitle="Error Message Border" value={errB} objectPaths={errStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        {[...Array(20).keys()].map((i) => <br key={`${i}-asd`} />)}
      </div>
    </div>
  )
}

const cls = {
  title: { mt: 5, mb: 2, fs: 18 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)', w: '97%' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  subTitle2: { fs: 14, fw: 500, mt: 10 },
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
    '& .title, .toggle-icn': {
      curp: 1
    }
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
  paths: { shadow: '--fld-wrp-sh', border: '--fld-wrp-bdr', borderWidth: '--fld-wrp-bdr-width', borderRadius: '--fld-wrp-bdr-rad' },
}
const lwStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--lbl-wrp-sh', border: '--lbl-wrp-bdr', borderWidth: '--lbl-wrp-bdr-width', borderRadius: '--lbl-wrp-bdr-rad' },
}
const flStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--fld-lbl-sh', border: '--fld-lbl-bdr', borderWidth: '--fld-lbl-bdr-width', borderRadius: '--fld-lbl-bdr-rad' },
}
const stStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--sub-titl-sh', border: '--sub-titl-bdr', borderWidth: '--sub-titl-bdr-width', borderRadius: '--sub-titl-bdr-rad' },
}
const htStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--hlp-txt-sh', border: '--hlp-txt-bdr', borderWidth: '--hlp-txt-bdr-width', borderRadius: '--hlp-txt-bdr-rad' },
}
const errStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--err-sh', border: '--err-bdr', borderWidth: '--err-bdr-width', borderRadius: '--err-bdr-rad' },
}
const htSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--hlp-txt-m', padding: '--hlp-txt-p' },
}
const errMsgSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--err-m', padding: '--err-p', shadow: '--err-sh' },
}

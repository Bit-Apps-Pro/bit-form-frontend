/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $colorScheme, $styles, $tempThemeVars, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import BorderControl from './BorderControl'
import FieldMarginControl from './FieldMarginControl'
import FontPicker from './FontPicker'
import FormWrapperControl from './FormWrapperControl'
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
  const tempThemeVars = useRecoilValue($tempThemeVars)
  const colorSchemeRoot = useRecoilValue($colorScheme)
  const [activeAccordion, setActiveAccordion] = useState()
  const [colorScheme, setColorScheme] = useState(colorSchemeRoot)
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
    '--fw-bg': fwBg,
    '--fw-sh': fwSh,
    '--fw-bdr': fwBdr,
    '--lw-bg': lwBg,
    '--lw-sh': lwSh,
    '--lw-bdr': lwBdr,
    '--st-bg': stBg,
    '--st-c': stC,
    '--st-sh': stSh,
    '--st-bdr': stBdr,
    '--fl-bg': flBg,
    '--fl-c': flc,
    '--fl-sh': flSh,
    '--fl-bdr': flBdr,
    '--ht-bg': htBg,
    '--ht-c': htC,
    '--ht-sh': htSh,
    '--ht-bdr': htBdr,
    '--err-bg': errBg,
    '--err-c': errC,
    '--err-sh': errSh,
    '--err-bdr': errB } = themeVars

  console.log({ htSh }, themeVars)

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
              {tempThemeVars['--global-bg-color'] && <ResetStyle themeVar="--global-bg-color" />}

            </div>
            <SimpleColorPicker value={globalBgColor} action={{ type: 'global-bg-color' }} subtitle="Background color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Primary Color</span>
              {tempThemeVars['--global-primary-color'] && <ResetStyle themeVar="--global-primary-color" />}
            </div>
            <SimpleColorPicker value={globalPrimaryColor} action={{ type: 'global-primary-color' }} subtitle="Primary color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
              {tempThemeVars['--global-font-color'] && <ResetStyle themeVar="--global-font-color" />}
            </div>
            <SimpleColorPicker value={globalFontColor} action={{ type: 'global-font-color' }} />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Border Color</span>
              {tempThemeVars['--global-fld-bdr-color'] && <ResetStyle themeVar="--global-fld-bdr-color" />}
            </div>
            <SimpleColorPicker value={globalFldBdrClr} action={{ type: 'global-fld-bdr-color' }} subtitle="Border Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Field Background Color</span>
              {tempThemeVars['--global-fld-bg-color'] && <ResetStyle themeVar="--global-fld-bg-color" />}
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
            <span className={css(ut.fw500)}>Form Wrapper Control</span>
            <FormWrapperControl />
          </div>
        </div>

        <div className={css(ut.flxcb)}>
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

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Border width</span>
          {tempThemeVars['--g-bdr-width'] && <ResetStyle themeVar="--g-bdr-width" />}
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
          disable={activeAccordion !== 1}
          onClick={() => openHandler(1)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--fw-bg'] && <ResetStyle themeVar="--fw-bg" />}
              <SimpleColorPicker value={fwBg} action={{ type: 'fw-bg' }} subtitle="Field Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl value={{ margin: wrpMagin, padding: wrpPadding }} action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={fldWrapperObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fw-sh'] && <ResetStyle themeVar="--fw-sh" />}
                <ShadowControl subtitle="Field Container Shadow" value={fwSh} objectPaths={fwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fw-bdr'] && <ResetStyle themeVar={['--fw-bdr', '--fw-bdr-width', '--fw-bdr-rad']} />}
                <BorderControl subtitle="Field Container Border" value={fwBdr} objectPaths={fwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label & Subtitle Container', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 2}
          onClick={() => openHandler(2)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--lw-bg'] && <ResetStyle themeVar="--lw-bg" />}
              <SimpleColorPicker value={lwBg} action={{ type: 'lw-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={lWrapperObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--lw-sh'] && <ResetStyle themeVar="--lw-sh" />}
                <ShadowControl subtitle="Label & Subtitle Container Shadow" value={lwSh} objectPaths={lwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--lw-bdr'] && <ResetStyle themeVar={['--lw-bdr', '--lw-bdr-width', '--lw-bdr-rad']} />}
                <BorderControl subtitle="Label & Subtitle Container Border" value={lwBdr} objectPaths={lwStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Label', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 3}
          onClick={() => openHandler(3)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--fl-bg'] && <ResetStyle themeVar="--fl-bg" />}
              <SimpleColorPicker value={flBg} action={{ type: 'fl-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempThemeVars['--fl-c'] && <ResetStyle themeVar="--fl-c" />}
              <SimpleColorPicker value={flc} action={{ type: 'fl-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={flSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fl-sh'] && <ResetStyle themeVar="--fl-sh" />}
                <ShadowControl subtitle="Label Shadow" value={flSh} objectPaths={flStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--fl-bdr'] && <ResetStyle themeVar={['--fl-bdr', '--fl-bdr-width', '--fl-bdr-rad']} />}
                <BorderControl subtitle="Label Border" value={flBdr} objectPaths={flStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Subtitle', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 4}
          onClick={() => openHandler(4)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--st-bg'] && <ResetStyle themeVar="--st-bg" />}
              <SimpleColorPicker value={stBg} action={{ type: 'st-bg' }} subtitle="Subtitle Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempThemeVars['--st-c'] && <ResetStyle themeVar="--st-c" />}
              <SimpleColorPicker value={stC} action={{ type: 'st-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={stSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--st-sh'] && <ResetStyle themeVar="--st-sh" />}
                <ShadowControl subtitle="Subtitle Shadow" value={stSh} objectPaths={stStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--st-bdr'] && <ResetStyle themeVar={['--st-bdr', '--st-bdr-width', '--st-bdr-rad']} />}
                <BorderControl subtitle="Subtitle Border" value={stBdr} objectPaths={stStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Helper Text', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 5}
          onClick={() => openHandler(5)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--ht-bg'] && <ResetStyle themeVar="--ht-bg" />}
              <SimpleColorPicker value={htBg} action={{ type: 'ht-bg' }} subtitle="Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempThemeVars['--ht-c'] && <ResetStyle themeVar="--ht-c" />}
              <SimpleColorPicker value={htC} action={{ type: 'ht-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={htSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--ht-sh'] && <ResetStyle themeVar="--ht-sh" />}
                <ShadowControl subtitle="Helper Text Shadow" value={htSh} objectPaths={htStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--ht-bdr'] && <ResetStyle themeVar={['--ht-bdr', '--ht-bdr-width', '--ht-bdr-rad']} />}
                <BorderControl subtitle="Helper Text Border" value={htBdr} objectPaths={htStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
          </div>
        </SimpleAccordion>

        <SimpleAccordion
          title={__('Error Message', 'bitform')}
          className={css(cls.con)}
          disable={activeAccordion !== 6}
          onClick={() => openHandler(6)}
        >
          <div className={css(ut.m10)}>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Background Color', 'bitform')}</span>
              {tempThemeVars['--err-bg'] && <ResetStyle themeVar="--err-bg" />}
              <SimpleColorPicker value={errBg} action={{ type: 'err-bg' }} subtitle="Background Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Text Color', 'bitform')}</span>
              {tempThemeVars['--err-c'] && <ResetStyle themeVar="--global-bg-color" />}
              <SimpleColorPicker value={errC} action={{ type: 'err-c' }} subtitle="Text Color" />
            </div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500)}>{__('Spacing', 'bitform')}</span>
              <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={errMsgSpacingObj} />
            </div>
            <ThemeStylePropertyBlock label="Shadow">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--err-sh'] && <ResetStyle themeVar="--err-sh" />}
                <ShadowControl subtitle="Error Message Shadow" value={errSh} objectPaths={errStylePathObj} />
              </div>
            </ThemeStylePropertyBlock>
            <ThemeStylePropertyBlock label="Border">
              <div className={css(ut.flxc)}>
                {tempThemeVars['--err-bdr'] && <ResetStyle themeVar={['--err-bdr', '--err-bdr-width', '--err-bdr-rad']} />}
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
  title: { mt: 5, mb: 2 },
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
  con: { py: 10, bb: '0.5px solid var(--white-0-83)', w: '95%' },
}

const fldWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--fw-m', padding: '--fw-p' },
}
const lWrapperObj = {
  object: 'themeVars',
  paths: { margin: '--lw-m', padding: '--lw-p' },
}
const flSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--fl-m', padding: '--fl-p' },
}
const stSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--st-m', padding: '--st-p' },
}
const fwStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--fw-sh', border: '--fw-bdr', borderWidth: '--fw-bdr-width', borderRadius: '--fw-bdr-rad' },
}
const lwStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--lw-sh', border: '--lw-bdr', borderWidth: '--lw-bdr-width', borderRadius: '--lw-bdr-rad' },
}
const flStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--fl-sh', border: '--fl-bdr', borderWidth: '--fl-bdr-width', borderRadius: '--fl-bdr-rad' },
}
const stStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--st-sh', border: '--st-bdr', borderWidth: '--st-bdr-width', borderRadius: '--st-bdr-rad' },
}
const htStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--ht-sh', border: '--ht-bdr', borderWidth: '--ht-bdr-width', borderRadius: '--ht-bdr-rad' },
}
const errStylePathObj = {
  object: 'themeVars',
  paths: { shadow: '--err-sh', border: '--err-bdr', borderWidth: '--err-bdr-width', borderRadius: '--err-bdr-rad' },
}
const htSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--ht-m', padding: '--ht-p' },
}
const errMsgSpacingObj = {
  object: 'themeVars',
  paths: { margin: '--err-m', padding: '--err-p', shadow: '--err-sh' },
}

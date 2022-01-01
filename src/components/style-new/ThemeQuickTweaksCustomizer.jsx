/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $styles, $themeColors, $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { deepCopy } from '../../Utils/Helpers'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import FontPicker from './FontPicker'
import LabelControl from './LabelControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import { changeFormDir, commonStyle, getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'

export default function ThemeQuickTweaksCustomizer() {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const themeColors = useRecoilValue($themeColors)
  const setStyles = useSetRecoilState($styles)

  const { '--dir': direction,
    '--g-bdr-rad': globalBorderRad,
    '--fld-fs': fldFs,
    '--g-bdr-width': globalBdrWidth } = themeVars

  const { '--global-accent-color': globalPrimaryColor,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgClr } = themeColors

  const updateHandler = (value, unit, globalVarUnit, globalVar) => {
    const convertvalue = unitConverter(unit, value, globalVarUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[globalVar] = `${convertvalue}${unit || globalVarUnit}`
    }))
  }
  const globalBdrRadValue = getNumFromStr(globalBorderRad)
  const globalBdrRadUnit = getStrFromStr(globalBorderRad)
  const fldFSValue = getNumFromStr(fldFs)
  const fldFSUnit = getStrFromStr(fldFs)

  const globalBdrWidthVal = getNumFromStr(globalBdrWidth)
  const globalBdrWidthUnit = getStrFromStr(globalBdrWidth)
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
  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
  }

  return (
    <>
      <SimpleColorPicker
        title="Background color"
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

      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fw500)}>Label Alignment</span>
        <LabelControl />
      </div>

    </>
  )
}
const sizes = {
  'small-2': 'Small-2',
  'small-1': 'Small-1',
  medium: 'Medium',
  large: 'Large',
  'large-1': 'Large-1',
}

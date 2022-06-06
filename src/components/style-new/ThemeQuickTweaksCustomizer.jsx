/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { reCalculateFieldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import SingleToggle from '../Utilities/SingleToggle'
import BorderControl from './BorderControl'
import commonStyle from './componentsStyleByTheme/1_bitformDefault/fieldSizeControlStyle'
import FontPicker from './FontPicker'
import FontSizeControl from './FontSizeControl'
import LabelControl from './LabelControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import { changeFormDir } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function ThemeQuickTweaksCustomizer() {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const themeColors = useRecoilValue($themeColors)
  const [styles, setStyles] = useRecoilState($styles)
  const fields = useRecoilValue($fields)

  const { '--dir': direction } = themeVars

  const { '--global-accent-color': globalPrimaryColor,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--global-fld-bg-color': globalFldBgClr } = themeColors

  const setSizes = ({ target: { value } }) => {
    const tmpThemeVar = deepCopy(themeVars)

    setStyles(prvStyle => produce(prvStyle, drft => {
      drft.fieldSizes = value
      const flds = prvStyle.fields
      const fldKeyArr = Object.keys(flds)
      const fldKeyArrLen = fldKeyArr.length
      for (let i = 0; i < fldKeyArrLen; i += 1) {
        const fldKey = fldKeyArr[i]
        const commonStyles = commonStyle(fldKey, value, fields[fldKey].typ)
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
                  if (mainStlVal?.match(/(var)/gi)) {
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
    reCalculateFieldHeights()
  }
  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
  }

  return (
    <>


      <SimpleColorPicker
        title="Accent Color"
        subtitle="Theme Quick Tweaks Accent Color"
        value={globalPrimaryColor}
        stateObjName="themeColors"
        propertyPath="--global-accent-color"
        modalId="global-primary-clr"
        // eslint-disable-next-line no-sequences
        hslaPaths={{ h: '--gah', s: '--gas', l: '--gal', a: '--gaa' }}
      />

      <SimpleColorPicker
        title="Font Color"
        subtitle="Theme Quick Tweaks Font Color"
        value={globalFontColor}
        stateObjName="themeColors"
        propertyPath="--global-font-color"
        modalId="global-font-clr"
      />

      <ThemeStylePropertyBlock label="Border">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={['--g-bdr-width', '--g-bdr-rad']}
            stateObjName="themeVars"
            id="g-bdr"
          />
          <BorderControl
            subtitle="Theme Quick Tweaks Border Color"
            objectPaths={borderPathsObj}
            id="global-bdr"
            hslaPaths={{ h: '--gfbc-h', s: '--gfbc-s', l: '--gfbc-l', a: '--gfbc-a' }}
          />
        </div>
      </ThemeStylePropertyBlock>

      <SimpleColorPicker
        title="Field Background Color"
        subtitle="Theme Quick Tweaks Field Background Color"
        value={globalFldBgClr}
        stateObjName="themeColors"
        propertyPath="--global-fld-bg-color"
        modalId="global-fld-bg-clr"
        hslaPaths={{ h: '--gfbg-h', s: '--gfbg-s', l: '--gfbg-l', a: '--gfbg-a' }}
      />

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Font Family</span>
        <span className={css(ut.flxc)}>
          <ResetStyle
            id="g-fnt"
            stateObjName="themeVars"
            propertyPath="--g-font-family"
          />
          <FontPicker id="global-font-fmly" />
        </span>
      </div>

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Field Sizes</span>
        <select
          value={styles.fieldSizes}
          onChange={setSizes}
          className={css(sc.select)}
          data-testid="field-sizes-select"
        >
          {Object.keys(sizes).map((key, index) => (
            <option
              selected={!!(key === styles.fieldSizes)}
              key={`size-${index * 5}`}
              value={key}
              data-testid={`globl-size-${key}`}
            >
              {sizes[key]}
            </option>
          ))}
        </select>
      </div>

      <FontSizeControl
        stateObjName="themeVars"
        propertyPath="--fld-fs"
        id="fld-fs"
      />

      <div className={css(ut.flxcb, ut.mt3)}>
        <span className={css(ut.fw500)}>Label Alignment</span>
        <LabelControl id="align" />
      </div>

      <div className={css(ut.flxcb, ut.mt3)}>
        <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
        <SingleToggle id="rtl" isChecked={direction === 'rtl'} action={handleDir} />
      </div>

      <SimpleColorPicker
        title="Field Wrapper Background Color"
        subtitle="Theme Quick Tweaks Background Color"
        value={globalBgColor}
        stateObjName="themeColors"
        propertyPath="--global-bg-color"
        modalId="global-bg-clr"
      />
    </>
  )
}
const sizes = {
  'small-2': 'Extra Small',
  'small-1': 'Small',
  medium: 'Medium(Default)',
  // large: 'Large',
  'large-1': 'Large',
  'large-2': 'Extra Large',
}
const borderPathsObj = [
  {
    object: 'themeVars',
    paths: {
      'border-width': '--g-bdr-width',
      'border-radius': '--g-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { border: '--global-fld-bdr' },
  },
]

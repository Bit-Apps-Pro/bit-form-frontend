/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { hideAll } from 'tippy.js'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $savedStyles, $savedThemeColors, $savedThemeVars } from '../../GlobalStates/SavedStylesAndVars'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import {
  addToBuilderHistory,
  generateHistoryData,
  getLatestState,
  reCalculateFldHeights,
} from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Btn from '../Utilities/Btn'
import Downmenu from '../Utilities/Downmenu'
import SingleToggle from '../Utilities/SingleToggle'
import BorderControl from './BorderControl'
import { updateFieldStyleByFieldSizing } from './componentsStyleByTheme/1_bitformDefault/fieldSizeControlStyle'
import FontPicker from './FontPicker'
import FontSizeControl from './FontSizeControl'
import LabelControl from './LabelControl'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import { changeFormDir } from './styleHelpers'
import bitformDefaultTheme from './themes/bitformDefault/1_bitformDefault'
import individual from './themes/individual/individual'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function ThemeQuickTweaksCustomizer() {
  const { css } = useFela()
  const { fieldKey, element, formType } = useParams()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [styles, setStyles] = useRecoilState($styles)
  const fields = useRecoilValue($fields)
  const { '--dir': direction } = themeVars
  const tmpStyles = useRecoilValue($savedStyles)
  const tmpThemeColors = useRecoilValue($savedThemeColors)
  const tmpThemeVars = useRecoilValue($savedThemeVars)
  const { '--global-accent-color': globalPrimaryColor,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--global-fld-bg-color': globalFldBgClr } = themeColors

  const setSizes = ({ target: { value } }) => {
    const tmpThemeVar = deepCopy(themeVars)

    setStyles(prvStyles => produce(prvStyles, draft => {
      draft.fieldsSize = value
      const flds = prvStyles.fields
      const fldKeyArr = Object.keys(flds)
      const fldKeyArrLen = fldKeyArr.length
      for (let i = 0; i < fldKeyArrLen; i += 1) {
        const fldKey = fldKeyArr[i]
        const updateStyle = updateFieldStyleByFieldSizing(flds[fldKey], fldKey, flds[fldKey].fieldType, value, tmpThemeVar)
        draft.fields[fldKey] = updateStyle
      }
    }))

    setThemeVars(tmpThemeVar)
    reCalculateFldHeights()
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Size', value, {
      styles: getLatestState('styles'),
      themeVars: getLatestState('themeVars'),
    }))
  }

  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Direction', dir, { styles: getLatestState('styles'), themeVars: getLatestState('themeVars') }))
  }

  const getThemeWiseStyle = (theme, fk, type, dir) => {
    const themes = {
      bitformDefault: bitformDefaultTheme({ fieldKey: fk, type, direction: dir }),
      individual: individual({ fk, type, direction: dir }),
    }
    return themes[theme]
  }

  const resetStyle = () => {
    const existingFields = Object.keys(styles.fields)
    const previousFields = Object.keys(tmpStyles.fields)

    setStyles(prv => produce(prv, drft => {
      existingFields.forEach((fldKey) => {
        if (previousFields.includes(fldKey)) {
          drft.fields[fldKey] = tmpStyles.fields[fldKey]
        } else {
          drft.fields[fldKey] = getThemeWiseStyle(
            styles.fields[fldKey].theme,
            fldKey,
            fields[fldKey].typ,
            tmpThemeVars['--dir'],
          )
        }
      })

      drft.font = tmpStyles.font
      drft.theme = tmpStyles.theme
      drft.fieldSize = tmpStyles.fieldSize
      drft.form = tmpStyles.form
    }))
    setThemeVars(tmpThemeVars)
    setThemeColors(tmpThemeColors)
    reCalculateFldHeights()
    addToBuilderHistory(
      generateHistoryData(
        element,
        fieldKey,
        'Reset All Styles',
        '',
        {
          styles: getLatestState('styles'),
          themeVars: getLatestState('themeVars'),
          themeColors: getLatestState('themeColors'),
        },
      ),
    )
    hideAll()
  }

  return (
    <>
      {formType === 'edit' && (
        <div className={css(ut.flxcb)}>
          <Downmenu>
            <Btn dataTestId="style-reset-btn" size="sm" gap={5} variant="primary-outline">
              <StyleResetIcn size={12} />
              {__('Reset Style')}
            </Btn>
            <div>
              <div className={css({ mt: 5, mb: 10 }, ut.fw500)}>Confirm reset style?</div>
              <Btn
                onClick={resetStyle}
                width="100%"
                dataTestId="style-reset-confirm"
                size="sm"
                className={css({ mb: 5, mx: 'auto' })}
              >
                Confirm

              </Btn>
            </div>
          </Downmenu>
        </div>
      )}
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
        hslaPaths={{ h: '--gfh', s: '--gfs', l: '--gfl', a: '--gfa' }}
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
      {/* <ThemeStylePropertyBlock label="Outline">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={['--g-bdr-width', '--g-bdr-rad']}
            stateObjName="themeVars"
            id="g-bdr"
          />
          <OutlineControl
            subtitle="Theme Quick Tweaks Outline Color"
            objectPaths={outlinePathsObj}
            id="global-outline"
            hslaPaths={{ h: '--gfbc-h', s: '--gfbc-s', l: '--gfbc-l', a: '--gfbc-a' }}
          />
        </div>
      </ThemeStylePropertyBlock> */}

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
          defaultValue={styles.fieldsSize}
          onChange={setSizes}
          className={css(sc.select)}
          data-testid="field-sizes-select"
        >
          {Object.keys(sizes).map((key, index) => (
            <option
              key={`size-${index * 5 * 2}`}
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

      {/* <SimpleColorPicker
        title="Field Wrapper Background Color"
        subtitle="Theme Quick Tweaks Background Color"
        value={globalBgColor}
        stateObjName="themeColors"
        propertyPath="--global-bg-color"
        modalId="global-bg-clr"
      /> */}
      <SimpleColorPicker
        title="Form Background"
        subtitle="Theme Quick Tweaks Background Color"
        value={globalBgColor}
        stateObjName="themeColors"
        propertyPath="--global-bg-color"
        modalId="global-bg-clr"
        hslaPaths={{ h: '--gbg-h', s: '--gbg-s', l: '--gbg-l', a: '--gbg-a' }}
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
      'border-style': '--global-fld-bdr',
      'border-width': '--g-bdr-width',
      'border-radius': '--g-bdr-rad',
    },
  },
  {
    object: 'themeColors',
    paths: { 'border-color': '--global-fld-bdr-clr' },
  },
]

// const outlinePathsObj = {
//   object: 'themeVars',
//   paths: {
//     outline: '--global-outline',
//     'outline-offset': '--global-outline-offset',
//   },
// }
// const outlinePathsObj = [
//   {
//     object: 'themeVars',
//     paths: {
//       'outline-width': '--g-o-w',
//       'outline-offset': '--g-o-offset',
//       'outline-style': '--g-o-s',
//     },
//   },
//   {
//     object: 'themeColors',
//     paths: {
//       'outline-color': '--g-o-c',
//     },
//   },
// ]

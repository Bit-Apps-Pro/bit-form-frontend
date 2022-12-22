/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import { staticFontStyleVariants, staticFontweightVariants } from '../../Utils/StaticData/fontvariant'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import ResetStyle from './ResetStyle'
import { arrayToObject } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function FontWeightAndStyleControl({ fontWeightVar, fontStyleVar, id }) {
  const { css } = useFela()
  const { fieldKey, element } = useParams()
  const styles = useRecoilValue($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)

  const fontVarSetHandler = (varName, val) => {
    setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
      drft[varName] = val
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, varName, val, { themeVars: getLatestState('themeVars') }))
  }
  const fontweightVariants = styles.font?.fontWeightVariants.length ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font?.fontStyle.length ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants

  // check if font style or weight is available in the font object
  const isFontStyleOrWeightAvailable = (varName, variant) => {
    if (styles.font?.fontType === 'Google' && themeVars[varName] && !styles.font[variant]?.includes(Number(themeVars[varName]))) {
      return true
    }
    return false
  }
  return (
    <>
      <ThemeStylePropertyBlock label="Font Style">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fontStyleVar}
            stateObjName="themeVars"
            id={`${id}-fs`}
          />
          <div className={css(cls.comSection)}>
            <SimpleDropdown
              options={fontStyleVariants}
              value={String(themeVars[fontStyleVar])}
              onChange={val => fontVarSetHandler(fontStyleVar, val)}
              w={130}
              h={30}
              id={`${id}-fs`}
              cls={css(isFontStyleOrWeightAvailable(fontStyleVar, 'fontStyleVariants') ? cls.warningBorder : '')}
            />
            {isFontStyleOrWeightAvailable(fontStyleVar, 'fontStyleVariants') && <span className={css(cls.clr)}>Font style not found!</span>}
            <span className={css(cls.clr)}>Font style not found!</span>
          </div>
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Font Weight">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fontWeightVar}
            stateObjName="themeVars"
            id={`${id}-fw`}
          />
          <div className={css(cls.comSection)}>
            <SimpleDropdown
              options={fontweightVariants}
              value={String(themeVars[fontWeightVar])}
              onChange={val => fontVarSetHandler(fontWeightVar, val)}
              w={130}
              h={30}
              id={`${id}-fw`}
              cls={css(isFontStyleOrWeightAvailable(fontStyleVar, 'fontWeightVariants') ? cls.warningBorder : '')}
            />
            {isFontStyleOrWeightAvailable(fontStyleVar, 'fontWeightVariants') && <span className={css(cls.clr)}>Font weight not found!</span>}
          </div>
        </div>
      </ThemeStylePropertyBlock>
    </>
  )
}

const cls = {
  warningBorder: { b: '1px solid yellow' },
  comSection: {
    dy: 'flex',
    fd: 'column',
  },
  clr: { cr: 'red' },
}

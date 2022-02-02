/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { staticFontStyleVariants, staticFontweightVariants } from '../../Utils/StaticData/fontvariant'
import SimpleDropdown from '../Utilities/SimpleDropdown'
import ResetStyle from './ResetStyle'
import { arrayToObject } from './styleHelpers'
import ThemeStylePropertyBlock from './ThemeStylePropertyBlock'

export default function FontWeightAndStyleControl({ fontWeightVar, fontStyleVar }) {
  const { css } = useFela()
  const styles = useRecoilValue($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)

  const fontVarSetHandler = (varName, val) => {
    setThemeVars(prvThemeVars => produce(prvThemeVars, drft => {
      drft[varName] = val
    }))
  }

  const fontweightVariants = styles.font.fontWeightVariants.length !== 0 ? arrayToObject(styles.font.fontWeightVariants) : staticFontweightVariants
  const fontStyleVariants = styles.font.fontStyle.length !== 0 ? arrayToObject(styles.font.fontStyle) : staticFontStyleVariants
  return (
    <>
      <ThemeStylePropertyBlock label="Font Weight">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fontWeightVar}
            stateObjName="themeVars"
          />
          <SimpleDropdown
            options={fontweightVariants}
            value={String(themeVars[fontWeightVar])}
            onChange={val => fontVarSetHandler(fontWeightVar, val)}
            w={130}
            h={30}
            cls={css((styles.font.fontType === 'Google' && themeVars[fontWeightVar] && !styles.font.fontWeightVariants.includes(Number(themeVars[fontWeightVar]))) || cls.warningBorder)}
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Font Style">
        <div className={css(ut.flxc)}>
          <ResetStyle
            propertyPath={fontStyleVar}
            stateObjName="themeVars"
          />
          <SimpleDropdown
            options={fontStyleVariants}
            value={String(themeVars[fontStyleVar])}
            onChange={val => fontVarSetHandler(fontStyleVar, val)}
            w={130}
            h={30}
            cls={css((styles.font.fontType === 'Google' && themeVars[fontStyleVar] && !styles.font.fontStyleVariants.includes(Number(themeVars[fontStyleVar]))) || cls.warningBorder)}
          />
        </div>
      </ThemeStylePropertyBlock>
    </>
  )
}
const cls = { warningBorder: { b: '1px solid yellow' } }

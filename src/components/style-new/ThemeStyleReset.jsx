import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useAtom, useAtomValue, useSetAtom } from 'recoil'
import { $savedStyles, $savedThemeVars } from '../../GlobalStates/SavedStylesAndVars'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import st from '../../styles/ResetButton.style'
import Tip from '../Utilities/Tip'

export default function ThemeStyleReset({ id, fk }) {
  const { css } = useFela()
  const saveStyles = useAtomValue($savedStyles) || {}
  const [styles, setStyles] = useAtom($styles)
  const setThemeVars = useSetAtom($themeVars)
  const savedThemeVars = useAtomValue($savedThemeVars)

  const previousFieldsStyle = Object.keys(saveStyles?.fields || {})
  let show = false

  if (!((styles && 'fields' in styles) || (saveStyles && 'fields' in saveStyles))) {
    console.error('ResetStyle: styles or saveStyles does not have fields')
  }

  if (fk) {
    show = ('fields' in styles && styles.fields[fk]?.fieldSize) !== ('fields' in saveStyles && saveStyles?.fields[fk]?.fieldSize)
  } else {
    show = ('fields' in styles && styles?.fieldsSize) !== ('fields' in saveStyles && saveStyles?.fieldsSize)
  }

  const resetStyle = () => {
    setStyles(prvStyle => create(prvStyle, draft => {
      if (fk) {
        draft.fields[fk].fieldSize = saveStyles?.fields[fk].fieldSize
        draft.fields[fk].classes = saveStyles?.fields[fk].classes
      } else {
        draft.fieldsSize = saveStyles?.fieldsSize
        previousFieldsStyle.forEach(fldKey => {
          draft.fields[fldKey].fieldSize = saveStyles?.fields[fldKey].fieldSize
          draft.fields[fldKey].classes = saveStyles?.fields[fldKey].classes
        })
      }
    }))
    if (!fk) {
      setThemeVars(savedThemeVars)
    }
  }

  if (!show) return null
  return (
    <Tip msg="Reset style">
      <button
        onClick={resetStyle}
        className={css(st.resetBtn)}
        type="button"
        data-testid={`${id}-reset-style`}
      >
        <StyleResetIcn size="20" />
      </button>
    </Tip>
  )
}

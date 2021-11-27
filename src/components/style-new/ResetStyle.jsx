import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $tempStyles, $themeVars } from '../../GlobalStates'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'

export default function ResetStyle({ themeVar }) {
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const setThemeVars = useSetRecoilState($themeVars)
  const { css } = useFela()

  const resetValue = val => {
    if (!tempThemeVars[val]) return
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      // eslint-disable-next-line no-param-reassign
      drft[val] = tempThemeVars[val]
    }))
  }

  const reset = (value) => {
    if (Array.isArray(value)) value.forEach(v => resetValue(v))
    else resetValue(value)
  }
  return (
    <button onClick={() => reset(themeVar)} className={css(sc.resetBtn)} type="button">
      <StyleResetIcn size="40" />
    </button>
  )
}

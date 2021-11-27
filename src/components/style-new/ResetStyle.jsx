import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'
import UndoIcon from '../../Icons/UndoIcon'

export default function ResetStyle({ themeVar, stateName }) {
  const { themeColors, themeVars } = useRecoilValue($tempStyles)
  const setThemeColor = useSetRecoilState($themeColors)
  const setThemeVar = useSetRecoilState($themeVars)
  const { css } = useFela()

  const resetValue = val => {
    if (stateName === 'themeVars') {
      console.log(stateName, themeVars[val])
      if (!themeVars[val]) return
      setThemeVar(prvStyle => produce(prvStyle, drft => { drft[val] = themeVars[val] }))
    }
    if (stateName === 'themeColors') {
      console.log(stateName, themeVars[val])
      if (!themeColors[val]) return
      setThemeColor(prvStyle => produce(prvStyle, drft => { drft[val] = themeColors[val] }))
    }
  }

  const reset = (value) => {
    console.log('reset value', value, stateName)
    if (Array.isArray(value)) value.forEach(v => resetValue(v))
    else resetValue(value)
  }
  return (
    <button onClick={() => reset(themeVar)} className={css(cls.btn)} type="button">
      <UndoIcon size="20" />
    </button>
  )
}

const cls = {
  btn: {
    b: 'none',
    oe: 'none',
    brs: 8,
    bc: 'var(--white-0-95)',
    cur: 'pointer',
    mr: 5,
  },
}

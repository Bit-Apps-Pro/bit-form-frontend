import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $tempStyles, $themeVars } from '../../GlobalStates'
import UndoIcon from '../../Icons/UndoIcon'

export default function ResetStyle({ themeVar }) {
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const setThemeVars = useSetRecoilState($themeVars)
  const { css } = useFela()

  const resetValue = val => {
    if (!tempThemeVars[val]) return
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[val] = tempThemeVars[val]
    }))
  }

  const reset = (value) => {
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

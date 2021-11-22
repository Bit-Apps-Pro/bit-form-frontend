import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $tempThemeVars, $themeVars } from '../../GlobalStates'
import UndoIcon from '../../Icons/UndoIcon'

export default function ResetStyle({ themeVar }) {
  const tempThemeVars = useRecoilValue($tempThemeVars)
  const setThemeVars = useSetRecoilState($themeVars)
  const { css } = useFela()

  const reset = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[value] = tempThemeVars[value]
    }))
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

import { useFela } from 'react-fela'
import FocusIcn from '../../Icons/FocusIcn'
import { highlightElm, removeHightlight } from './styleHelpers'

const HighlightElm = ({ selector }) => {
  const { css } = useFela()
  return (
    <div
      onMouseEnter={() => highlightElm(selector)}
      onMouseLeave={() => removeHightlight()}
      className={css(s.highlt)}
    >
      <FocusIcn size="18" />
    </div>
  )
}

export default HighlightElm

const s = {
  highlt: {
    w: 20,
    h: 20,
    curp: 1,
    flx: 'center',
    brs: 8,
    mr: 5,
    cr: 'var(--white-2-47)',
    ':hover': {
      bd: 'var(--white-0-95)',
      bs: '0 0 0 2px var(--white-0-95)',
      cr: 'var(--b-54-12)',
    },
  },
}

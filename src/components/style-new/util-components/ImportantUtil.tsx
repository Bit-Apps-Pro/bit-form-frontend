import { useAtom } from 'jotai'
import { useFela } from 'react-fela'
import { $styles } from '../../GlobalStates/StylesState'
import StarIcn from '../../Icons/StarIcn'
import Tip from '../Utilities/Tip'

export default function ImportantUtil({ value, className, addOrRemoveImportant }) {
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  const isAlreadyImportant = () => {
    if (value?.match(/(!important)/gi)?.[0]) return true
    return false
  }
  const isStyleValueEmptyOrCssVar = () => (styleValue === '' || styleValue?.match(/(var)/gi)) ?? false
  const props = Object.keys(paths)

  return (x
    <Tip msg="Set style as !important">
      <button
        style={{ visibility: isStyleValueEmptyOrCssVar() ? 'visible' : 'visible' }}
        className={`${css(cls.btn, isAlreadyImportant() && cls.active)} ${className}`}
        type="button"
        onClick={addOrRemoveImportant}
        data-testid={`${id}-important`}
      >
        <StarIcn size="12" />
      </button>
    </Tip>
  )
}

const cls = {
  btn: {
    se: 20,
    flx: 'center',
    p: 2,
    oe: 'none',
    brs: '50%',
    b: 'none',
    curp: 1,
    bd: 'none',
    cr: 'var(--white-0-0-29)',
    ':hover': { bd: 'var(--white-0-95)', cr: 'var(--white-0-29)' },
  },
  active: { cr: 'var(--b-50) !important' },
}

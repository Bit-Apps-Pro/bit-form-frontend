import { useFela } from 'react-fela'
import StarIcn from '../../../Icons/StarIcn'
import Tip from '../../Utilities/Tip'


type importantProps = {
  value: string
  className?: string
  addOrRemoveImportant: (newStyle:string) => void
}

export default function ImportantUtil({ value, className, addOrRemoveImportant }: importantProps) {
  const { css } = useFela()
  const isAlreadyImportant = ():boolean => {
    if (value?.match(/(!important)/gi)?.[0]) return true
    return false
  }
  const isStyleValueEmptyOrCssVar = () => (value === '' || value?.match(/(var)/gi)) ?? false

  const addImportantChangeHandler = () => {
    let newStyleValue: string

    if (isAlreadyImportant()) {
      newStyleValue = value?.replace(/!important/gi, '')
    } else {
      newStyleValue = `${value} !important`
    }
    addOrRemoveImportant(newStyleValue)
  }


  return (
    <Tip msg="Set style as !important" className={""}>
      <button
        style={{ visibility: isStyleValueEmptyOrCssVar() ? 'visible' : 'visible' }}
        className={`${css(cls.btn, isAlreadyImportant() ? cls.active: {})} ${className}`}
        type="button"
        onClick={addImportantChangeHandler}
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

import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useAtom } from 'jotai'
import { $styles } from '../../GlobalStates/StylesState'
import StarIcn from '../../Icons/StarIcn'
import Tip from '../Utilities/Tip'
import { assignNestedObj, getValueByObjPath } from './styleHelpers'

export default function Important({ paths = {}, propertyPath, className, id }) {
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  const styleValue = styles?.fields && getValueByObjPath(styles, propertyPath)
  const isAlreadyImportant = () => {
    if (typeof styleValue === 'number') return false
    if (styleValue?.match(/(!important)/gi)?.[0]) return true
    return false
  }

  const isStyleValueEmptyOrCssVar = () => {
    if (typeof styleValue === 'number') return true
    if (styleValue === '' || styleValue === null || styleValue?.match(/(var)/gi)?.[0]) return true
    return false
  }
  const props = Object.keys(paths)
  const addOrRemoveImportant = () => {
    let newStyleValue

    if (isAlreadyImportant()) {
      newStyleValue = styleValue?.replace(/!important/gi, '')
    } else {
      newStyleValue = `${styleValue} !important`
    }
    setStyles(prvStyle => create(prvStyle, drft => {
      assignNestedObj(drft, propertyPath, newStyleValue)
      props.map(propName => {
        if (isAlreadyImportant()) {
          assignNestedObj(drft, paths[propName], getValueByObjPath(styles, paths[propName]).replace(/!important/gi, ''))
        } else {
          assignNestedObj(drft, paths[propName], `${getValueByObjPath(styles, paths[propName])} !important`)
        }
      })
    }))
  }

  return (
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

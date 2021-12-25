import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates'
import StarIcn from '../../Icons/StarIcn'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Tip from '../Utilities/Tip'
import { getValueByObjPath } from './styleHelpers'

export default function Important({ propertyPath, className }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const getValue = styles?.fields && getValueByObjPath(styles, propertyPath)
  const isAlreadyImportant = getValue?.match(/!important/gi)

  const addOrRemoveImportant = () => {
    let newValue
    if (isAlreadyImportant) {
      newValue = getValue.replace(/!important/gi, '')
    } else {
      newValue = `${getValue} !important`
    }
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, propertyPath, newValue)
    }))
  }

  return (
    <Tip msg="Set style as !important">
      <button
        className={`${css(cls.btn, isAlreadyImportant && cls.active)} ${className}`}
        type="button"
        onClick={addOrRemoveImportant}
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

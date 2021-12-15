import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { getStyleValueFromObjectPath } from './styleHelpers'

export default function Important({ propertyPath, allowImportant }) {
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const getValue = styles && Object.keys(styles).length > 0 && getStyleValueFromObjectPath(styles, propertyPath)
  const checkExistImportant = getValue?.match(/!important/gi)?.[0]

  const addAndRemoveImportant = () => {
    let newValue
    if (checkExistImportant) {
      newValue = getValue.replace(/!important/gi, '')
    } else {
      newValue = `${getValue} !important`
    }
    setStyles(prvStyle => produce(prvStyle, drft => {
      assignNestedObj(drft, propertyPath, newValue)
    }))
  }
  return (
    <>
      {allowImportant && (
        <button
          className={css(cls.btn, checkExistImportant && cls.active)}
          title="Important"
          type="button"
          onClick={addAndRemoveImportant}
        >
          i
        </button>
      )}
    </>
  )
}

const cls = {
  btn: {
    oe: 'none',
    brs: '50%',
    b: '1px solid var(--white-0-89)',
  },
  active: {
    b: '1px solid var(--b-92-62)',
    cr: 'var(--b-92-62)',
  },
}

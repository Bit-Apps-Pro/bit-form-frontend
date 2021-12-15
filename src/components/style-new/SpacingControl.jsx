import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import produce from 'immer'
import { $draggableModal, $styles } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'
import CloseIcn from '../../Icons/CloseIcn'

export default function SpacingControl({ subtitle, action, value, objectPaths, id }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const [styles, setStyles] = useRecoilState($styles)

  const { object, paths } = objectPaths
  let val
  if (value) val = `margin: ${value.margin}, padding: ${value.padding}`

  const clearHandler = () => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (object === 'fieldStyle' && paths.margin) {
        drft.fields[paths.fk].classes[paths.selector][paths.margin] = ''
      }
      if (object === 'fieldStyle' && paths.padding) {
        drft.fields[paths.fk].classes[paths.selector][paths.padding] = ''
      }
    }))
  }
  if (object === 'fieldStyle' && paths.margin) {
    val = styles.fields[paths.fk].classes[paths.selector][paths.margin]
  }
  if (object === 'fieldStyle' && paths.padding) {
    val = styles.fields[paths.fk].classes[paths.selector][paths.padding]
  }
  return (
    <div className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
      <button
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'space-control', subtitle, action, value, objectPaths, id })}
        type="button"
        className={css(c.pickrBtn)}
      >
        <span>{val || 'Configure'}</span>
      </button>
      {(val) && (
        <button title="Clear Value" onClick={clearHandler} className={css(c.clearBtn)} type="button" aria-label="Clear Color">
          <CloseIcn size="12" />
        </button>
      )}
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 7,
    flx: 'center-between',
    h: 30,
  },
  preview: {
    w: 25,
    h: 25,
    b: '1px solid gray',
    brs: 7,
    curp: 1,
    mr: 7,
  },
  clearBtn: {
    brs: '50%',
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}

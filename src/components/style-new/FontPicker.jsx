import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function FontPicker({ id }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  return (
    <div className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
      <button
        className={css(c.btn)}
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'font', id })}
        type="button"
      >
        Montseterrat
      </button>
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 3,
    flx: 'center-between',
    h: 30,
    fw: 500,
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
  },
  btn: { b: 'none', curp: 1 },
  clrVal: {
    w: 70,
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}

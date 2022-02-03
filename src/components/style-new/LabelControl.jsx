import { useRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function LabelControl({ id }) {
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const { css } = useFela()

  return (
    <button
      className={css(c.preview_wrp, c.btn, draggableModal.id === id && c.active)}
      onClick={e => showDraggableModal(e, setDraggableModal, { component: 'label-control', id })}
      type="button"
    >
      Configure
    </button>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    px: 5,
    py: 3,
    flx: 'center-between',
    h: 30,
    fw: 500,
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
    ta: 'left',
    pl: 5,
  },
  btn: { b: 'none', curp: 1, dy: 'block' },
  clrVal: {
    w: 70,
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
  active: { focusShadow: 1 },
}

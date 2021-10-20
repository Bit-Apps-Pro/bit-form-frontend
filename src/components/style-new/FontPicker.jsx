import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import { showDraggableModal } from '../style-new/styleHelpers'

export default function FontPicker() {
  const { css } = useFela()
  const setDraggableModal = useSetRecoilState($draggableModal)

  return (
    <div className={css(c.preview_wrp)}>
      <button
        className={css(c.btn)}
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'font' })}
        type="button"
      >
        <div />
        <span className={css(c.clrVal)}>Montseterrat</span>
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
  },
  btn: { b: 'none' },
  clrVal: {
    w: 70,
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },

}

import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import ColorPreview from './ColorPreview'
import { showDraggableModal } from './styleHelpers'

export default function SimpleColorPicker({ subtitle, action, value, id, objectPaths }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  return (
    <div className={css(c.preview_wrp, draggableModal.id === id && c.active)}>
      <button
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'color-picker', subtitle, action, value, id, objectPaths })}
        type="button"
        className={css(c.pickrBtn)}
      >
        <ColorPreview bg={value} h={24} w={24} className={css(ut.mr2)} />
        <span className={css(c.clrVal)}>{value?.replaceAll(/\(|var|\)/gi, '')}</span>
      </button>
      {/* <button className={css(c.clearBtn)} type="button" aria-label="Clear Color">
        <CloseIcn size="12" />
      </button> */}
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
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
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

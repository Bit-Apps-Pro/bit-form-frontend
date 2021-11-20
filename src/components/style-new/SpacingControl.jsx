import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import { showDraggableModal } from './styleHelpers'

export default function SpacingControl({ subtitle, action, value, objectPaths }) {
  const { css } = useFela()
  const setDraggableModal = useSetRecoilState($draggableModal)
  return (
    <div className={css(c.preview_wrp)}>
      <button
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'space-control', subtitle, action, value, objectPaths })}
        type="button"
        className={css(c.pickrBtn)}
      >
        {/* <span className={css(c.clrVal)}>{value.replaceAll(/\(|var|\)/gi, '')}</span> */}
        <span>Configure</span>
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
    p: 10,
    flx: 'center-between',
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
}

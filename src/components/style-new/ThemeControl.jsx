import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function ThemeControl({ fldKey }) {
  const setDraggableModal = useSetRecoilState($draggableModal)
  const { css } = useFela()

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'theme-control', width: 600, fldKey })
  return (
    <button className={css(cls.delBtn)} onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

const cls = {
  delBtn: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    px: 5,
    py: 3,
    flx: 'center-between',
    h: 30,
    fw: 500,
    ta: 'left',
    pl: 5,
    b: 'none',
    ':hover': { bs: '0 0 0 1px var(--white-0-83)' },
  },
}

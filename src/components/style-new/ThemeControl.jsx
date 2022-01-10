import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates/GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function ThemeControl({ fldKey }) {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'theme-control', width: 600, fldKey })
  return (
    <button onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

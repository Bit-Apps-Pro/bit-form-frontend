import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function ThemeControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'theme-control', width: 600 })
  return (
    <button onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

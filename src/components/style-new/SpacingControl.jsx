import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function SpacingControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'spacing-control' })
  return (
    <button onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

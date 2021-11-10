import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function FieldWrapperControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'field-wrapper-control' })
  return (
    <button onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

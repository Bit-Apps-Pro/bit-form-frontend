import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function FieldMarginControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleSpacingMenu = (e) => showDraggableModal(e, setDraggableModal, { component: 'field-margin-control' })
  return (
    <button onClick={handleSpacingMenu} type="button">Control Model</button>
  )
}

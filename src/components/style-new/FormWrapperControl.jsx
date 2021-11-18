import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function FormWrapperControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)

  const handleFormWrapper = (e) => showDraggableModal(e, setDraggableModal, { component: 'form-wrapper-control' })
  return (
    <button onClick={handleFormWrapper} type="button">Control Model</button>
  )
}

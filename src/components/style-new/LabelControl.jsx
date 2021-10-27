import { useSetRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import { showDraggableModal } from './styleHelpers'

export default function LabelControl() {
  const setDraggableModal = useSetRecoilState($draggableModal)
  const handleLabelControlMenu = (e) => {
    showDraggableModal(e, setDraggableModal, { component: 'label-control' })
  }

  return (
    <button onClick={handleLabelControlMenu} type="button">asdfasdf</button>
  )
}

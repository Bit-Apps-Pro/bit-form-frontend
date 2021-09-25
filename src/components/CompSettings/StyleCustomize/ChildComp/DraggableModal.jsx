import { lazy, Suspense } from 'react'
import Draggable from 'react-draggable'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $draggableModal } from '../../../../GlobalStates'
import CloseIcn from '../../../../Icons/CloseIcn'
import draggableModalStyle from '../../../../styles/draggableModal.style'

const ChildrenComp = () => {
  const BorderStyle = lazy(() => import('./BorderStyle'))

  const draggableModal = useRecoilValue($draggableModal)
  switch (draggableModal.type) {
    case 'border-style': {
      return <BorderStyle />
    }
    default:
      return 'loading'
  }
}

export default function DraggableModal() {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const { show, position } = draggableModal

  return (
    <Draggable handle=".draggable-modal-handler" bounds="parent">
      <div className={css(draggableModalStyle.container)} style={{ top: position?.y, right: position?.x, display: show ? 'block' : 'none' }}>
        <div className="flx flx-between draggable-modal-handler">
          <span className={css(draggableModalStyle.title)}>Border</span>
          <button type="button" className={css(draggableModalStyle.button)} onClick={() => setDraggableModal({ show: false })}>
            <CloseIcn size={14} />
          </button>
        </div>
        <hr className={css(draggableModalStyle.hr)} />
        <div className={css(draggableModalStyle.content)}>
          <Suspense fallback="loading">
            <ChildrenComp />
          </Suspense>
        </div>
      </div>
    </Draggable>
  )
}

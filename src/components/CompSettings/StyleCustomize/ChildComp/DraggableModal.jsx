import { lazy, Suspense } from 'react'
import Draggable from 'react-draggable'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../../../GlobalStates'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import draggableModalStyle from '../../../../styles/draggableModal.style'

const BorderStyle = lazy(() => import('./BorderStyle'))
const SimpleColorPickerMenu = lazy(() => import('../../../style-new/SimpleColorPickerMenu'))
const FontPickerMenu = lazy(() => import('../../../style-new/FontPickerMenu'))

const RenderComponent = ({ component }) => {
  switch (component) {
    case 'border-style': return <BorderStyle />
    case 'color-picker': return <SimpleColorPickerMenu />
    case 'font': return <FontPickerMenu />
    default: return 'loading'
  }
}
const setTitle = (component) => {
  switch (component) {
    case 'border-style': return 'Border'
    case 'color-picker': return 'Color picker'
    case 'font': return 'Fonts'
    default: return '...'
  }
}

export default function DraggableModal() {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const { show, position, component, width } = draggableModal

  const DragableModalLoader = () => (
    <>
      <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
        <div title="Loading..." className={`${css({ w: 70, h: 15, brs: 5 })} loader`} />
        <div title="Loading..." className={`${css({ w: 80, h: 30, brs: 5 })} loader`} />
      </div>
      <div title="Loading..." className={css(ut.flxcb)}>
        <div title="Loading..." className={`${css({ w: 70, h: 15, brs: 5 })} loader`} />
        <div title="Loading..." className={`${css({ w: 80, h: 30, brs: 5 })} loader`} />
      </div>
    </>
  )

  return show && (
    <Draggable handle=".draggable-modal-handler" bounds="parent">
      <div className={css(draggableModalStyle.container)} style={{ top: position?.y, right: position?.x, display: show ? 'block' : 'none', width }}>
        <div className={`${css([ut.flxb, draggableModalStyle.titleBar])} draggable-modal-handler`}>
          <span className={css(draggableModalStyle.title)}>{setTitle(component)}</span>
          <button type="button" className={css(draggableModalStyle.button)} onClick={() => setDraggableModal({ show: false })}>
            <CloseIcn size={10} />
          </button>
        </div>
        <hr className={css(draggableModalStyle.hr)} />
        <div className={css(draggableModalStyle.content)}>
          <Suspense fallback={<DragableModalLoader />}>
            <RenderComponent component={component} />
          </Suspense>
        </div>
      </div>
    </Draggable>
  )
}

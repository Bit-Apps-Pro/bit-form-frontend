import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../../../GlobalStates/GlobalStates'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import draggableModalStyle from '../../../../styles/draggableModal.style'
import BackgroundControlMenu from '../../../style-new/BackgroundControlMenu'
import CustomThemeGallary from '../../../style-new/CustomThemeGallary'
import FilterControlMenu from '../../../style-new/FilterControlMenu'
import FormWrapperControlMenu from '../../../style-new/FormWrapperControlMenu'
import IndividualShadowControlMenu from '../../../style-new/IndividualShadowControlMenu'
import LabelControlMenu from '../../../style-new/LabelControlMenu'
import MarginControlMenu from '../../../style-new/MarginControlMenu'
import SizeControlMenu from '../../../style-new/SizeControlMenu'
import SpaceControlMenu from '../../../style-new/SpaceControlMenu'
import SpacingControlMenu from '../../../style-new/SpacingControlMenu'
import TransformControlMenu from '../../../style-new/TransformControlMenu'
import TransitionControlMenu from '../../../style-new/TransitionControlMenu'
import BorderImageControlMenu from './BorderImageControlMenu'
import TextDecorationControlMenu from './TextDecorationControlMenu'

const BorderControlMenu = lazy(() => import('./BorderControlMenu'))
const SimpleColorsPickerMenu = lazy(() => import('../../../style-new/SimpleColorsPickerMenu'))
const FontPickerMenu = lazy(() => import('../../../style-new/FontPickerMenu'))
const ShadowControlMenu = lazy(() => import('../../../style-new/ShadowControlMenu'))

const RenderComponent = ({ component, action, value, defaultValue, objectPaths, state, id, stateObjName, propertyPath, propertyArray, fldKey, hslaPaths }) => {
  switch (component) {
    case 'border-style': return <BorderControlMenu objectPaths={objectPaths} state={state} />
    case 'border-image': return <BorderImageControlMenu stateObjName={stateObjName} action={action} objectPaths={objectPaths} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    // case 'color-picker': return <SimpleColorPickerMenu action={action} value={value} objectPaths={objectPaths} />
    case 'background': return <BackgroundControlMenu stateObjName={stateObjName} action={action} objectPaths={objectPaths} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'color-picker': return <SimpleColorsPickerMenu stateObjName={stateObjName} action={action} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'individual-shadow-control': return <IndividualShadowControlMenu stateObjName={stateObjName} action={action} propertyPath={propertyPath} propertyArray={propertyArray} defaultValue={defaultValue} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'font': return <FontPickerMenu />
    case 'label-control': return <LabelControlMenu />
    case 'spacing-control': return <SpacingControlMenu />
    case 'text-decoration': return <TextDecorationControlMenu objectPaths={objectPaths} />
    case 'field-margin-control': return <MarginControlMenu />
    case 'theme-control': return <CustomThemeGallary fldKey={fldKey} />
    case 'form-wrapper-control': return <FormWrapperControlMenu />
    case 'space-control': return <SpaceControlMenu value={value} objectPaths={objectPaths} />
    case 'size-control': return <SizeControlMenu value={value} objectPaths={objectPaths} />
    case 'shadow-control': return <ShadowControlMenu objectPaths={objectPaths} />
    case 'transition-control': return <TransitionControlMenu stateObjName={stateObjName} propertyPath={propertyPath} />
    case 'transform-control': return <TransformControlMenu stateObjName={stateObjName} propertyPath={propertyPath} />
    case 'filter-control': return <FilterControlMenu value={value} objectPaths={objectPaths} />
    default: return 'loading'
  }
}

const setTitle = (component) => {
  switch (component) {
    case 'border-style': return 'Border'
    case 'border-image': return 'Border Image'
    case 'color-picker': return 'Color picker'
    case 'background': return 'Background Control'
    case 'individual-shadow-control': return 'Shadow control'
    case 'font': return 'Fonts'
    case 'label-control': return 'Label Placement Control'
    case 'spacing-control': return 'Label Spacing Control'
    case 'text-decoration': return 'Text Decoration'
    case 'field-margin-control': return 'Field Margin Control'
    case 'theme-control': return 'Theme Gallary'
    case 'form-wrapper-control': return 'Form Wrapper'
    case 'space-control': return 'Margin & Padding Control'
    case 'size-control': return 'Width,Height Control'
    case 'shadow-control': return 'Shadow'
    case 'transition-control': return 'Transition'
    case 'transform-control': return 'Transform Control'
    case 'filter-control': return 'Filter Control'
    default: return '...'
  }
}

function DraggableModal({ setBuilderPointerEventNone }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const { show, position, component, width, stateObjName, propertyPath, propertyArray, mainTitle, subtitle, action, value, defaultValue, objectPaths, state, id, fldKey, hslaPaths } = draggableModal
  const [pos, setPos] = useState('')
  const dragableRef = useRef(null)
  useEffect(() => {
    setPos({ ...position })
  }, [position])

  if (!show) return <></>

  return (
    <Draggable
      ref={dragableRef}
      bounds="parent"
      handle=".draggable-modal-handle"
      position={pos !== null ? position : pos}
      onMouseDown={() => setPos(null)}
      onStart={() => setBuilderPointerEventNone(true)}
      onStop={() => setBuilderPointerEventNone(false)}
    >
      <div className={css(draggableModalStyle.container)} style={{ width, ...pos && { transition: 'transform .2s' } }}>
        {/* style={{ top: position?.y, right: position?.x, display: show ? 'block' : 'none', width }} */}
        <div className={`${css([ut.flxb, draggableModalStyle.titleBar])} draggable-modal-handle`}>
          <div className={css(ut.flxClm, draggableModalStyle.titleContainer)}>
            <span className={css(draggableModalStyle.title)}>{mainTitle || setTitle(component)}</span>
            <span className={css(ut.fontBody, { fs: 10, mx: 3, cr: 'var(--white-0-50)' })}>{subtitle}</span>
          </div>
          <button type="button" className={css(draggableModalStyle.button)} onClick={() => setDraggableModal({ show: false })}>
            <CloseIcn size={10} />
          </button>
        </div>
        <hr className={css(draggableModalStyle.hr)} />
        <div className={css(draggableModalStyle.content)}>
          <Suspense fallback={<DragableModalLoader />}>
            <RenderComponent
              component={component}
              action={action}
              value={value}
              defaultValue={defaultValue}
              objectPaths={objectPaths}
              state={state}
              id={id}
              stateObjName={stateObjName}
              propertyPath={propertyPath}
              propertyArray={propertyArray}
              fldKey={fldKey}
              hslaPaths={hslaPaths}
            />
          </Suspense>
        </div>
      </div>
    </Draggable>
  )
}

export default memo(DraggableModal)

const DragableModalLoader = () => {
  const { css } = useFela()
  return (
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
}

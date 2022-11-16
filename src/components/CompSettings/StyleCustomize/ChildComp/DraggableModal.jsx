/* eslint-disable react/jsx-no-useless-fragment */
import { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useFela } from 'react-fela'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../../../GlobalStates/GlobalStates'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import draggableModalStyle from '../../../../styles/draggableModal.style'
import BackgroundControlMenu from '../../../style-new/BackgroundControlMenu'
import CustomThemeGallary from '../../../style-new/CustomThemeGallary'
import FilterColorsPickerMenu from '../../../style-new/FilterColorsPickerMenu'
import FilterControlMenu from '../../../style-new/FilterControlMenu'
import FormWrapperControlMenu from '../../../style-new/FormWrapperControlMenu'
import IndividualShadowControlMenu from '../../../style-new/IndividualShadowControlMenu'
import LabelControlMenu from '../../../style-new/LabelControlMenu'
import SizeControlMenu from '../../../style-new/SizeControlMenu'
import SpaceControlMenu from '../../../style-new/SpaceControlMenu'
import SpacingControlMenu from '../../../style-new/SpacingControlMenu'
import TransformControlMenu from '../../../style-new/TransformControlMenu'
import TransitionControlMenu from '../../../style-new/TransitionControlMenu'
import BorderImageControlMenu from './BorderImageControlMenu'
import TextDecorationControlMenu from './TextDecorationControlMenu'

const BorderControlMenu = lazy(() => import('./BorderControlMenu'))
const OutlineControlMenu = lazy(() => import('./OutlineControlMenu'))
const SimpleColorsPickerMenu = lazy(() => import('../../../style-new/SimpleColorsPickerMenu'))
const FontPickerMenu = lazy(() => import('../../../style-new/FontPickerMenu'))
const ShadowControlMenu = lazy(() => import('../../../style-new/ShadowControlMenu'))

const RenderComponent = ({
  component, action, value, defaultValue, objectPaths, id, canSetVariable, stateObjName, propertyPath, propertyArray, fldKey, hslaPaths,
}) => {
  switch (component) {
    case 'border-style': return <BorderControlMenu objectPaths={objectPaths} hslaPaths={hslaPaths} id={id} />
    case 'outline-style': return <OutlineControlMenu objectPaths={objectPaths} hslaPaths={hslaPaths} id={id} />
    case 'border-image': return <BorderImageControlMenu stateObjName={stateObjName} action={action} objectPaths={objectPaths} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    // case 'color-picker': return <SimpleColorPickerMenu action={action} value={value} objectPaths={objectPaths} />
    case 'background': return <BackgroundControlMenu stateObjName={stateObjName} action={action} objectPaths={objectPaths} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'color-picker': return <SimpleColorsPickerMenu canSetVariable={canSetVariable} stateObjName={stateObjName} action={action} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'filter-color': return <FilterColorsPickerMenu stateObjName={stateObjName} action={action} objectPaths={objectPaths} propertyPath={propertyPath} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'individual-shadow-control': return <IndividualShadowControlMenu stateObjName={stateObjName} action={action} propertyPath={propertyPath} propertyArray={propertyArray} defaultValue={defaultValue} id={id} hslaPaths={hslaPaths} fldKey={fldKey} />
    case 'font': return <FontPickerMenu id={id} />
    case 'label-control': return <LabelControlMenu />
    case 'spacing-control': return <SpacingControlMenu />
    case 'text-decoration': return <TextDecorationControlMenu objectPaths={objectPaths} id={id} />
    case 'theme-control': return <CustomThemeGallary fldKey={fldKey} />
    case 'form-wrapper-control': return <FormWrapperControlMenu />
    case 'space-control': return <SpaceControlMenu value={value} objectPaths={objectPaths} id={id} />
    case 'size-control': return <SizeControlMenu value={value} objectPaths={objectPaths} />
    case 'shadow-control': return <ShadowControlMenu objectPaths={objectPaths} id={id} />
    case 'transition-control': return <TransitionControlMenu stateObjName={stateObjName} propertyPath={propertyPath} id={id} />
    case 'transform-control': return <TransformControlMenu stateObjName={stateObjName} propertyPath={propertyPath} id={id} />
    case 'filter-control': return <FilterControlMenu value={value} objectPaths={objectPaths} id={id} />
    case 'backdrop-filter-control': return <FilterControlMenu title="Backdrop-Filter" value={value} objectPaths={objectPaths} id={id} />
    default: return 'loading'
  }
}

const setTitle = (component) => {
  const titles = {
    'border-style': 'Border',
    'outline-style': 'Outline',
    'border-image': 'Border Image',
    'color-picker': 'Color picker',
    background: 'Background',
    'individual-shadow-control': 'Shadow',
    font: 'Fonts',
    'label-control': 'Label Placement',
    'spacing-control': 'Label Spacing',
    'text-decoration': 'Text Decoration',
    'theme-control': 'Theme Gallery',
    'form-wrapper-control': 'Form Wrapper',
    'space-control': 'Margin & Padding',
    'size-control': 'Width & Height',
    'shadow-control': 'Shadow',
    'transition-control': 'Transition',
    'transform-control': 'Transform',
    'filter-control': 'Filter',
    'backdrop-filter-control': 'Backdrop Filter',
    'filter-color': 'Filter Color',
  }
  return titles[component] || '...'
}

function DraggableModal({ setBuilderPointerEventNone }) {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const {
    show, position, component, width, stateObjName, propertyPath, propertyArray, mainTitle, subtitle, action, value, defaultValue, objectPaths, state, id, fldKey, hslaPaths, canSetVariable,
  } = draggableModal
  const location = useLocation()
  const [pos, setPos] = useState('')
  const draggableRef = useRef(null)
  useEffect(() => {
    setPos({ ...position })
  }, [position])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDraggableModal({ show: false }), [location])
  if (!show) return <></>

  return (
    <Draggable
      ref={draggableRef}
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
            <span className={css(draggableModalStyle.subTitle, ut.fontBody)}>{subtitle}</span>
          </div>
          <button
            data-testid="draggable-modal-close-btn"
            type="button"
            className={css(draggableModalStyle.button)}
            onClick={() => setDraggableModal({ show: false })}
          >
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
              canSetVariable={canSetVariable}
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

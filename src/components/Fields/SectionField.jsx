import { produce } from 'immer'
import { Suspense, useRef } from 'react'
import { default as ReactGridLayout } from 'react-grid-layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $isDraggable } from '../../GlobalStates/FormBuilderStates'
import {
  $breakpoint, $contextMenu, $contextMenuRef, $deletedFldKey, $draggingField, $fields,
  $flags,
  $nestedLayouts, $proModal,
  $resizingFld,
  $selectedFieldId, $uniqueFieldId,
} from '../../GlobalStates/GlobalStates'
import { $staticStylesState } from '../../GlobalStates/StaticStylesState'
import { $styles } from '../../GlobalStates/StylesState'
import { getNestedLayoutHeight, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy, isObjectEmpty } from '../../Utils/Helpers'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import {
  addNewFieldToGridLayout, cloneLayoutItem,
  removeLayoutItem, setResizingFldKey, setResizingWX,
} from '../../Utils/gridLayoutHelpers'
import FieldBlockWrapper from '../FieldBlockWrapper'
import InputWrapper from '../InputWrapper'
import FieldBlockWrapperLoader from '../Loaders/FieldBlockWrapperLoader'
import RenderStyle from '../style-new/RenderStyle'
import { getAbsoluteSize } from '../style-new/styleHelpers'

/* eslint-disable react/jsx-props-no-spreading */
export default function SectionField({
  fieldKey, attr: fieldData, styleClasses, formID,
}) {
  const { formType } = useParams()
  const styleClassesForRender = deepCopy(styleClasses)
  const [nestedLayouts, setNestedLayouts] = useRecoilState($nestedLayouts)
  const [contextMenu, setContextMenu] = useRecoilState($contextMenu)
  const [selectedFieldId, setSelectedFieldId] = useRecoilState($selectedFieldId)
  const setDeletedFldKey = useSetRecoilState($deletedFldKey)
  const [fields, setFields] = useRecoilState($fields)
  const [styles, setStyles] = useRecoilState($styles)
  const uniqueFieldId = useRecoilValue($uniqueFieldId)
  const { styleMode } = useRecoilValue($flags)
  const setStaticStyleState = useSetRecoilState($staticStylesState)
  const setProModal = useSetRecoilState($proModal)
  const [resizingFld, setResizingFld] = useRecoilState($resizingFld)
  const delayRef = useRef(null)
  // const breakpoint = useRecoilValue($breakpoint)
  const { ref, isComponentVisible, setIsComponentVisible } = useRecoilValue($contextMenuRef)
  const breakpoint = useRecoilValue($breakpoint)
  const setIsDraggable = useSetRecoilState($isDraggable)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLayoutChange = (lay) => {
    if (lay.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setNestedLayouts(prv => produce(prv, draft => {
        if (!draft[fieldKey]) return
        draft[fieldKey][breakpoint] = lay
      }))
      // addToBuilderHistory(setBuilderHistory, { event: `Layout changed`, state: { layouts: layoutsFromGrid, fldKey: layoutsFromGrid.lg[0].i } }, setUpdateBtn)
    }
  }

  const draggingField = useRecoilValue($draggingField)

  const onDrop = (e, dropPosition) => {
    const { newLayouts } = addNewFieldToGridLayout(nestedLayouts[fieldKey], draggingField.fieldData, draggingField.fieldSize, dropPosition)
    setNestedLayouts({ ...nestedLayouts, [fieldKey]: newLayouts })
    setIsDraggable(true)
    reCalculateFldHeights(fieldKey)
  }
  const inpWrpElm = selectInGrid(`.${fieldKey}-inp-fld-wrp`)
  const absoluteSizes = inpWrpElm && getAbsoluteSize(inpWrpElm)
  const inpWrpWidth = absoluteSizes ? absoluteSizes.width - (absoluteSizes.paddingLeft + absoluteSizes.paddingRight + absoluteSizes.borderLeft + absoluteSizes.borderRight) : 0

  const resetContextMenu = () => {
    setContextMenu({})
    setIsComponentVisible(false)
  }

  const navigateToFieldSettings = () => {
    navigate(location.pathname.replace(/style\/.+|style/g, 'fs'), { replace: true })
    resetContextMenu()
  }

  const navigateToStyle = fldKey => {
    navigate(`/form/builder/${formType}/${formID}/field-theme-customize/quick-tweaks/${fldKey}`, { replace: true })
    resetContextMenu()
  }

  const handleContextMenu = (e, fldKey) => {
    e.preventDefault()
    e.stopPropagation()
    calculatePositionForContextMenu(e, fldKey)
  }

  const handleFldBlockEvent = (e, fieldId) => {
    e.stopPropagation()
    setSelectedFieldId(fieldId)
    if (!isObjectEmpty(contextMenu)) {
      setContextMenu({})
    }
    setResizingFalse()
    if (styleMode) return
    navigate(`/form/builder/${formType}/${formID}/field-settings/${fieldId}`)
  }

  const setResizingFalse = () => {
    if (isObjectEmpty(resizingFld)) return
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current)
    }

    delayRef.current = setTimeout(() => {
      setResizingFld({})
      delayRef.current = null
    }, 700)
  }

  const calculatePositionForContextMenu = (e, fldKey) => {
    // 0 - left click, 1 - middle click, 2 - right click
    const { button: mouseBtnClicked } = e

    let x
    let y
    let right
    let bottom

    const topPos = ref.current.getBoundingClientRect().top + window.scrollY
    const leftPos = ref.current.getBoundingClientRect().left + window.scrollX

    const layoutWrapperElm = selectInGrid('#layout-wrapper')
    const rootW = Number(layoutWrapperElm.style.width.match(/\d+/gi))
    const rootH = Number(layoutWrapperElm.style.height.match(/\d+/gi))

    const menuWidth = 170
    const menuHeight = 200

    if (mouseBtnClicked === 0) {
      const downBtn = selectInGrid(`[data-key="${fldKey}"]`)?.querySelector('.blk-wrp-down-btn')
      const downBtnSize = 30
      const downBtnTop = downBtn.getBoundingClientRect().top + downBtnSize
      const downBtnLeft = downBtn.getBoundingClientRect().left

      x = (downBtnLeft - leftPos) + 5
      y = (downBtnTop - topPos) + 2

      right = (x + menuWidth) > rootW
      bottom = (y + menuHeight) > rootH

      if (right) {
        x = ((downBtnLeft + downBtnSize) - leftPos) - 148
      }

      if (bottom) {
        y = (downBtnTop - topPos) - (menuHeight + downBtnSize + 7)
      }

      if (selectedFieldId !== fldKey) {
        x += 3
      }

      if (isComponentVisible && contextMenu.fldKey === fldKey && contextMenu.x === x && contextMenu.y === y) {
        resetContextMenu()
        return
      }
    } else if (mouseBtnClicked === 2) {
      x = (e.clientX - leftPos) + 5
      y = e.clientY - topPos

      right = (x + menuWidth) > rootW
      bottom = (y + menuHeight) > rootH

      if (right) {
        x = (e.clientX - leftPos) - 150
      }

      if (bottom) {
        y = (e.clientY - topPos) - menuHeight
      }
    }

    setSelectedFieldId(fldKey)
    setContextMenu({ fldKey, x, y })
    setIsComponentVisible(true)
  }

  const cloneNestedLayoutItem = fldKey => {
    const layouts = { ...nestedLayouts[fieldKey] }
    const { newLayouts } = cloneLayoutItem(fldKey, layouts)
    setNestedLayouts(prevLayout => produce(prevLayout, draftLayout => {
      draftLayout[fieldKey] = newLayouts
    }))
    reCalculateFldHeights(fieldKey)
  }

  const removeNestedLayoutItem = fldKey => {
    const layouts = { ...nestedLayouts[fieldKey] }
    const newLayouts = removeLayoutItem(fldKey, layouts)
    setNestedLayouts(prevLayout => produce(prevLayout, draftLayout => {
      draftLayout[fieldKey] = newLayouts
    }))
    navigate(`/form/builder/${formType}/${formID}/fields-list`, { replace: true })
    reCalculateFldHeights(fieldKey)
  }

  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={fieldData}
        noErrMsg
      >
        <div
          data-testid={`${fieldKey}-inp-fld-wrp`}
          // data-dev-inp-fld-wrp={fieldKey}
          className={`${fieldKey}-inp-fld-wrp ${getCustomClsName(fieldKey, 'inp-fld-wrp')}`}
          {...getCustomAttributes(fieldKey, 'inp-fld-wrp')}
        >
          <div
            style={{ width: inpWrpWidth, display: 'inline-block' }}
            // className="layout-wrapper"
            id={`${fieldKey}-layout-wrapper`}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onMouseMove={() => setIsDraggable(false)}
            onMouseLeave={() => setIsDraggable(true)}
          // onClick={resetContextMenu}
          >
            {!styleMode ? (
              <ReactGridLayout
                width={inpWrpWidth}
                measureBeforeMount
                compactType="vertical"
                useCSSTransforms
                isDroppable={draggingField !== null && breakpoint === 'lg'}
                className="layout"
                style={{ minHeight: draggingField ? getNestedLayoutHeight() + 40 : null }}
                onDrop={onDrop}
                resizeHandles={['e']}
                droppingItem={draggingField?.fieldSize}
                onLayoutChange={handleLayoutChange}
                cols={60}
                rowHeight={1}
                margin={[0, 0]}
                draggableCancel=".no-drg"
                draggableHandle=".drag"
                layout={nestedLayouts?.[fieldKey]?.[breakpoint] || []}
                // onBreakpointChange={onBreakpointChange}
                onDragStart={setResizingFldKey}
                // onDrag={setResizingWX}
                onDragStop={() => {
                  setIsDraggable(true)
                  reCalculateFldHeights(fieldKey)
                  setResizingFalse()
                }}
                onResizeStart={setResizingFldKey}
                onResize={setResizingWX}
                onResizeStop={() => {
                  setResizingFalse()
                  reCalculateFldHeights(fieldKey)
                }}
              >
                {nestedLayouts?.[fieldKey]?.[breakpoint]?.map(layoutItem => (
                  <div
                    key={layoutItem.i}
                    data-key={layoutItem.i}
                    className={`blk ${layoutItem.i === selectedFieldId && 'itm-focus'}`}
                    onClick={(e) => handleFldBlockEvent(e, layoutItem.i)}
                    onKeyDown={(e) => handleFldBlockEvent(e, layoutItem.i)}
                    role="button"
                    tabIndex={0}
                    onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                  >
                    <Suspense fallback={<FieldBlockWrapperLoader layout={layoutItem} />}>
                      <FieldBlockWrapper
                        {...{
                          layoutItem,
                          removeLayoutItem: removeNestedLayoutItem,
                          cloneLayoutItem: cloneNestedLayoutItem,
                          fields,
                          formID,
                          navigateToFieldSettings,
                          navigateToStyle,
                          handleContextMenu,
                          resizingFld,
                        }}
                      />
                    </Suspense>
                  </div>
                ))}
              </ReactGridLayout>
            ) : (
              <div className="_frm-g">
                {nestedLayouts?.[fieldKey]?.[breakpoint].map(layoutItem => (
                  <div
                    key={layoutItem.i}
                    data-key={layoutItem.i}
                    className={layoutItem.i}
                    onClick={(e) => handleFldBlockEvent(e, layoutItem.i)}
                    onKeyDown={(e) => handleFldBlockEvent(e, layoutItem.i)}
                    role="button"
                    tabIndex={0}
                    onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                  >
                    <Suspense fallback={<FieldBlockWrapperLoader layout={layoutItem} />}>
                      <FieldBlockWrapper
                        {...{
                          layoutItem,
                          removeLayoutItem: removeNestedLayoutItem,
                          cloneLayoutItem: cloneNestedLayoutItem,
                          fields,
                          formID,
                          navigateToFieldSettings,
                          navigateToStyle,
                          handleContextMenu,
                          resizingFld,
                        }}
                      />
                    </Suspense>
                  </div>
                ))}
              </div>
            )}

            {!nestedLayouts?.[fieldKey]?.[breakpoint]?.length && !draggingField && (
              <div className="empty-layout">
                <div className="empty-layout-msg">
                  <div className="empty-layout-msg-txt">
                    <span>Drag and drop fields here</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </InputWrapper>
    </>
  )
}

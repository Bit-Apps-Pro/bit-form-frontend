import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { Suspense, memo, startTransition, useEffect, useRef, useState } from 'react'
import { default as ReactGridLayout } from 'react-grid-layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { $isDraggable } from '../../GlobalStates/FormBuilderStates'
import {
  $breakpoint,
  $builderHookStates,
  $contextMenu, $contextMenuRef,
  $draggingField, $fields,
  $flags,
  $nestedLayouts,
  $proModal,
  $resizingFld,
  $selectedFieldId,
} from '../../GlobalStates/GlobalStates'
import { fitSpecificLayoutItem, getNestedLayoutHeight, handleFieldExtraAttr, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { IS_PRO, deepCopy, isObjectEmpty } from '../../Utils/Helpers'
import proHelperData from '../../Utils/StaticData/proHelperData'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import {
  addNewFieldToGridLayout,
  cloneLayoutItem,
  removeLayoutItem, setResizingFldKey, setResizingWX,
} from '../../Utils/gridLayoutHelpers'
import FieldBlockWrapper from '../FieldBlockWrapper'
import InputWrapper from '../InputWrapper'
import FieldBlockWrapperLoader from '../Loaders/FieldBlockWrapperLoader'
import RenderStyle from '../style-new/RenderStyle'
import { getAbsoluteSize } from '../style-new/styleHelpers'

/* eslint-disable react/jsx-props-no-spreading */
function SectionField({
  fieldKey, attr: fieldData, styleClasses, formID,
}) {
  const { formType } = useParams()
  const styleClassesForRender = deepCopy(styleClasses)
  const [nestedLayouts, setNestedLayouts] = useAtom($nestedLayouts)
  const [gridNestedLayouts, setGridNestedLayouts] = useState(deepCopy(nestedLayouts[fieldKey]))
  const [contextMenu, setContextMenu] = useAtom($contextMenu)
  const [selectedFieldId, setSelectedFieldId] = useAtom($selectedFieldId)
  const setProModal = useSetAtom($proModal)
  const fields = useAtomValue($fields)
  const { styleMode } = useAtomValue($flags)
  const [resizingFld, setResizingFld] = useAtom($resizingFld)
  const delayRef = useRef(null)
  const { ref, isComponentVisible, setIsComponentVisible } = useAtomValue($contextMenuRef)
  const breakpoint = useAtomValue($breakpoint)
  const builderHookStates = useAtomValue($builderHookStates)
  const setIsDraggable = useSetAtom($isDraggable)
  const { recalculateNestedField } = builderHookStates
  const { fieldKey: changedFieldKey, parentFieldKey, counter: fieldChangeCounter } = recalculateNestedField
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (fieldChangeCounter > 0 && fieldKey === parentFieldKey) {
      const nl = fitSpecificLayoutItem(gridNestedLayouts, changedFieldKey)
      setGridNestedLayouts(nl)
      startTransition(() => {
        setNestedLayouts(prevLayouts => create(prevLayouts, draftLayouts => { draftLayouts[fieldKey] = nl }))
        reCalculateFldHeights(fieldKey)
      })
    }
  }, [fieldChangeCounter, parentFieldKey, changedFieldKey])

  const handleLayoutChange = (lay) => {
    if (lay.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setGridNestedLayouts(prevLayouts => ({ ...prevLayouts, [breakpoint]: lay }))
      startTransition(() => {
        setNestedLayouts(prevLayouts => create(prevLayouts, draftLayouts => { draftLayouts[fieldKey][breakpoint] = lay }))
      })
      // addToBuilderHistory(setBuilderHistory, { event: `Layout changed`, state: { layouts: layoutsFromGrid, fldKey: layoutsFromGrid.lg[0].i } }, setUpdateBtn)
    }
  }

  const draggingField = useAtomValue($draggingField)

  const onDrop = (e, dropPosition) => {
    const dragFieldData = handleFieldExtraAttr(draggingField.fieldData, 'section')
    if (!dragFieldData) return
    const { newLayouts } = addNewFieldToGridLayout(gridNestedLayouts, dragFieldData, draggingField.fieldSize, dropPosition)
    setGridNestedLayouts(newLayouts)
    startTransition(() => {
      setIsDraggable(true)
      setNestedLayouts(prevLayouts => create(prevLayouts, draftLayouts => { draftLayouts[fieldKey] = newLayouts }))
      reCalculateFldHeights(fieldKey)
    })
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
    if (!IS_PRO) {
      setProModal({ show: true, ...proHelperData.fieldClone })
      return
    }
    const fldData = fields[fldKey]
    if (!handleFieldExtraAttr(fldData)) return
    const { newLayouts } = cloneLayoutItem(fldKey, gridNestedLayouts)
    setGridNestedLayouts(newLayouts)
    startTransition(() => {
      setNestedLayouts(prevLayouts => create(prevLayouts, draftLayouts => { draftLayouts[fieldKey] = newLayouts }))
      reCalculateFldHeights(fieldKey)
    })
  }

  const removeNestedLayoutItem = fldKey => {
    const newLayouts = removeLayoutItem(fldKey, gridNestedLayouts)
    setGridNestedLayouts(newLayouts)
    startTransition(() => {
      setNestedLayouts(prevLayouts => create(prevLayouts, draftLayouts => { draftLayouts[fieldKey] = newLayouts }))
      reCalculateFldHeights()
    })
    navigate(`/form/builder/${formType}/${formID}/fields-list`, { replace: true })
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
          data-dev-inp-fld-wrp={fieldKey}
          className={`${fieldKey}-inp-fld-wrp ${getCustomClsName(fieldKey, 'inp-fld-wrp')}`}
          {...getCustomAttributes(fieldKey, 'inp-fld-wrp')}
        >
          <div
            style={{ width: inpWrpWidth, display: 'inline-block' }}
            // className="layout-wrapper"
            id={`${fieldKey}-layout-wrapper`}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onMouseMove={() => startTransition(() => { setIsDraggable(false) })}
            onMouseLeave={() => startTransition(() => { setIsDraggable(true) })}
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
                layout={gridNestedLayouts[breakpoint]}
                // onBreakpointChange={onBreakpointChange}
                onDragStart={setResizingFldKey}
                onDrag={setResizingWX}
                onDragStop={() => {
                  startTransition(() => {
                    setIsDraggable(true)
                    reCalculateFldHeights(fieldKey)
                    setResizingFalse()
                  })
                }}
                onResizeStart={setResizingFldKey}
                onResize={setResizingWX}
                onResizeStop={() => {
                  setResizingFalse()
                  reCalculateFldHeights(fieldKey)
                }}
              >
                {gridNestedLayouts[breakpoint]?.map(layoutItem => (
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
                          navigateToFieldSettings,
                          navigateToStyle,
                          handleContextMenu,
                        }}
                      />
                    </Suspense>
                  </div>
                ))}
              </ReactGridLayout>
            ) : (
              <div className="_frm-g">
                {gridNestedLayouts[breakpoint].map(layoutItem => (
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
                          navigateToFieldSettings,
                          navigateToStyle,
                          handleContextMenu,
                        }}
                      />
                    </Suspense>
                  </div>
                ))}
              </div>
            )}

            {!gridNestedLayouts[breakpoint]?.length && !draggingField && (
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

export default memo(SectionField)

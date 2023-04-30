import produce from 'immer'
import { Suspense } from 'react'
import { default as ReactGridLayout } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $isDraggable } from '../../GlobalStates/FormBuilderStates'
import {
  $breakpoint, $draggingField, $fields, $nestedLayouts, $selectedFieldId
} from '../../GlobalStates/GlobalStates'
import { reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import { addNewFieldToGridLayout } from '../../Utils/gridLayoutHelpers'
import { deepCopy } from '../../Utils/Helpers'
import FieldBlockWrapper from '../FieldBlockWrapper'
import InputWrapper from '../InputWrapper'
import FieldBlockWrapperLoader from '../Loaders/FieldBlockWrapperLoader'
import RenderStyle from '../style-new/RenderStyle'
import { getAbsoluteSize } from '../style-new/styleHelpers'

/* eslint-disable react/jsx-props-no-spreading */
export default function SectionField({
  fieldKey, attr: fieldData, styleClasses, formID,
}) {
  const styleClassesForRender = deepCopy(styleClasses)
  const [nestedLayouts, setNestedLayouts] = useRecoilState($nestedLayouts)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const fields = useRecoilValue($fields)
  const breakpoint = useRecoilValue($breakpoint)
  const setIsDraggable = useSetRecoilState($isDraggable)

  const handleLayoutChange = (lay) => {
    if (lay.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setNestedLayouts(prv => produce(prv, draft => {
        draft[fieldKey][breakpoint] = lay
      }))
      // addToBuilderHistory(setBuilderHistory, { event: `Layout changed`, state: { layouts: layoutsFromGrid, fldKey: layoutsFromGrid.lg[0].i } }, setUpdateBtn)
    }
  }

  const draggingField = useRecoilValue($draggingField)

  const onDrop = (e, dropPosition) => {
    const { newLayouts } = addNewFieldToGridLayout(nestedLayouts[fieldKey], draggingField.fieldData, draggingField.fieldSize, dropPosition)
    setNestedLayouts({ ...nestedLayouts, [fieldKey]: newLayouts })
  }
  const inpWrpElm = selectInGrid(`.${fieldKey}-inp-fld-wrp`)
  const absoluteSizes = inpWrpElm && getAbsoluteSize(inpWrpElm)
  const inpWrpWidth = absoluteSizes ? absoluteSizes.width - (absoluteSizes.paddingLeft + absoluteSizes.paddingRight) : 0

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
            className="layout-wrapper"
            id="layout-wrapper"
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onMouseMove={() => setIsDraggable(false)}
            onMouseLeave={() => setIsDraggable(true)}
          // onClick={resetContextMenu}
          >
            <ReactGridLayout
              width={inpWrpWidth}
              measureBeforeMount
              compactType="vertical"
              useCSSTransforms
              isDroppable={draggingField !== null && breakpoint === 'lg'}
              className="layout"
              // style={{ minHeight: draggingField ? getTotalLayoutHeight() + 40 : null }}
              onDrop={onDrop}
              resizeHandles={['e']}
              droppingItem={draggingField?.fieldSize}
              onLayoutChange={handleLayoutChange}
              cols={60}
              rowHeight={1}
              margin={[0, 0]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              layout={nestedLayouts[fieldKey][breakpoint] || []}
              // onBreakpointChange={onBreakpointChange}
              // onDragStart={setResizingFldKey}
              // onDragStart={() => { setIsDraggable(false); setBuilderHookStates(prv => ({ ...prv, forceBuilderWidthToBrkPnt: prv.forceBuilderWidthToBrkPnt + 1, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 })) }}
              // onDrag={setResizingWX}
              // onDragStop={() => { setTimeout(() => { setIsDraggable(true); reCalculateFldHeights() }, 100) }}
              onDragStop={() => setIsDraggable(true)}
              // onResizeStart={setResizingFldKey}
              // onResize={() => reCalculateFldHeights()}
              onResizeStop={() => reCalculateFldHeights()}
            >
              {nestedLayouts?.[fieldKey]?.[breakpoint]?.map(layoutItem => (
                <div
                  key={layoutItem.i}
                  data-key={layoutItem.i}
                  className={`blk ${layoutItem.i === selectedFieldId && 'itm-focus'}`}
                  // onClick={() => handleFldBlockEvent(layoutItem.i)}
                  // onKeyDown={() => handleFldBlockEvent(layoutItem.i)}
                  role="button"
                  tabIndex={0}
                // onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                // data-testid={`${layoutItem.i}-fld-blk`}
                >
                  <Suspense fallback={<FieldBlockWrapperLoader layout={layoutItem} />}>
                    <FieldBlockWrapper
                      {...{
                        layoutItem,
                        // removeLayoutItem,
                        // cloneLayoutItem,
                        fields,
                        // formID,
                        // navigateToFieldSettings,
                        // navigateToStyle,
                        // handleContextMenu,
                        resizingFld: {},
                      }}
                    />
                  </Suspense>
                </div>
              ))}
            </ReactGridLayout>
            {!nestedLayouts?.[fieldKey]?.[breakpoint]?.length && (
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

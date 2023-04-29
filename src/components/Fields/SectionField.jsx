import { Suspense } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $gridWidth } from '../../GlobalStates/FormBuilderStates'
import {
  $breakpoint, $draggingField, $fields, $isDraggable, $nestedLayouts, $selectedFieldId
} from '../../GlobalStates/GlobalStates'
import { builderBreakpoints, cols, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { addNewFieldToGridLayout } from '../../Utils/gridLayoutHelpers'
import { deepCopy } from '../../Utils/Helpers'
import FieldBlockWrapper from '../FieldBlockWrapper'
import InputWrapper from '../InputWrapper'
import { toolsList } from '../LeftBars/Toolbar'
import FieldBlockWrapperLoader from '../Loaders/FieldBlockWrapperLoader'
import RenderStyle from '../style-new/RenderStyle'

/* eslint-disable react/jsx-props-no-spreading */
export default function SectionField({
  fieldKey, attr: fieldData, styleClasses, formID,
}) {
  const styleClassesForRender = deepCopy(styleClasses)
  const [nestedLayouts, setNestedLayouts] = useRecoilState($nestedLayouts)
  // const breakpoint = useRecoilValue($breakpoint)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const fields = useRecoilValue($fields)
  const breakpoint = useRecoilValue($breakpoint)

  const handleLayoutChange = (l, layoutsFromGrid) => {
    if (layoutsFromGrid.lg.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setNestedLayouts({ ...nestedLayouts, [fieldKey]: layoutsFromGrid })
      // addToBuilderHistory(setBuilderHistory, { event: `Layout changed`, state: { layouts: layoutsFromGrid, fldKey: layoutsFromGrid.lg[0].i } }, setUpdateBtn)
    }
  }

  console.log({ fields })

  const draggingField = useRecoilValue($draggingField)

  console.log({ fieldKey, nestedLayouts })

  // const availableTools = toolsList.filter(tool => tool.availableFor.includes(fieldKey))
  const filterTools = ['section']
  const tools = toolsList.filter(tool => !filterTools.includes(tool.elm.typ))

  const handleToolClick = tool => () => {
    const { newLayouts } = addNewFieldToGridLayout(nestedLayouts[fieldKey], tool.elm, tool.pos, { x: 0, y: Infinity })
    console.log('add', newLayouts)
    setNestedLayouts({ ...nestedLayouts, [fieldKey]: newLayouts })
  }

  const onDrop = (e, dropPosition) => {
    // const { newLayouts } = addNewFieldToGridLayout(nestedLayouts[fieldKey], tool.elm, tool.pos, { x: 0, y: Infinity })
    console.log('add', dropPosition)
    const { newLayouts } = addNewFieldToGridLayout(nestedLayouts[fieldKey], draggingField.fieldData, draggingField.fieldSize, dropPosition)
    console.log({ newLayouts })
    setNestedLayouts({ ...nestedLayouts, [fieldKey]: newLayouts })
  }

  const [isDraggable, setIsDraggable] = useRecoilState($isDraggable)

  const gridWidth = useRecoilValue($gridWidth)
  // const styles = useRecoilValue($styles)
  console.log({ gridWidth })

  const fldWrpPadding = 40

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
            style={{ width: gridWidth - fldWrpPadding, display: 'inline-block' }}
            className="layout-wrapper"
            id="layout-wrapper"
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
          // onClick={resetContextMenu}
          >
            <ResponsiveReactGridLayout
              width={gridWidth - fldWrpPadding}
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
              cols={cols}
              breakpoints={builderBreakpoints}
              rowHeight={1}
              margin={[0, 0]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              layouts={nestedLayouts[fieldKey]}
              // onBreakpointChange={onBreakpointChange}
              // onDragStart={setResizingFldKey}
              onDragStart={() => setIsDraggable(false)}
              // onDrag={setResizingWX}
              onDragStop={() => { reCalculateFldHeights() }}
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
            </ResponsiveReactGridLayout>
          </div>
        </div>
      </InputWrapper>
    </>
  )
}

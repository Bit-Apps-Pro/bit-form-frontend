import { Suspense } from 'react'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $gridWidth, $isDraggable } from '../../GlobalStates/FormBuilderStates'
import {
  $breakpoint, $contextMenu, $draggingField, $fields, $nestedLayouts, $selectedFieldId,
} from '../../GlobalStates/GlobalStates'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { builderBreakpoints, cols, getNestedLayoutHeight, propertyValueSumX, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { addNewFieldToGridLayout } from '../../Utils/gridLayoutHelpers'
import useComponentVisible from '../CompSettings/StyleCustomize/ChildComp/useComponentVisible'
import FieldBlockWrapper from '../FieldBlockWrapper'
import InputWrapper from '../InputWrapper'
import FieldBlockWrapperLoader from '../Loaders/FieldBlockWrapperLoader'
import RenderStyle from '../style-new/RenderStyle'
import { getValueFromStateVar } from '../style-new/styleHelpers'

/* eslint-disable react/jsx-props-no-spreading */
export default function SectionField({
  fieldKey, attr: fieldData, styleClasses, formID,
}) {
  const { formType } = useParams()
  const styleClassesForRender = deepCopy(styleClasses)
  const [nestedLayouts, setNestedLayouts] = useRecoilState($nestedLayouts)
  const [contextMenu, setContextMenu] = useRecoilState($contextMenu)
  // const breakpoint = useRecoilValue($breakpoint)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const { setIsComponentVisible } = useComponentVisible(false)
  const fields = useRecoilValue($fields)
  const breakpoint = useRecoilValue($breakpoint)
  const setIsDraggable = useSetRecoilState($isDraggable)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLayoutChange = (l, layoutsFromGrid) => {
    if (layoutsFromGrid.lg.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setNestedLayouts({ ...nestedLayouts, [fieldKey]: layoutsFromGrid })
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

  const gridWidth = useRecoilValue($gridWidth)

  const themeVars = useRecoilValue($themeVars)

  const fldWrpPadding = propertyValueSumX(getValueFromStateVar(themeVars, styleClassesForRender[`.${fieldKey}-fld-wrp`].padding)) * 2
  const inpWrpPadding = propertyValueSumX(getValueFromStateVar(themeVars, styleClassesForRender[`.${fieldKey}-inp-wrp`].padding)) * 2

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
            style={{ width: gridWidth - (fldWrpPadding + inpWrpPadding), display: 'inline-block' }}
            className="layout-wrapper"
            id="layout-wrapper"
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onMouseMove={() => setIsDraggable(false)}
            onMouseLeave={() => setIsDraggable(true)}
          // onClick={resetContextMenu}
          >
            <ResponsiveReactGridLayout
              width={gridWidth - (fldWrpPadding + inpWrpPadding)}
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
              cols={cols}
              breakpoints={builderBreakpoints}
              rowHeight={1}
              margin={[0, 0]}
              draggableCancel=".no-drg"
              draggableHandle=".drag"
              layouts={nestedLayouts[fieldKey]}
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
                        formID,
                        navigateToFieldSettings,
                        navigateToStyle,
                        // handleContextMenu,
                        resizingFld: {},
                      }}
                    />
                  </Suspense>
                </div>
              ))}
            </ResponsiveReactGridLayout>
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

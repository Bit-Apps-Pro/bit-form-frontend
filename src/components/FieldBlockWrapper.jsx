/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { $builderHookStates, $fields, $formId, $resizingFld } from '../GlobalStates/GlobalStates'
import BrushIcn from '../Icons/BrushIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import CopyIcn from '../Icons/CopyIcn'
import EditIcn from '../Icons/EditIcn'
import MoveIcn from '../Icons/MoveIcn'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import MapComponents from './MapComponents'

export default function FieldBlockWrapper({
  layoutItem,
  removeLayoutItem,
  cloneLayoutItem,
  navigateToFieldSettings,
  navigateToStyle,
  handleContextMenu,
}) {
  const fields = useAtomValue($fields)
  const formID = useAtomValue($formId)
  const resizingFld = useAtomValue($resizingFld)

  const styleNavigation = e => {
    e.stopPropagation()
    navigateToStyle(layoutItem.i)
  }

  const setBuilderHookState = useSetAtom($builderHookStates)

  useEffect(() => {
    setBuilderHookState(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
  }, [])

  return (
    <>
      {(resizingFld.fieldKey === layoutItem.i) && <span className="resize-txt">{`w: ${resizingFld.w || layoutItem.w}, x: ${resizingFld.x || layoutItem.x}`}</span>}
      <div className="blk-icn-wrp pos-abs flx">
        <button
          type="button"
          className="drag g-c us-n blk-wrp-btn"
          style={{ cursor: 'move' }}
          title={__('Move')}
          data-testid={`${layoutItem.i}-move-btn`}
        >
          <MoveIcn size="15" stroke="3" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Style')}
          onClick={styleNavigation}
          data-testid={`${layoutItem.i}-style-btn`}
        >
          <BrushIcn stroke={2.3} height="15" width="13" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Settings')}
          onClick={navigateToFieldSettings}
          data-testid={`${layoutItem.i}-settings-btn`}
        >
          <EditIcn size="18" stroke={2} />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Clone')}
          onClick={() => cloneLayoutItem(layoutItem.i)}
          data-testid={`${layoutItem.i}-copy-btn`}
        >
          <CopyIcn size="17" stroke={2} />
        </button>
        <FieldDeleteButton
          className="g-c drag us-n no-drg blk-wrp-btn"
          removeLayoutItem={removeLayoutItem}
          fieldId={layoutItem.i}
        />

        <button
          data-close
          type="button"
          className="g-c us-n no-drg blk-wrp-btn blk-wrp-down-btn"
          draggable="false"
          style={{ cursor: 'pointer' }}
          title={__('More Options')}
          onClick={e => handleContextMenu(e, layoutItem.i)}
          data-testid={`${layoutItem.i}-more-options`}
        >
          <ChevronDownIcn size="21" stroke={2.2} />
        </button>
      </div>
      <ComponentsByTheme
        fields={fields}
        layoutItem={layoutItem}
        formID={formID}
      />
    </>
  )
}

const ComponentsByTheme = ({ layoutItem, formID, fields }) => {
  const componentProps = fields[layoutItem.i]
  return <MapComponents formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
}

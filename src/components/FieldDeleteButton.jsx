import { hideAll } from 'tippy.js'
import TrashIcn from '../Icons/TrashIcn'
import { __ } from '../Utils/i18nwrap'
import Downmenu from './Utilities/Downmenu'

const FieldDeleteButton = ({
  placement, className, label, fieldId, removeLayoutItem, resetContextMenu, toggleSubMenu,
}) => {
  const removeLay = e => {
    e.stopPropagation()
    removeLayoutItem(fieldId)
    if (resetContextMenu) resetContextMenu()
  }

  const downMenuProps = {
    onShow: toggleSubMenu ? () => toggleSubMenu('delete') : null,
    onHide: toggleSubMenu ? () => toggleSubMenu('delete') : null,
  }

  return (
    <Downmenu place={placement || 'top'} offset={[0, 0]} {...downMenuProps}>
      <button
        data-close
        type="button"
        className={className}
        unselectable="on"
        draggable="false"
        style={{ cursor: 'pointer' }}
        title={__('Remove')}
        data-testid={`${fieldId}-remove`}
      >
        <TrashIcn size="19" stroke={2} />
        {label && <span>{label}</span>}
      </button>
      <div className="wdt-200">
        <div className="mb-2 mt-1"><b>Are you sure ?</b></div>
        <div className="f-12 mb-1 f-rob">After deleting this field, you will lose all previous responses of this field.</div>
        <div className="f-12 mb-2 f-rob">
          <i>Tip : </i>
          You can hide this field instead.
        </div>
        <div className="flx flx-c">
          <button onClick={() => hideAll()} data-testid={`${fieldId}-cancel-btn`} className="tip-btn mr-2" type="button">Cancel</button>
          <button onClick={removeLay} data-testid={`${fieldId}-delete-btn`} className="tip-btn red-btn" type="button">Delete</button>
        </div>
      </div>
    </Downmenu>
  )
}

export default FieldDeleteButton

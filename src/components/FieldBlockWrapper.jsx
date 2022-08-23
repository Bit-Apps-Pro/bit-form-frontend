/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import { useContext } from 'react'
import BrushIcn from '../Icons/BrushIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import EditIcn from '../Icons/EditIcn'
import MoveIcn from '../Icons/MoveIcn'
import { AppSettings } from '../Utils/AppSettingsContext'
import { deepCopy } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import MapComponents from './MapComponents'
import MapComponents_old from './MapComponents_old'

export default function FieldBlockWrapper({ layoutItem,
  removeLayoutItem,
  cloneLayoutItem,
  fields,
  formID,
  navigateToFieldSettings,
  navigateToStyle,
  handleContextMenu,
  resizingFld }) {
  const styleNavigation = e => {
    e.stopPropagation()
    navigateToStyle(layoutItem.i)
  }
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
          <MoveIcn size="19" stroke="3" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Style')}
          onClick={styleNavigation}
          data-testid={`${layoutItem.i}-style-btn`}
        >
          <BrushIcn stroke={2.3} height="17" width="14" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Settings')}
          onClick={navigateToFieldSettings}
          data-testid={`${layoutItem.i}-settings-btn`}
        >
          <EditIcn size="20" stroke={2} />
        </button>
        <FieldDeleteButton
          className="g-c drag us-n no-drg blk-wrp-btn"
          removeLayoutItem={removeLayoutItem}
          fieldId={layoutItem.i}
        />
        {/* <Downmenu> */}
        <button
          data-close
          type="button"
          className="g-c us-n no-drg blk-wrp-btn blk-wrp-down-btn"
          // unselectable="on"
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
  const { reCaptchaV2 } = useContext(AppSettings)

  const componentProps = deepCopy(fields[layoutItem.i])
  // TODO move this code with recaptcha component after remove react frontend
  if (componentProps && componentProps.typ === 'recaptcha') {
    componentProps.siteKey = reCaptchaV2.siteKey
  }
  // TODO : handle old components in v1 compitable
  if (0) {
    return <MapComponents_old isBuilder formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
  }
  return <MapComponents isBuilder formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
}

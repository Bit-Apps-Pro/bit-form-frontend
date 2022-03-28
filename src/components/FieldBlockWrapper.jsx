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
import FieldContextMenu from './FieldContextMenu'
import FieldDeleteButton from './FieldDeleteButton'
import MapComponents from './MapComponents'
import MapComponents_old from './MapComponents_old'
import Downmenu from './Utilities/Downmenu'

export default function FieldBlockWrapper({ layoutItem,
  removeLayoutItem,
  cloneLayoutItem,
  fields,
  formID,
  navigateToFieldSettings,
  navigateToStyle }) {
  const styleNavigation = e => {
    e.stopPropagation()
    navigateToStyle(layoutItem.i)
  }

  return (
    <>
      <div className="blk-icn-wrp pos-abs flx">
        <button
          type="button"
          className="drag g-c us-n blk-wrp-btn"
          style={{ cursor: 'move' }}
          title={__('Move', 'bitform')}
        >
          <MoveIcn size="20" stroke="2" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Style', 'bitform')}
          onClick={styleNavigation}
        >
          <BrushIcn height="18" width="14" />
        </button>
        <button
          type="button"
          className="g-c drag curp us-n no-drg blk-wrp-btn"
          title={__('Settings', 'bitform')}
          onClick={navigateToFieldSettings}
        >
          <EditIcn size="20" />
        </button>
        <FieldDeleteButton
          className="g-c drag us-n no-drg blk-wrp-btn"
          removeLayoutItem={removeLayoutItem}
          fieldId={layoutItem.i}
        />
        <Downmenu>
          <button
            data-close
            type="button"
            className="g-c us-n no-drg blk-wrp-btn"
            unselectable="on"
            draggable="false"
            style={{ cursor: 'pointer' }}
            title={__('More Options', 'bitform')}
          >
            <ChevronDownIcn size="19" />
          </button>
          <FieldContextMenu
            layoutItem={layoutItem}
            navigateToFieldSettings={navigateToFieldSettings}
            navigateToStyle={navigateToStyle}
            cloneLayoutItem={cloneLayoutItem}
            removeLayoutItem={removeLayoutItem}
          />
        </Downmenu>
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
  if (0) {
    return <MapComponents_old isBuilder formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
  }
  return <MapComponents isBuilder formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
}

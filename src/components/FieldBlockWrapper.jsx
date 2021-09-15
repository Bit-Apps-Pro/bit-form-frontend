import produce from 'immer'
import { useContext } from 'react'
import { useFela } from 'react-fela'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { hideAll } from 'tippy.js'
import { $fields, $updateBtn } from '../GlobalStates'
import BrushIcn from '../Icons/BrushIcn'
import CheckBoxIcn from '../Icons/CheckBoxIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import CopyIcn from '../Icons/CopyIcn'
import EditIcn from '../Icons/EditIcn'
import EyeOffIcon from '../Icons/EyeOffIcon'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import MoveIcn from '../Icons/MoveIcn'
import TabletIcon from '../Icons/TabletIcon'
import TrashIcn from '../Icons/TrashIcn'
import context from '../styles/fieldContextMenu.style'
import { AppSettings } from '../Utils/AppSettingsContext'
import { deepCopy } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FieldDeleteButton from './FieldDeleteButton'
import MapComponents from './MapComponents'
import Downmenu from './Utilities/Downmenu'

export default function FieldBlockWrapper({ layoutItem, removeLayoutItem, cloneLayoutItem, fields, formID }) {
  const history = useHistory()
  const { reCaptchaV2 } = useContext(AppSettings)
  const { css } = useFela()
  const setFields = useSetRecoilState($fields)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const navigateToFieldSettings = () => {
    history.replace(history.location.pathname.replace(/style\/.+|style/g, 'fs'))
  }

  const navigateToStyle = typ => {
    if (typ === 'paypal') history.replace(history.location.pathname.replace(/fs|style\/.+|style/g, 'style/fl/ppl'))
    // if (/text|textarea|number|password|email|url|date|time|week|month|datetime-local|/g.test(typ){
    else history.replace(history.location.pathname.replace(/fs|style\/.+/g, 'style'))
  }

  const ComponentsByTheme = () => {
    const componentProps = deepCopy(fields[layoutItem.i])
    // TODO move this code with recaptcha component after remove react frontend
    if (componentProps && componentProps.typ === 'recaptcha') {
      componentProps.siteKey = reCaptchaV2.siteKey
    }
    return <MapComponents isBuilder formID={formID} atts={componentProps} />
  }

  const handleFieldHide = brkpnt => {
    setFields(allFields => produce(allFields, draft => {
      const fldData = draft[layoutItem.i]
      if (!fldData.hidden) fldData.hidden = []
      if (brkpnt === 'all' && fldData.hidden.length < 3) {
        fldData.hidden = ['lg', 'md', 'sm']
      } else if (brkpnt === 'all') {
        fldData.hidden = []
      } else if (fldData.hidden.includes(brkpnt)) {
        fldData.hidden.splice(fldData.hidden.indexOf(brkpnt), 1)
      } else {
        fldData.hidden.push(brkpnt)
      }
      if (!fldData.hidden.length) delete fldData.hidden
    }))

    setUpdateBtn({ unsaved: true })
  }

  const checkIfHidden = brkpnt => {
    const fldData = fields[layoutItem.i]
    if (fldData?.hidden?.length === 3) return true
    if (fldData?.hidden?.includes(brkpnt)) return true
    return false
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
          className="g-c cp us-n no-drg blk-wrp-btn"
          title={__('Style', 'bitform')}
          onClick={() => navigateToStyle(fields[layoutItem.i].typ)}
        >
          <BrushIcn height="18" width="14" />
        </button>
        <button
          type="button"
          className="g-c cp us-n no-drg blk-wrp-btn"
          title={__('Settings', 'bitform')}
          onClick={navigateToFieldSettings}
        >
          <EditIcn size="20" />
        </button>
        <FieldDeleteButton className="g-c us-n no-drg blk-wrp-btn" removeLayoutItem={removeLayoutItem} fieldId={layoutItem.i} />
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
          <div className={css(context.menu)}>
            <ul className={css(context.list)}>
              <li className={css(context.item)}>
                <button type="button" className={css(context.btn)} onClick={navigateToFieldSettings}>
                  <EditIcn size="19" />
                  <span>Settings</span>
                </button>
              </li>
              <li className={css(context.item)}>
                <button type="button" className={css(context.btn)} onClick={() => navigateToStyle(fields[layoutItem.i].typ)}>
                  <BrushIcn height="18" width="14" />
                  <span>Style</span>
                </button>
              </li>
              <li className={css(context.item)}>
                <button type="button" className={css(context.btn)} onClick={() => cloneLayoutItem(layoutItem.i)}>
                  <CopyIcn size="19" />
                  <span>Clone</span>
                </button>
              </li>
              <li className={css(context.item)}>
                <Downmenu place="right-start" arrow={false}>
                  <button
                    data-close
                    type="button"
                    className={`${css(context.btn)}}`}
                    unselectable="on"
                    draggable="false"
                    title={__('More Options', 'bitform')}
                  >
                    <EyeOffIcon size="19" />
                    <span>Hide</span>
                    <ChevronRightIcon size="19" />
                  </button>
                  <div className={css(context.menu)}>
                    <ul className={css(context.list)}>
                      <li className={css(context.item)}>
                        <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('all')}>
                          <ChevronDownIcn size="19" />
                          <span>all</span>
                          {checkIfHidden() && <CheckBoxIcn w="19" />}
                        </button>
                      </li>
                      <li className={css(context.item)}>
                        <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('lg')}>
                          <LaptopIcn size="19" />
                          <span>large</span>
                          {checkIfHidden('lg') && <CheckBoxIcn w="19" />}
                        </button>
                      </li>
                      <li className={css(context.item)}>
                        <button type="button" className={css(context.btn)} onClick={() => handleFieldHide('md')}>
                          <TabletIcon size="19" />
                          <span>medium</span>
                          {checkIfHidden('md') && <CheckBoxIcn w="19" />}
                        </button>
                      </li>
                      <li className={css(context.item)}>
                        <button type="button" className={css(context.btn, context.checked)} onClick={() => handleFieldHide('sm')}>
                          <MobileIcon size="19" />
                          <span>small</span>
                          {checkIfHidden('sm') && <CheckBoxIcn w="19" />}
                        </button>
                      </li>
                    </ul>
                  </div>
                </Downmenu>
              </li>
              <li className={css(context.item)}>
                <FieldDeleteButton placement="bottom" className={css(context.btn, context.delete)} label="Remove" removeLayoutItem={removeLayoutItem} fieldId={layoutItem.i} />
              </li>
            </ul>
          </div>
        </Downmenu>
      </div>
      <ComponentsByTheme />
    </>
  )
}

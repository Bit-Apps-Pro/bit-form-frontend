import { useAtomValue } from 'jotai'
import { $formInfo } from '../../GlobalStates/GlobalStates'
import { getCustomClsName } from '../../Utils/globalHelpers'
import RenderHtml from '../Utilities/RenderHtml'

export default function StepHeader({ settings, stepKey, stepNumber, formID, isActive }) {
  const formInfo = useAtomValue($formInfo)
  const multiStepSettings = formInfo?.multiStepSettings || {}

  return (
    <div className={`_frm-b${formID}-stp-hdr ${isActive ? 'active' : ''}`}>
      <div className={`_frm-b${formID}-stp-hdr-cntnt`}>
        {multiStepSettings.headerIcon?.show && (
          <div className={`_frm-b${formID}-stp-hdr-icn-wrp`}>
            <span className={`_frm-b${formID}-stp-icn-cntn`}>
              {multiStepSettings.headerIcon?.iconType === 'icon' && (
                <img src={settings.icon} className={`_frm-b${formID}-stp-icn`} alt="Step Icon" />
              )}
              {multiStepSettings.headerIcon?.iconType === 'number' && (
                <span className={`_frm-b${formID}-stp-num`}>{stepNumber}</span>
              )}
            </span>
          </div>
        )}

        <div className={`_frm-b${formID}-stp-hdr-titl-wrpr`}>
          {multiStepSettings.showLbl && settings.showLbl && (
            <span className={`_frm-b${formID}-stp-hdr-lbl`}>
              {settings.lblPreIcn && (
                <img
                  data-testid={`_frm-b${formID}-stp-lbl-pre-i`}
                  data-dev-stp-lbl-pre-i={stepKey}
                  className={`_frm-b${formID}-stp-lbl-pre-i ${getCustomClsName(stepKey, 'lbl-pre-i')}`}
                  src={settings.lblPreIcn}
                  alt=""
                />
              )}

              <RenderHtml html={settings.lbl.replace(/\$_bf_\$/g, '\\')} />

              {settings.lblSufIcn && (
                <img
                  data-testid={`_frm-b${formID}-stp-lbl-suf-i`}
                  data-dev-lbl-suf-i={stepKey}
                  className={`_frm-b${formID}-stp-lbl-suf-i ${getCustomClsName(stepKey, 'lbl-suf-i')}`}
                  src={settings.lblSufIcn}
                  alt=""
                />
              )}

            </span>
          )}
          {multiStepSettings.showSubtitle && settings.showSubtitle && (
            <span className={`_frm-b${formID}-stp-hdr-sub-titl`}>
              {settings.subTlePreIcn && (
                <img
                  data-testid={`_frm-b${formID}-stp-sub-titl-pre-i`}
                  data-dev-sub-titl-pre-i={stepKey}
                  className={`_frm-b${formID}-stp-sub-titl-pre-i ${getCustomClsName(stepKey, 'sub-titl-pre-i')}`}
                  src={settings.subTlePreIcn}
                  alt=""
                />
              )}
              <RenderHtml html={settings.subtitle || ''} />
              {settings.subTleSufIcn && (
                <img
                  data-testid={`_frm-b${formID}-stp-sub-titl-suf-i`}
                  data-dev-sub-titl-suf-i={stepKey}
                  className={`_frm-b${formID}-stp-sub-titl-suf-i ${getCustomClsName(stepKey, 'sub-titl-suf-i')}`}
                  src={settings.subTleSufIcn}
                  alt=""
                />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

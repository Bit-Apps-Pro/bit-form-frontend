import { useAtomValue } from 'jotai'
import { $formInfo } from '../../GlobalStates/GlobalStates'

export default function StepHeader({ settings, stepNumber, formID }) {
  const formInfo = useAtomValue($formInfo)
  const multiStepSettings = formInfo?.multiStepSettings || {}

  return (
    <div className={`_frm-b${formID}-stp-hdr`}>
      <div className={`_frm-b${formID}-stp-hdr-cntnt`}>
        {multiStepSettings.headerIcon?.show && (
          <div className={`_frm-b${formID}-stp-hdr-icn`}>
            {multiStepSettings.headerIcon?.iconType === 'icon' && (
              <div className="step-header-icon-icon">
                <img src="https://via.placeholder.com/50" alt="Step Icon" />
              </div>
            )}
            {multiStepSettings.headerIcon?.iconType === 'number' && (
              <span className="step-header-icon-number">
                {stepNumber}
              </span>
            )}
          </div>
        )}

        <div className={`_frm-b${formID}-stp-hdr-titl-wrpr`}>
          {multiStepSettings.showLbl && settings.showLbl && (
            <span className={`_frm-b${formID}-stp-hdr-titl`}>{settings.lbl}</span>
          )}
          {multiStepSettings.showSubtitle && settings.showSubtitle && (
            <span className={`_frm-b${formID}-stp-hdr-sub-titl`}>{settings.subtitle}</span>
          )}
        </div>
      </div>
    </div>
  )
}

const generateTitleMarkup = (formID, settings) => (
  <>
    {fieldData.lblPreIcn && (
      <img
        data-testid={`${fieldKey}-lbl-pre-i`}
        data-dev-lbl-pre-i={fieldKey}
        className={`${fieldKey}-lbl-pre-i ${getCustomClsName(fieldKey, 'lbl-pre-i')}`}
        src={fieldData.lblPreIcn}
        alt=""
        {...getCustomAttributes(fieldKey, 'lbl-pre-i')}
      />
    )}

    <RenderHtml html={fieldData.lbl.replace(/\$_bf_\$/g, '\\')} />

    {fieldData.lblSufIcn && (
      <img
        data-testid={`${fieldKey}-lbl-suf-i`}
        data-dev-lbl-suf-i={fieldKey}
        className={`${fieldKey}-lbl-suf-i ${getCustomClsName(fieldKey, 'lbl-suf-i')}`}
        src={fieldData.lblSufIcn}
        alt=""
        {...getCustomAttributes(fieldKey, 'lbl-suf-i')}
      />
    )}
  </>
)

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $builderHookStates, $contextMenu, $flags, $formInfo } from '../../GlobalStates/GlobalStates'
import { getCustomClsName } from '../../Utils/globalHelpers'
import RenderHtml from '../Utilities/RenderHtml'

export default function StepHeader({ settings, stepKey, stepNumber, formID, isActive }) {
  const { formType } = useParams()
  const formInfo = useAtomValue($formInfo)
  const setContextMenu = useSetAtom($contextMenu)
  const setBuilderHookStates = useSetAtom($builderHookStates)
  const [activeBuilderStep, setActiveBuilderStep] = useAtom($activeBuilderStep)
  const flags = useAtomValue($flags)
  const navigate = useNavigate()
  const { styleMode, inspectMode } = flags
  const multiStepSettings = formInfo?.multiStepSettings || {}
  const path = `/form/builder/${formType}/${formID}`
  const navigateToStepSettings = (e) => {
    e.stopPropagation()
    setActiveBuilderStep(stepNumber - 1)
    setContextMenu({})
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    if (styleMode) {
      navigate(`${path}/theme-customize/multi-step/quick-tweaks`, { replace: true })
      return
    }
    navigate(`${path}/step-settings`, { replace: true })
  }

  return (
    <div
      className={`_frm-b${formID}-stp-hdr ${isActive ? 'active' : ''} ${activeBuilderStep > stepKey ? 'completed' : ''}`}
      data-dev-stp-hdr={formID}
    >
      <div className={`_frm-b${formID}-stp-hdr-cntnt`}>
        {multiStepSettings.headerIcon?.show && (
          <div className={`_frm-b${formID}-stp-hdr-icn-wrp`}>
            <span
              className={`_frm-b${formID}-stp-icn-cntn`}
              data-dev-stp-icn-cntn={formID}
              onClick={(e) => navigateToStepSettings(e)}
              onKeyDown={(e) => navigateToStepSettings(e)}
              role="button"
              tabIndex={0}
            >
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
            <span
              className={`_frm-b${formID}-stp-hdr-lbl`}
              data-dev-stp-hdr-lbl={formID}
              onClick={(e) => navigateToStepSettings(e)}
              onKeyDown={(e) => navigateToStepSettings(e)}
              role="button"
              tabIndex={0}
            >
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
            <span
              className={`_frm-b${formID}-stp-hdr-sub-titl`}
              data-dev-stp-hdr-sub-titl={formID}
            >
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

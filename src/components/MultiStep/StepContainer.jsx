import { useAtomValue } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $flags, $formInfo } from '../../GlobalStates/GlobalStates'
import StepButton from './StepButton'
import StepProgress from './StepProgress'
import StepsHeaderContainer from './StepsHeaderContainer'

export default function StepContainer({ children, className }) {
  const { formType, formID } = useParams()
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const flags = useAtomValue($flags)
  const navigate = useNavigate()
  const { styleMode, inspectMode } = flags
  const path = `/form/builder/${formType}/${formID}`
  const formInfo = useAtomValue($formInfo)
  const { btnSettings, progressSettings, showStepHeader } = formInfo?.multiStepSettings || {}

  if (!isMultiStep) return children

  const navigateToSettings = () => {
    if (inspectMode) return
    if (styleMode) {
      navigate(`${path}/theme-customize/multi-step/quick-tweaks`, { replace: true })
      return
    }
    navigate(`${path}/multi-step-settings`, { replace: true })
  }
  return (
    <div
      className={`_frm-b${formID}-stp-cntnr ${className}`}
      data-dev-stp-cntnr={formID}
    >
      {showStepHeader && (
        <StepsHeaderContainer navigateToSettings={navigateToSettings} />
      )}
      <div
        className={`_frm-b${formID}-stp-wrpr`}
        data-dev-stp-wrpr={formID}
      >
        {progressSettings?.show && (
          <StepProgress
            formID={formID}
            progressSettings={progressSettings}
            navigateToSettings={navigateToSettings}
          />
        )}
        <div className={`_frm-b${formID}-stp-cntnt-wrpr`}>
          <div
            className={`_frm-b${formID}-stp-cntnt`}
            data-dev-stp-cntnt={formID}
          >
            {children}
            {btnSettings?.show && (
              <div
                className={`_frm-b${formID}-stp-btn-wrpr ${styleMode ? '' : 'drag'}`}
                data-dev-stp-btn-wrpr={formID}
                onClick={navigateToSettings}
                onKeyDown={navigateToSettings}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <div className={`_frm-b${formID}-stp-btn-cntnt`}>
                  <StepButton btnInfo={btnSettings?.prevBtn} formID={formID} />
                  <StepButton btnInfo={btnSettings?.nextBtn} formID={formID} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

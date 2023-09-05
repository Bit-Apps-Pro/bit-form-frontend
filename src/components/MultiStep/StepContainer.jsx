import { useAtomValue } from 'jotai'
import { useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $formInfo } from '../../GlobalStates/GlobalStates'
import StepButton from './StepButton'
import StepProgress from './StepProgress'
import StepsHeaderContainer from './StepsHeaderContainer'

export default function StepContainer({ children, className }) {
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const stepLayout = allLayouts[activeBuilderStep]
  const formInfo = useAtomValue($formInfo)
  const { btnSettings, progressSettings, showStepHeader } = formInfo?.multiStepSettings || {}
  const { formID } = useParams()
  console.log('isMultiStep', isMultiStep)

  if (!isMultiStep) return children
  return (
    <div className={`_frm-b${formID}-stp-cntnr ${className}`}>
      {showStepHeader && (
        <StepsHeaderContainer />
      )}
      <div className={`_frm-b${formID}-stp-wrpr`}>
        {progressSettings?.show && (
          <StepProgress formID={formID} />
        )}
        <div className={`_frm-b${formID}-stp-cntnt-wrpr`}>
          <div className={`_frm-b${formID}-stp-cntnt`}>
            {children}
            {btnSettings?.show && (
              <div className={`_frm-b${formID}-stp-btn-wrpr`}>
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

import { useAtomValue } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts } from '../../GlobalStates/GlobalStates'
import StepHeader from './StepHeader'

export default function StepsHeaderContainer() {
  const { formType, formID } = useParams()
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const navigate = useNavigate()
  const stepLayout = allLayouts[activeBuilderStep]
  const path = `/form/builder/${formType}/${formID}`

  if (!isMultiStep) return null

  const handleStepHeaderClick = () => {
    navigate(`${path}/multi-step-settings`, { replace: true })
  }

  return (
    <div className={`_frm-b${formID}-stp-hdr-cntnr`} onClick={handleStepHeaderClick} onKeyDown={handleStepHeaderClick} role="button" tabIndex={0}>
      <div className={`_frm-b${formID}-stp-hdr-wrpr`}>
        {formLayouts.map((step, index) => (
          <StepHeader
            key={`index-${index + 1}`}
            settings={step.settings}
            stepKey={index}
            stepNumber={index + 1}
            formID={formID}
            isActive={activeBuilderStep === index}
          />
        ))}
      </div>
    </div>
  )
}

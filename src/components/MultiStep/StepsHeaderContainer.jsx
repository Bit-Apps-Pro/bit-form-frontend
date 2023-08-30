import { useAtomValue } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { $allLayouts, $newFormId } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
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
    <div className="steps-header-container" onClick={handleStepHeaderClick} onKeyDown={handleStepHeaderClick} role="button" tabIndex={0}>
      <div className="step-header-content" />
      {formLayouts.map((step, index) => (
        <StepHeader
          key={`index-${index + 1}`}
          settings={step.settings}
          stepNumber={index + 1}
          formID={formID}
        />
      ))}
    </div>
  )
}

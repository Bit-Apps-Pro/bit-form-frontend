import { useAtomValue } from 'jotai'
import { $allLayouts } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import StepHeader from './StepHeader'

export default function StepsHeaderContainer({ children }) {
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const stepLayout = allLayouts[activeBuilderStep]

  if (!isMultiStep) return null

  return (
    <div className="steps-header-container">
      <div className="step-header-content" />
      {formLayouts.map((step, index) => (
        <StepHeader
          key={`index-${index + 1}`}
          settings={step.settings}
        />
      ))}
    </div>
  )
}

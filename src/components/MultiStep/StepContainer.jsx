import { useAtomValue } from 'jotai'
import StepsHeaderContainer from './StepsHeaderContainer'
import { $allLayouts } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import StepProgress from './StepProgress'

export default function StepContainer({ children, className }) {
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const stepLayout = allLayouts[activeBuilderStep]
  console.log('isMultiStep', isMultiStep)

  if (!isMultiStep) return children
  return (
    <div className={className}>
      <StepsHeaderContainer />
      <div className={`step-wrapper ${className} `}>
        <StepProgress />
        <div className="step-content-wrapper">
          <div className={`step-content ${className} `}>
            {children}
          </div>
          <div className="step-button-wrapper">
            <div className="stpe-button-content">
              <button type="button" className="step-button">Back</button>
              <button type="button" className="step-button">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

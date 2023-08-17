import { useAtomValue } from 'jotai'
import { $allLayouts } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'

export default function BuilderSteps() {
  const allLayouts = useAtomValue($allLayouts)
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const stepLayout = allLayouts[activeBuilderStep]

  if (!isMultiStep) return null

  return (
    <div>
      {formLayouts.map((step, index) => (
        <div key={index}>
          <h1>
            Step
            {' '}
            {index + 1}
          </h1>
        </div>
      ))}
    </div>
  )
}

import { useAtomValue } from 'jotai'
import { $allLayouts } from '../../GlobalStates/GlobalStates'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'

export default function MultiStepSettings() {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const stepLayout = allLayouts[activeBuilderStep]

  return (
    <div>
      <h1>Multi Step Settings</h1>

    </div>
  )
}

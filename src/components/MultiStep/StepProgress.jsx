import { useAtomValue } from 'jotai'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts } from '../../GlobalStates/GlobalStates'

export default function StepProgress({ formID }) {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const progressPercentage = Math.round(((activeBuilderStep) / allLayouts.length) * 100)

  return (
    <div className={`_frm-b${formID}-stp-progress-wrpr`}>
      <div className={`_frm-b${formID}-stp-progress`}>
        <div className={`_frm-b${formID}-progress-bar`}>
          <div className={`_frm-b${formID}-progress-fill`} style={{ width: `${progressPercentage}%` }}>
            {progressPercentage}
            %
          </div>
        </div>
      </div>
    </div>
  )
}

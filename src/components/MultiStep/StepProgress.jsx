import { useAtomValue } from 'jotai'
import { useDeferredValue } from 'react'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts } from '../../GlobalStates/GlobalStates'

export default function StepProgress({ formID }) {
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const progressPercentage = useDeferredValue(Math.round(((activeBuilderStep) / allLayouts.length) * 100))

  return (
    <div
      className={`_frm-b${formID}-stp-progress-wrpr`}
      data-dev-stp-progress-wrpr={formID}
    >
      <div className={`_frm-b${formID}-stp-progress`}>
        <div
          className={`_frm-b${formID}-stp-progress-bar`}
          data-dev-stp-progress-bar={formID}
        >
          <div className={`_frm-b${formID}-progress-fill`} style={{ width: `${progressPercentage}%` }}>
            {progressPercentage}
            %
          </div>
        </div>
      </div>
    </div>
  )
}

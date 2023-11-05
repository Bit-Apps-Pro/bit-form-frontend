import { useAtomValue } from 'jotai'
import { useDeferredValue } from 'react'
import { useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $flags } from '../../GlobalStates/GlobalStates'

export default function StepProgress({ navigateToSettings, progressSettings }) {
  const { formID } = useParams()
  const allLayouts = useAtomValue($allLayouts)
  const activeBuilderStep = useAtomValue($activeBuilderStep)
  const flags = useAtomValue($flags)
  const { styleMode } = flags
  const progressPercentage = useDeferredValue(Math.round(((activeBuilderStep) / allLayouts.length) * 100))
  const percentage = progressSettings.showPercentage ? `${progressPercentage}%` : ''
  return (
    <div
      className={`_frm-b${formID}-stp-progress-wrpr  ${styleMode ? '' : 'drag'}`}
      style={{ cursor: 'pointer' }}
      data-dev-stp-progress-wrpr={formID}
      onClick={navigateToSettings}
      onKeyDown={navigateToSettings}
      role="button"
      tabIndex={0}
    >
      <div className={`_frm-b${formID}-stp-progress`}>
        <div
          className={`_frm-b${formID}-stp-progress-bar`}
          data-dev-stp-progress-bar={formID}
        >
          <div className={`_frm-b${formID}-progress-fill`} style={{ width: `${progressPercentage}%` }}>
            {percentage}
          </div>
        </div>
      </div>
    </div>
  )
}

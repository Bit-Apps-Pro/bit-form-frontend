/* eslint-disable react/no-unknown-property */
import { useAtomValue } from 'jotai'
import { useParams } from 'react-router-dom'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $flags } from '../../GlobalStates/GlobalStates'
import StepHeader from './StepHeader'

export default function StepsHeaderContainer({ navigateToSettings }) {
  const { formID } = useParams()
  const allLayouts = useAtomValue($allLayouts)
  const flags = useAtomValue($flags)
  const { styleMode } = flags
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const isMultiStep = formLayouts.length > 1
  const activeBuilderStep = useAtomValue($activeBuilderStep)

  if (!isMultiStep) return null

  return (
    <div
      className={`_frm-b${formID}-stp-hdr-cntnr ${styleMode ? '' : 'drag'}`}
      style={{ cursor: 'pointer' }}
      onClick={navigateToSettings}
      onKeyDown={navigateToSettings}
      role="button"
      tabIndex={0}
    >
      <div
        className={`_frm-b${formID}-stp-hdr-wrpr`}
        data-dev-stp-hdr-wrpr={formID}
      >
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

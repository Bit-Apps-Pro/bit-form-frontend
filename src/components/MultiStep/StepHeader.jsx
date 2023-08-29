import { useAtom } from "jotai"
import { $activeBuilderStep } from "../../GlobalStates/FormBuilderStates"

export default function StepHeader({ className, settings }) {
  const activeBuilderStep = useAtom($activeBuilderStep)

  return (
    <div className={`step-header ${className} `}>
      <div className="step-header-content">
        <div className="step-header-icon">
          <img src="https://via.placeholder.com/50" alt="Step Icon" />
        </div>
        <div className="step-header-title">
          <span className="step-header-title-text">{settings.lbl}</span>
          <span>{settings.subtitl}</span>
        </div>
      </div>
    </div>
  )
}

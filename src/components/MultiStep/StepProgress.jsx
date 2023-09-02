export default function StepProgress({ formID }) {
  return (
    <div className={`_frm-b${formID}-stp-progress-wrpr`}>
      <div className={`_frm-b${formID}-stp-progress`}>
        <div className={`_frm-b${formID}-progress-bar`}>
          <div className={`_frm-b${formID}-progress-fill`}>50%</div>
        </div>
      </div>
    </div>
  )
}

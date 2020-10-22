/* eslint-disable react/jsx-props-no-spreading */
export default function SubmitBtn({ attr, buttonDisabled, handleReset }) {
  return (
    <div className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'}`}>
      <button
        className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
        disabled={buttonDisabled}
        type="submit"
      >
        {buttonDisabled ? 'Submitting....' : attr.subBtnTxt}
      </button>
      {'rstBtnTxt' in attr && (
        <button
          className={`btcd-sub-btn btcd-rst ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
          type="button"
          {...handleReset && { onClick: handleReset }}
        >
          {attr.rstBtnTxt}
        </button>
      )}
    </div>
  )
}

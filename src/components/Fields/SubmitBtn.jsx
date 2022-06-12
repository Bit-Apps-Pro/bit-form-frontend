import { getCustomAttributs, getCustomClsName } from '../../Utils/globalHelpers'
import LoaderSm from '../Loaders/LoaderSm'

/* eslint-disable react/jsx-props-no-spreading */
export default function SubmitBtn({ attr, buttonDisabled, handleReset, formID, fieldKey }) {
  return (
    <div
      className={`fld-wrp fld-wrp-${formID} ${getCustomClsName(fieldKey, 'fld-wrp')}`}
      btcd-fld="submit"
      {...getCustomAttributs(fieldKey, 'fld-wrp')}
    >
      <div
        className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'} ${getCustomClsName(fieldKey, 'btcd-frm-sub')}`}
        {...getCustomAttributs(fieldKey, 'btcd-frm-sub')}
      >
        <button
          className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'} ${getCustomClsName(fieldKey, 'btcd-sub-btn')}`}
          disabled={buttonDisabled}
          type="submit"
          {...getCustomAttributs(fieldKey, 'btcd-sub-btn')}
        >
          {attr.subBtnTxt}
          {buttonDisabled && <LoaderSm clr="currentColor" size={12} style={{ display: 'inline-block', marginLeft: 5 }} />}
        </button>
        {'rstBtnTxt' in attr && (
          <button
            className={`btcd-sub-btn btcd-rst ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'} ${getCustomClsName(fieldKey, 'btcd-rst')}`}
            type="button"
            {...handleReset && { onClick: handleReset }}
            {...getCustomAttributs(fieldKey, 'btcd-rst')}
          >
            {attr.rstBtnTxt}
          </button>
        )}
      </div>
    </div>
  )
}

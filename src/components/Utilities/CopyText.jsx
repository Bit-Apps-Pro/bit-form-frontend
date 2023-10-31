import { useRef } from 'react'
import CopyIcn from '../../Icons/CopyIcn'
import { copyToClipboard } from '../../Utils/globalHelpers'

export default function CopyText({ value, className, readOnly }) {
  const copyInputRef = useRef(null)

  return (
    <div className={className}>
      <label htmlFor="copy-input-fld" className="flx">
        <input id="copy-input-fld" ref={copyInputRef} className={`w-10 ${readOnly && 'readonly'}`} value={value} readOnly />
        <button onClick={() => copyToClipboard({ value, ref: copyInputRef })} className="tooltip" style={{ '--tooltip-txt': '"Copy"' }} aria-label="Copy" type="button">
          <CopyIcn size="14" />
        </button>
      </label>
    </div>
  )
}

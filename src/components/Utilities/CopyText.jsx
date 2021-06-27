import toast from 'react-hot-toast'
import CopyIcn from '../../Icons/CopyIcn'
import { __ } from '../../Utils/i18nwrap'

export default function CopyText({ value, className, readOnly }) {
  const copyText = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        toast(__('Copied on clipboard.', 'bitform'))
      }, err => {
        toast.error(__('Failed to Copy, Try Again.', 'bitform'))
      })
  }

  return (
    <div className={className}>
      <label htmlFor={value} className="flx">
        <input id={value} className={`w-10 ${readOnly && 'readonly'}`} value={value} readOnly />
        <button onClick={copyText} className="tooltip" style={{ '--tooltip-txt': '"Copy"' }} aria-label="Copy" type="button"><CopyIcn size="14" /></button>
      </label>
    </div>
  )
}

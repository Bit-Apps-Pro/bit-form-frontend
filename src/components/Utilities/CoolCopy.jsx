import { useRef } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import CopyIcn from '../../Icons/CopyIcn'
import coolcopy from '../../styles/CoolCopy.style'
import { __ } from '../../Utils/i18nwrap'
import Tip from './Tip'

export default function CoolCopy({ className, cls, value, readOnly }) {
  const { css } = useFela()
  const copyInput = useRef(null)

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value)
    }
    copyInput.current.focus()
    copyInput.current.select()
    return new Promise((res, rej) => {
      if (document.execCommand('copy')) res()
      else rej()
    })
  }

  const copyText = () => {
    copyToClipboard()
      .then(() => toast.success(__('Copied on clipboard.', 'bitform')))
      .catch(() => toast.error(__('Failed to Copy, Try Again.', 'bitform')))
  }
  return (
    <div className={className}>
      <label className={css(coolcopy.label)} htmlFor="text-copy">
        <input ref={copyInput} className={`${css(coolcopy.input)} ${cls}`} id="text-copy" type="text" value={value} readOnly={readOnly} />
        <button onClick={copyText} className={`${css(coolcopy.btn)}`} type="button" aria-label="Copy" style={{ '--tooltip-txt': '"Copy"' }}>
          <Tip msg="Copy">
            <CopyIcn w="20" />
          </Tip>
        </button>
      </label>
    </div>
  )
}

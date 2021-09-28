import { useRef } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import CopyIcn from '../../Icons/CopyIcn'
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
      <label className={css(style.label)} htmlFor="text-copy">
        <input ref={copyInput} className={`${css(style.input)} ${cls}`} id="text-copy" type="text" value={value} readOnly={readOnly} />
        <button onClick={copyText} className={`${css(style.btn)}`} type="button" aria-label="Copy" style={{ '--tooltip-txt': '"Copy"' }}>
          <Tip msg="Copy">
            <CopyIcn w="20" />
          </Tip>
        </button>
      </label>
    </div>
  )
}

const style = {
  label: { pn: 'relative !important' },
  input: {
    bd: 'var(--white-0-95)',
    oe: 'none',
    b: '1px solid var(--b-79-96)',
    brs: '10px !important',
    p: '10px 30px 10px 10px',
    w: 80,
    fw: 600,
  },
  btn: {
    pn: 'absolute !important',
    b: 'none',
    oe: 'none',
    bd: 'none',
    tp: '-2px',
    rt: 2,
    cur: 'pointer',
    tn: 'color 0.2s',
    cr: 'var(--b-59)',
    '&:hover': { cr: 'var(--b-73)' },
  },
}

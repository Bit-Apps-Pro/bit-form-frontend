import React from 'react'
import { SnackContext } from '../../../Utils/SnackContext'

export default function CopyText(props) {
  const { setSnackbar } = React.useContext(SnackContext)

  const copyText = e => {
    const cpyBtn = e.target
    cpyBtn.setAttribute('style', '--tooltip-txt: "Copied"')
    setSnackbar({ show: true, msg: 'Copied on Clipboard.' })
    const text = e.target.parentNode.children[0]
    text.select();
    text.setSelectionRange(0, 99999);
    document.execCommand('copy');
    setTimeout(() => { cpyBtn.setAttribute('style', '--tooltip-txt: "Copy"') }, 2000)
  }
  return (
    <div className="cpyTxt">
      <label>
        <input value={`[${props.value}]`} readOnly />
        <button onClick={copyText} className="tooltip" style={{ '--tooltip-txt': '"Copy"' }} aria-label="Copy" type="button"><span className="btcd-icn icn-copy" /></button>
      </label>
    </div>
  )
}

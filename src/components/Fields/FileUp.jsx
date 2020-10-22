/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, createRef } from 'react';
import { setPrevData, handleFile, delItem } from '../../resource/js/file-upload'

export default function FileUp({ attr, formID, entryID, resetFieldValue }) {
  const delBtnRef = createRef()
  const [filelist, setfilelist] = useState(attr.val !== undefined && JSON.parse(attr.val))

  useEffect(() => {
    if (resetFieldValue) {
      const element = document.getElementsByName('mul' in attr ? `${attr.name}[]` : attr.name)[0]
      element.value = null
      element.nextElementSibling.innerHTML = ''
      element.previousElementSibling.children[1].innerHTML = 'No File Chosen'
    }
  }, [resetFieldValue])

  const onFileChange = e => {
    handleFile(e)
    // set del action
    for (let i = 0; i < delBtnRef.current.children.length; i += 1) {
      delBtnRef.current.children[i].children[2].addEventListener('click', ev => {
        delItem(ev.target)
      })
    }
  }

  const rmvFile = (idx) => {
    const tmp = [...filelist]
    tmp.splice(idx, 1)
    setfilelist(tmp)
  }

  return (
    <div className={`fld-wrp fld-wrp-${formID} drag  ${attr.valid.hide ? 'btcd-hidden' : ''}`}>
      {'lbl' in attr && <label className={`fld-lbl fld-lbl-${formID}`}>{attr.lbl}</label>}
      <div className="btcd-f-input">
        <div className="btcd-f-wrp">
          <div className="btn-wrp">
            <button className="btcd-inpBtn" type="button">
              <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4=" alt="file-upload" />
              <span>{` ${attr.upBtnTxt}`}</span>
            </button>
            <div className="btcd-f-title">No File Chosen</div>
            <small className="f-max">{'mxUp' in attr && ` (Max ${attr.mxUp} MB)`}</small>
          </div>
          <input
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
            {...'mul' in attr && { multiple: true }}
            {...'exts' in attr && { accept: attr.exts }}
            {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
            type="file"
            onClick={setPrevData}
            onChange={e => onFileChange(e)}
          />
          {attr.val !== undefined && (
            <div className="btcd-old-file">
              <input type="hidden" name={`${attr.name}_old`} value={filelist.toString()} />
              {filelist !== false && filelist.length !== 0 && (
                <div className="mt-2">
                  <small>
                    {filelist.length}
                    {' '}
                    Old File
                  </small>
                </div>
              )}
              {filelist.map((itm, i) => (
                <div key={`ol-f-${i + 3}`} className="flx ">
                  <a href={typeof bits !== 'undefined' ? `${bits.baseDLURL}formID=${formID}&entryID=${entryID}&fileID=${itm}` : ''} target="_blank" rel="noopener noreferrer">
                    <span className="btcd-icn icn-file" />
                    {' '}
                    {itm}
                  </a>
                  <button onClick={() => rmvFile(i)} type="button" className="icn-btn">&times;</button>
                </div>
              ))}

            </div>
          )}
          <div ref={delBtnRef} className="btcd-files" />
        </div>
      </div>
    </div>
  )
}

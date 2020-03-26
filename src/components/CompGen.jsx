/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createElement, createRef, useState } from 'react'
import { setPrevData, handleFile, delItem } from '../resource/js/file-upload'

function CompGen(props) {
  console.log('%c $render CompGen', 'background:red;padding:3px;border-radius:5px;color:white')

  const textField = attr => (
    <div className="text-wrp drag" btcd-fld="text-fld">
      {'lbl' in attr && <label>{attr.lbl}</label>}
      {createElement(
        'input',
        {
          className: 'txt-fld no-drg',
          type: attr.typ,
          ...('req' in attr.valid && { required: attr.valid.req }),
          ...('ph' in attr && { placeholder: attr.ph }),
          ...('mn' in attr && { min: attr.mn }),
          ...('mx' in attr && { max: attr.mx }),
          ...('val' in attr && { defaultValue: attr.val }),
          ...('ac' in attr && { autoComplete: attr.ac }),
          ...('name' in attr && { name: attr.name }),
        },
      )}
    </div>
  )

  const textArea = attr => (
    <div className="text-wrp drag" btcd-fld="textarea">
      {'lbl' in attr && <label>{attr.lbl}</label>}
      <textarea
        className="txt-fld no-drg"
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'ph' in attr && { placeholder: attr.ph }}
        {...'val' in attr && { defaultValue: attr.val }}
        {...'ac' in attr && { autoComplete: attr.ac }}
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'name' in attr && { name: attr.name }}
      />
    </div>
  )


  const checkBox = attr => {
    const vals = 'val' in attr && attr.val !== '' ? JSON.parse(attr.val) : null

    return (
      <div className="text-wrp drag" btcd-fld="textarea">
        {'lbl' in attr && <label>{attr.lbl}</label>}
        <div className={`no-drg btcd-ck-con ${attr.round && 'btcd-round'}`}>
          {attr.opt.map((itm, i) => (
            <label key={`opt-${i + 22}`} className="btcd-ck-wrp">
              <span>{itm.lbl}</span>
              <input
                type="checkbox"
                {...itm.check && { checked: true }}
                {...itm.req && { required: true }}
                {...'name' in attr && { name: `${attr.name}[]` }}
                {...vals !== null && vals.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
              />
              <span className="btcd-mrk ck" />
            </label>
          ))}
        </div>
      </div>
    )
  }

  const radioBox = attr => {
    const n = Math.random()

    return (
      <div className="text-wrp drag" btcd-fld="textarea">
        {'lbl' in attr && <label>{attr.lbl}</label>}
        <div className={`no-drg btcd-ck-con ${attr.round && 'btcd-round'}`}>
          {attr.opt.map((itm, i) => (
            <label key={`opr-${i + 22}`} className="btcd-ck-wrp">
              <span>{itm.lbl}</span>
              <input
                type="radio"
                name={n}
                {...itm.check && { checked: true }}
                {...itm.req && { required: true }}
                {...'name' in attr && { name: attr.name }}
                {...'lbl' in itm && { defaultValue: itm.lbl }}
                {...'val' in attr && attr.val === itm.lbl && { defaultChecked: true }}
              />
              <span className="btcd-mrk rdo" />
            </label>
          ))}
        </div>
      </div>
    )
  }

  const blank = () => (
    <div className="blnk-blk drag" />
  )

  const dropDown = (attr) => (
    <div className="text-wrp drag" btcd-fld="textarea">
      {'lbl' in attr && <label>{attr.lbl}</label>}
      <select
        className="txt-fld slim no-drg"
        {...'req' in attr.valid && { required: attr.valid.req }}
        {...'mul' in attr && { multiple: attr.mul }}
        {...'ph' in attr && { placeholder: attr.ph }}
        {...'name' in attr && { name: attr.name }}
        {...'val' in attr && { value: attr.val }}
        {...'name' in attr && { name: attr.name }}
      >
        <option data-placeholder="true" aria-label="option placeholder" />
        {attr.opt.map((itm, i) => (
          <option key={`op-${i + 87}`} value={itm.lbl}>{itm.lbl}</option>
        ))}
      </select>
    </div>
  )

  const submitBtns = (attr) => (
    <div className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'}`}>
      <button className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`} type="submit">{attr.subBtnTxt}</button>
      {'rstBtnTxt' in attr && (
        <button
          className={`btcd-sub-btn btcd-rst ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
          type="button"
        //onClick={() => { document.getElementById(`form-${typeof bitAppsFront !== 'undefined' && bitAppsFront.contentID}`).reset() }}
        >
          {attr.rstBtnTxt}
        </button>
      )}
    </div>
  )

  switch (props.atts.typ) {
    case 'text':
    case 'number':
    case 'password':
    case 'email':
    case 'url':
    case 'date':
    case 'datetime-local':
    case 'time':
    case 'month':
    case 'week':
    case 'color':

      return textField(props.atts)
    case 'textarea':
      return textArea(props.atts)
    case 'check':
      return checkBox(props.atts)
    case 'radio':
      return radioBox(props.atts)
    case 'blank':
      return blank()
    case 'select':
      return dropDown(props.atts)
    case 'file-up':
      return <FileUp attr={props.atts} formID={props.formID} entryID={props.entryID} />
    case 'submit':
      return submitBtns(props.atts)
    default:
      break
  }

  return <div>aaa</div>
}

export default CompGen

function FileUp({ attr, formID, entryID }) {
  const delBtnRef = createRef()
  const [filelist, setfilelist] = useState(attr.val !== undefined && JSON.parse(attr.val))

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
    <div className="file-wrp drag">
      {'lbl' in attr && <label>{attr.lbl}</label>}
      <div className="btcd-f-input">
        <div className="btcd-f-wrp">
          <button className="btcd-inpBtn" type="button">
            <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4=" alt="file-upload" />
            <span>{` ${attr.upBtnTxt}`}</span>
          </button>
          <span className="btcd-f-title">No File Chosen</span>
          <small className="f-max">{'mxUp' in attr && ` (Max ${attr.mxUp} MB)`}</small>
          <input
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'mul' in attr && { multiple: true }}
            {...'exts' in attr && { accept: attr.exts }}
            {...'name' in attr && { name: attr.name }}
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
                  <a href={`http://192.168.1.11/wp-content/uploads/bitapps/${formID}/${entryID}/${itm}`} target="_blank" rel="noopener noreferrer">
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

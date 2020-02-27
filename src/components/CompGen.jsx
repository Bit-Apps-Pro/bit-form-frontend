/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createElement, createRef } from 'react'
import { setPrevData, handleFile, delItem } from '../resource/js/file-upload'

export default function CompGen(props) {
  const delBtnRef = createRef()

  function textField(attr) {
    return (
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
  }

  function textArea(attr) {
    return (
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
  }

  function checkBox(attr) {
    const vals = 'val' in attr ? JSON.parse(attr.val) : null

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

  function radioBox(attr) {
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

  function blank() {
    return (
      <div className="blnk-blk drag" />
    )
  }

  function dropDown(attr) {
    return (
      <div className="text-wrp drag" btcd-fld="textarea">
        {'lbl' in attr && <label>{attr.lbl}</label>}
        <select
          className="txt-fld slim no-drg"
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'mul' in attr && { multiple: attr.mul }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'name' in attr && { name: attr.name }}
          {...'val' in attr && { value: attr.val }}
        >
          <option data-placeholder="true" aria-label="option placeholder" />
          {attr.opt.map((itm, i) => (
            <option key={`op-${i + 87}`} value={itm.lbl}>{itm.lbl}</option>
          ))}
        </select>
      </div>
    )
  }

  const onFileChange = e => {
    handleFile(e)
    // set del action
    for (let i = 0; i < delBtnRef.current.children.length; i += 1) {
      delBtnRef.current.children[i].children[2].addEventListener('click', ev => {
        delItem(ev.target)
      })
    }
  }

  function fileUp(attr) {
    return (
      <div className="file-wrp drag">
        {'lbl' in attr && <label>{attr.lbl}</label>}
        <div className="btcd-f-input">
          <div className="btcd-f-wrp">
            <button className="btcd-inpBtn" type="button">
              <img src="" alt="file-upload" />
              <span>{` ${attr.upBtnTxt}`}</span>
            </button>
            <span className="btcd-f-title">No File Chosen</span>
            <small className="f-max">{'mxUp' in attr && ` (Max ${attr.mxUp} MB)`}</small>
            <input
              {...'req' in attr.valid && { required: attr.valid.req }}
              {...'mul' in attr && { multiple: true }}
              {...'exts' in attr && { accept: attr.exts }}
              {...'name' in attr && { name: attr.name }}
              {...'val' in attr && { value: attr.val }}
              type="file"
              onClick={setPrevData}
              onChange={e => onFileChange(e)}
            />
            <div ref={delBtnRef} className="btcd-files" />
          </div>
        </div>
      </div>
    )
  }

  function submitBtns(attr) {
    return (
      <div className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'}`}>
        <button className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`} type="button">{attr.subBtnTxt}</button>
        {'rstBtnTxt' in attr && <button className={`btcd-sub-btn btcd-rst ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`} type="button">{attr.rstBtnTxt}</button>}
      </div>
    )
  }

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
      return fileUp(props.atts)
    case 'submit':
      return submitBtns(props.atts)
    default:
      break
  }

  return <div>aaa</div>
}

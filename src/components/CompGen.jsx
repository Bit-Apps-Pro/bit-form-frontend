/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createElement, createRef, useState, useEffect } from 'react'
import { setPrevData, handleFile, delItem } from '../resource/js/file-upload'
import ReCaptcha from './Fields/Recaptcha';

function CompGen(props) {
  console.log('%c $render CompGen', 'background:red;padding:3px;border-radius:5px;color:white')

  const textField = attr => (
    (
      !('hide' in attr.valid && attr.valid.hide === true)
      && (
        <div className="fld-wrp drag" btcd-fld="text-fld">
          {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
          {createElement(
            'input',
            {
              className: 'fld no-drg',
              type: attr.typ,
              ...('req' in attr.valid && { required: attr.valid.req }),
              ...('disabled' in attr.valid && { disabled: attr.valid.disabled }),
              ...('ph' in attr && { placeholder: attr.ph }),
              ...('mn' in attr && { min: attr.mn }),
              ...('mx' in attr && { max: attr.mx }),
              ...('val' in attr && { defaultValue: attr.val }),
              ...('val' in attr && 'userinput' in attr && attr.userinput && { value: attr.val }),
              ...('ac' in attr && { autoComplete: attr.ac }),
              ...('name' in attr && { name: attr.name }),
              ...({ onBlur: props.onBlurHandler }),
            },
          )}
          {attr.error && <span style={{ color: 'red' }}>{attr.error}</span>}
        </div>
      )
    )
  )

  const hiddenField = attr => (
    <div className="fld-wrp drag" btcd-fld="text-fld">
      {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
      {createElement(
        'input',
        {
          className: 'fld no-drg',
          type: attr.typ,
          ...('req' in attr.valid && { required: attr.valid.req }),
          ...('ph' in attr && { placeholder: attr.ph }),
          ...('mn' in attr && { min: attr.mn }),
          ...('mx' in attr && { max: attr.mx }),
          ...('val' in attr && { defaultValue: attr.val }),
          ...('val' in attr && 'userinput' in attr && attr.userinput && { value: attr.val }),
          ...('ac' in attr && { autoComplete: attr.ac }),
          ...('name' in attr && { name: attr.name }),
        },
      )}
    </div>
  )

  const textArea = attr => (
    (
      !('hide' in attr.valid && attr.valid.hide === true)
      && (
        <div className="fld-wrp drag" btcd-fld="textarea">
          {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
          <textarea
            className="fld no-drg"
            {...'ph' in attr && { placeholder: attr.ph }}
            {...'val' in attr && { defaultValue: attr.val }}
            {...'val' in attr && 'userinput' in attr && attr.userinput && { value: attr.val }}
            {...'ac' in attr && { autoComplete: attr.ac }}
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
            {...'name' in attr && { name: attr.name }}
            onBlur={props.onBlurHandler}
          />
        </div>
      )
    )
  )


  const checkBox = attr => {
    const vals = 'val' in attr && attr.val && typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',')
    return (
      (
        !('hide' in attr.valid && attr.valid.hide === true)
        && (
          <div className="fld-wrp drag" btcd-fld="textarea">
            {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
            <div className={`no-drg btcd-ck-con ${attr.round && 'btcd-round'}`}>
              {attr.opt.map((itm, i) => (
                <label key={`opt-${i + 22}`} className="btcd-ck-wrp">
                  <span>{itm.lbl}</span>
                  <input
                    type="checkbox"
                    {...itm.check && { defaultChecked: true }}
                    {...itm.req && { required: true }}
                    {...'lbl' in itm && { defaultValue: itm.lbl }}
                    {...'name' in attr && { name: `${attr.name}[]` }}
                    {...vals && vals.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                    {...vals && 'userinput' in attr && attr.userinput && vals.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                    {...vals && 'userinput' in attr && attr.userinput && vals.indexOf(itm.lbl) === -1 && { defaultChecked: false }}
                    onBlur={props.onBlurHandler}
                  />
                  <span className="btcd-mrk ck" />
                </label>
              ))}
            </div>
          </div>
        )
      )
    )
  }

  const radioBox = attr => {
    const n = Math.random()

    return (
      (
        !('hide' in attr.valid && attr.valid.hide === true)
        && (
          <div className="fld-wrp drag" btcd-fld="textarea">
            {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
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
                    {...'val' in attr && attr.val === itm.lbl && 'userinput' in attr && { checked: attr.val === itm.lbl }}
                    onBlur={props.onBlurHandler}
                  />
                  <span className="btcd-mrk rdo" />
                </label>
              ))}
            </div>
          </div>
        )
      )
    )
  }

  const blank = () => (
    <div className="blnk-blk drag" />
  )

  const dropDown = (attr, resetFieldValue) => (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="select">
        {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
        <select
          className="fld slim no-drg"
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'mul' in attr && { multiple: attr.mul }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
          {...'val' in attr && attr.val.length > 0 && { defaultValue: typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',') }}
          {...'val' in attr && attr.val.length > 0 && 'userinput' in attr && attr.userinput && { value: typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',') }}
          {...resetFieldValue && { value: [] }}
          onBlur={props.onBlurHandler}
        >
          <option data-placeholder="true" aria-label="option placeholder" />
          {attr.opt.map((itm, i) => (
            <option key={`op-${i + 87}-${(attr.userinput || resetFieldValue) && Math.random()}`} value={itm.lbl}>{itm.lbl}</option>
          ))}
        </select>
      </div>
    )
  )

  const submitBtns = (attr, buttonDisabled, handleReset) => (
    <div className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'}`}>
      <button
        className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
        disabled={buttonDisabled}
        type="submit"
      >
        {attr.subBtnTxt}
      </button>
      {'rstBtnTxt' in attr && (
        <button
          className={`btcd-sub-btn btcd-rst ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
          type="button"
          onClick={handleReset}
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

      // return textField(props.atts)
      return <TextField attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'textarea':
      // return textArea(props.atts)
      return <TextArea attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'check':
      // return checkBox(props.atts)
      return <CheckBox attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'radio':
      // return radioBox(props.atts)
      return <RadioBox attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
    case 'blank':
      return blank()
    case 'select':
      return dropDown(props.atts, props.resetFieldValue)
    case 'file-up':
      return <FileUp attr={props.atts} formID={props.formID} entryID={props.entryID} resetFieldValue={props.resetFieldValue} />
    case 'submit':
      return submitBtns(props.atts, props.buttonDisabled, props.handleReset)
    case 'hidden':
      return hiddenField(props.atts)
    case 'recaptcha':
      return ReCaptcha(props.atts)
    default:
      break
  }

  return <div>None</div>
}

export default (CompGen)

function FileUp({ attr, formID, entryID, resetFieldValue }) {
  const delBtnRef = createRef()
  const [filelist, setfilelist] = useState(attr.val !== undefined && JSON.parse(attr.val))

  useEffect(() => {
    if (resetFieldValue) {
      const element = document.getElementsByName(attr.name)[0]
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
    <div className="file-wrp drag">
      {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
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
                  <a href={typeof bits !== 'undefined' && bits.baseDLURL && `${formID}/${entryID}/${itm}`} target="_blank" rel="noopener noreferrer">
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

function TextField({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val !== undefined ? attr.val : '')
  useEffect(() => {
    if (attr.val !== undefined) {
      setvalue(attr.val)
    } else {
      setvalue('')
    }
    if (resetFieldValue) {
      setvalue('')
    }
  }, [attr.val, resetFieldValue])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="text-fld">
        {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
        {createElement(
          'input',
          {
            className: 'fld no-drg',
            type: attr.typ,
            ...('req' in attr.valid && { required: attr.valid.req }),
            ...('disabled' in attr.valid && { disabled: attr.valid.disabled }),
            ...('ph' in attr && { placeholder: attr.ph }),
            ...('mn' in attr && { min: attr.mn }),
            ...('mx' in attr && { max: attr.mx }),
            ...('val' in attr && { defaultValue: attr.val }),
            ...({ value }),
            ...('ac' in attr && { autoComplete: attr.ac }),
            ...('name' in attr && { name: attr.name }),
            ...({ onBlur: onBlurHandler }),
            ...({ onChange: onChangeHandler }),
          },
        )}
        {attr.error && <span style={{ color: 'red' }}>{attr.error}</span>}
      </div>
    )
  )
}

function TextArea({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val)
  useEffect(() => {
    if (attr.val !== undefined) {
      setvalue(attr.val)
    } else {
      setvalue('')
    }
    if (resetFieldValue) {
      setvalue('')
    }
  }, [attr.val, resetFieldValue])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="textarea">
        {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
        <textarea
          className="fld no-drg"
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'val' in attr && { defaultValue: attr.val }}
          {...{ value }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'name' in attr && { name: attr.name }}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
        />
      </div>
    )
  )
}

function CheckBox({ attr, onBlurHandler, resetFieldValue }) {
  const vals = 'val' in attr && attr.val && typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',')
  const [value, setvalue] = useState(vals || [])
  useEffect(() => {
    if (vals && value !== vals) {
      setvalue(vals)
    }
    if (resetFieldValue) {
      setvalue([])
    }
  }, [attr.val, resetFieldValue])
  const onChangeHandler = (event) => {
    const index = value.indexOf(event.target.value)
    if (event.target.checked && index === -1) {
      setvalue([...value, event.target.value])
    } else if (!event.target.checked && index >= 0) {
      setvalue(value.filter(v => v !== event.target.value))
    }
  }
  return (
    (
      !('hide' in attr.valid && attr.valid.hide === true)
      && (
        <div className="fld-wrp drag" btcd-fld="textarea">
          {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
          <div className={`no-drg fld btcd-ck-con ${attr.round && 'btcd-round'}`}>
            {attr.opt.map((itm, i) => (
              <label key={`opt-${i + 22}`} className="btcd-ck-wrp">
                <span>{itm.lbl}</span>
                <input
                  type="checkbox"
                  {...itm.check && { defaultChecked: true }}
                  {...itm.req && { required: true }}
                  {...'lbl' in itm && { defaultValue: itm.lbl }}
                  {...'name' in attr && { name: `${attr.name}[]` }}
                  {...vals && vals.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                  {... { checked: value && value.indexOf(itm.lbl) >= 0 }}
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                />
                <span className="btcd-mrk ck" />
              </label>
            ))}
          </div>
        </div>
      )
    )
  )
}

function RadioBox({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val)
  useEffect(() => {
    if (attr.val !== undefined) {
      setvalue(attr.val)
    } else {
      setvalue('')
    }
    if (resetFieldValue) {
      setvalue('')
    }
  }, [attr.val, resetFieldValue])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }
  const n = Math.random()

  return (
    (
      !('hide' in attr.valid && attr.valid.hide === true)
      && (
        <div className="fld-wrp drag" btcd-fld="textarea">
          {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
          <div className={`no-drg fld btcd-ck-con ${attr.round && 'btcd-round'}`}>
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
                  {...{ checked: value === itm.lbl }}
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                />
                <span className="btcd-mrk rdo" />
              </label>
            ))}
          </div>
        </div>
      )
    )
  )
}

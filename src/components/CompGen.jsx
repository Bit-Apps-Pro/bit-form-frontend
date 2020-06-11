/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createElement, createRef, useState, useEffect, useRef } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { setPrevData, handleFile, delItem } from '../resource/js/file-upload'
import ReCaptcha from './Fields/Recaptcha';
import 'react-multiple-select-dropdown-lite/dist/index.css'

function CompGen(props) {
  console.log('%c $render CompGen', 'background:red;padding:3px;border-radius:5px;color:white')


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


  const blank = () => <div className="blnk-blk drag" />


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
      // return dropDown(props.atts, props.onBlurHandler, props.resetFieldValue)
      return <DropDown attr={props.atts} onBlurHandler={props.onBlurHandler} resetFieldValue={props.resetFieldValue} />
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
  const textFieldRef = useRef(null)
  const [value, setvalue] = useState(attr.val !== undefined ? attr.val : '')
  useEffect(() => {
    // console.log('att.name', attr.name, attr.val)
    if (attr.val !== undefined && !attr.userinput) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      setvalue('')
    } else if (attr.conditional) {
      setvalue(attr.val)
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = textFieldRef
      // console.log('value', value, current, attr.name)
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="text-fld">
        {'lbl' in attr && <label title={attr.lbl} className="fld-lbl">{attr.lbl}</label>}
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
            ...(onBlurHandler && { onBlur: onBlurHandler }),
            ...({ onChange: onChangeHandler }),
            ref: textFieldRef,
          },
        )}
        {attr.error && <span style={{ color: 'red' }}>{attr.error}</span>}
      </div>
    )
  )
}

function TextArea({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val)
  const textAreaRef = useRef(null)
  useEffect(() => {
    if (attr.val !== undefined && !attr.userinput) {
      setvalue(attr.val)
    } else if (attr.val !== undefined && attr.conditional) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      setvalue('')
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = textAreaRef
      // console.log('value', value, current, attr.name)
      onBlurHandler(current)
    }
  }, [value])
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
          ref={textAreaRef}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...{ defaultValue: value }}
          {...{ value }}
          {...'ac' in attr && { autoComplete: attr.ac }}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'name' in attr && { name: attr.name }}
          {...onBlurHandler && { onBlur: onBlurHandler }}
          onChange={onChangeHandler}
        />
      </div>
    )
  )
}

function CheckBox({ attr, onBlurHandler, resetFieldValue }) {
  let defaultValue
  if ('val' in attr && attr.val && attr.val.length > 0) {
    if (typeof attr.val === 'string') {
      if (attr.val[0] === '[') {
        defaultValue = JSON.parse(attr.val)
      } else {
        defaultValue = attr.val.split(',')
      }
    } else if (Array.isArray(attr.val)) {
      defaultValue = attr.val
    }
  } else {
    defaultValue = attr.opt.map(checkBoxElement => checkBoxElement.check && checkBoxElement.lbl)
  }
  const [value, setvalue] = useState(defaultValue || [])
  const checkBoxRef = useRef(null)
  useEffect(() => {
    if (defaultValue && JSON.stringify(defaultValue) !== JSON.stringify(value) && !attr.userinput) {
      setvalue(defaultValue)
    } else if (attr.conditional) {
      setvalue(defaultValue)
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue([])
    }
  }, [resetFieldValue])
  useEffect(() => {
    // console.log('value',typeof value, attr.name, defaultValue , defaultValue === value , onBlurHandler , !attr.isRecursive)
    if (attr.hasWorkflow && JSON.stringify(defaultValue) === JSON.stringify(value) && onBlurHandler && !attr.userinput) {
      const { current } = checkBoxRef
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    const index = value.indexOf(event.target.value)
    if (event.target.checked && index === -1) {
      setvalue([...value, event.target.value])
    } else if (!event.target.checked && index >= 0) {
      setvalue(value.filter(v => v !== event.target.value))
    }
    if (onBlurHandler) {
      onBlurHandler(event)
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
                  ref={checkBoxRef}
                  {...itm.check && { defaultChecked: true }}
                  {...itm.req && { required: true }}
                  {...'lbl' in itm && { defaultValue: itm.lbl }}
                  {...'name' in attr && { name: `${attr.name}[]` }}
                  {...value && value.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                  {...{ checked: value && value.indexOf(itm.lbl) >= 0 }}
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
  const radioRef = useRef(null)
  useEffect(() => {
    if (attr.val && !attr.userinput) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      let defaultChecked
      if (attr.opt) {
        attr.opt.forEach(radioElment => {
          if (radioElment.check) {
            defaultChecked = radioElment.lbl
          }
        })
      }
      setvalue(defaultChecked || '')
    } else if (attr.conditional) {
      setvalue(attr.val)
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = radioRef
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    setvalue(event.target.value)
    if (onBlurHandler) {
      onBlurHandler(event)
    }
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
                  ref={radioRef}
                  name={n}
                  value={itm.lbl}
                  {...itm.check && { defaultChecked: true }}
                  {...itm.req && { required: true }}
                  {...'name' in attr && { name: attr.name }}
                  {...{ checked: value === itm.lbl }}
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

function DropDown({ attr, onBlurHandler, resetFieldValue }) {
  let defaultValue
  // console.log('attr.val', typeof attr.val, Array.isArray(attr.val), attr.val && attr.val.filter(defaulSelected => defaulSelected && defaulSelected !== null).join(','))
  if ('val' in attr && attr.val && attr.val.length > 0) {
    if (typeof attr.val === 'string') {
      if (attr.val[0] === '[') {
        defaultValue = JSON.parse(attr.val)
      } else {
        defaultValue = attr.val.split(',')
      }
    } else if (Array.isArray(attr.val)) {
      defaultValue = attr.val.filter(defaulSelected => defaulSelected && defaulSelected !== null).join(',')
    }
  } else {
    defaultValue = []
  }
  const [value, setvalue] = useState(defaultValue || [])
  const selectFieldRef = useRef(null)
  useEffect(() => {
    console.log('defaultValueAA', attr.val, attr.userinput, attr.conditional)
    if (defaultValue && JSON.stringify(defaultValue) !== JSON.stringify(value) && !attr.userinput) {
      setvalue(defaultValue)
    } else if (defaultValue && attr.conditional) {
      setvalue(defaultValue)
    }
  }, [attr.val, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue([])
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && JSON.stringify(defaultValue) === JSON.stringify(value) && onBlurHandler && !attr.userinput) {
      const { current } = selectFieldRef
      const eventLikeData = { name: 'mul' in attr ? `${attr.name}[]` : attr.name, value, type: 'dropdown', multiple: 'mul' in attr && attr.mul }
      onBlurHandler(eventLikeData)
    }
  }, [value])
  const onChangeHandler = (event) => {
    if (event && event.target && event.target.slim) {
      const newValue = []
      event.target.slim.data.data.forEach((option => { option.selected && option.value && newValue.push(option.value) }))
      setvalue(newValue)
    } else if (event && event.target && event.target.multiple && value) {
      const selectedValue = []
      event.target.childNodes.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
      setvalue([...selectedValue])
    } else {
      setvalue(event.split(','))
    }
    if (onBlurHandler && event) {
      const eventLikeData = { name: 'mul' in attr ? `${attr.name}[]` : attr.name, value: event.split(','), type: 'dropdown', multiple: 'mul' in attr && attr.mul, userinput: true }
      onBlurHandler(eventLikeData)
    }
  }
  return (
    !('hide' in attr.valid && attr.valid.hide === true)
    && (
      <div className="fld-wrp drag" btcd-fld="select">
        {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
        {/* props options
        https://github.com/Arif-un/react-multiple-select-dropdown-lite#readme */}
        <MultiSelect
          ref={selectFieldRef}
          width="100%"
          className="fld no-drg"
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
          // {...'val' in attr && attr.val.length > 0 && { defaultValue: typeof attr.val === 'string' && attr.val.length > 0 && attr.val[0] === '[' ? JSON.parse(attr.val) : attr.val !== undefined && attr.val.split(',') }}
          singleSelect={!attr.mul}
          options={attr.opt.map(option => ({ value: option.lbl, label: option.lbl }))}
          onChange={onChangeHandler}
          {...{ defaultValue: value }}
        />
        {/* <select
          className="fld slim no-drg"
          ref={selectFieldRef}
          {...'req' in attr.valid && { required: attr.valid.req }}
          {...'disabled' in attr.valid && { disabled: attr.valid.disabled }}
          {...'mul' in attr && { multiple: attr.mul }}
          {...'ph' in attr && { placeholder: attr.ph }}
          {...'name' in attr && { name: 'mul' in attr ? `${attr.name}[]` : attr.name }}
          {...{ defaultValue: value }}
          {...{ value }}
          {...resetFieldValue && { value: [] }}
          onChange={onChangeHandler}
        >
          <option data-placeholder="true" aria-label="option placeholder" />
          {attr.opt.map((itm, i) => (
            <option key={`op-${i + 87}-${(!attr.userinput || resetFieldValue) && Math.random()}`} value={itm.lbl}>{itm.lbl}</option>
          ))}
        </select> */}
      </div>
    )
  )
}

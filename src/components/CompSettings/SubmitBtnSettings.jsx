/* eslint-disable no-param-reassign */
import React from 'react'
import SingleInput from '../ElmSettings/Childs/SingleInput'
import SingleToggle from '../ElmSettings/Childs/SingleToggle'
import SelectBox2 from '../ElmSettings/Childs/SelectBox2'
import Back2FldList from './Back2FldList'

export default function SubmitBtnSettings(props) {
  console.log('%c $render SubmitBtnSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isAlwReset = 'rstBtnTxt' in props.elm.data
  const rstBtnTxt = 'rstBtnTxt' in props.elm.data && props.elm.data.rstBtnTxt
  const { subBtnTxt, align, fulW, btnSiz } = props.elm.data

  const pos = [
    { name: 'Left', value: 'left' },
    { name: 'Center', value: 'center' },
    { name: 'Right', value: 'right' },
  ]

  function setSubBtnTxt(e) {
    props.elm.data.subBtnTxt = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setRstBtnTxt(e) {
    props.elm.data.rstBtnTxt = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setResetAlw(e) {
    if (e.target.checked) {
      props.elm.data.rstBtnTxt = 'Reset'
    } else {
      delete props.elm.data.rstBtnTxt
    }
    props.setSubmitConfig(props.elm.data)
  }

  function setButtonAlign(e) {
    props.elm.data.align = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setFulW(e) {
    props.elm.data.fulW = e.target.checked
    props.setSubmitConfig(props.elm.data)
  }

  function setBtnSiz(e) {
    if (e.target.checked) {
      props.elm.data.btnSiz = 'sm'
    } else {
      props.elm.data.btnSiz = 'md'
    }
    props.setSubmitConfig(props.elm.data)
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div>
        <span className="font-w-m">Field Type : </span>
        Submit
      </div>
      <SingleInput inpType="text" title="Submit Button Text:" value={subBtnTxt} action={setSubBtnTxt} />
      <SingleToggle title="Show Reset Button:" action={setResetAlw} isChecked={isAlwReset} className="mt-5" />
      {isAlwReset && <SingleInput inpType="text" title="Reset Button Text:" value={rstBtnTxt} action={setRstBtnTxt} />}
      <SelectBox2 title="Button Align:" options={pos} value={align} action={setButtonAlign} />
      <SingleToggle title="Full Width Button:" action={setFulW} isChecked={fulW} className="mt-5" />
      <SingleToggle title="Small Button:" action={setBtnSiz} isChecked={btnSiz === 'sm'} className="mt-5" />
    </div>
  )
}
